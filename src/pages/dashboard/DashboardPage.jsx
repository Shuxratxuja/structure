import { Button } from '@/components/button';
import { Input } from '@/components/ui/input';
import { CATEGORY } from '@/constants';
import { useGetData } from '@/hooks/fetch-data';
import { useDebounce } from '@/hooks/useDebounce';
import { addToCart, favoriteProduct } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import {
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
  Heart,
  ShoppingCart,
  Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const debouncedSearch = useDebounce(search, 500);

  const { data: categoryData, isLoading, error } = useGetData(
    CATEGORY,
    page,
    'name',
    debouncedSearch
  );

  const favorites = useSelector((state) => state.all.favorites);
  const cart = useSelector((state) => state.all.cart);

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!isLoading && categoryData?.length === 0 && search) {
      toast.info('Hech qanday natija topilmadi');
    }
  }, [isLoading, categoryData, search]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [categoryData]);

  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} savatchaga qo‘shildi`);
  };

  const isItemInCart = (id) => cart.some((el) => el.id === id);
  const isItemFavorite = (id) => favorites.some((el) => el.id === id);

  const toggleFavorite = (item) => {
    dispatch(favoriteProduct(item));
    if (isItemFavorite(item.id)) {
      toast.info(`${item.name} sevimlilardan o‘chirildi`);
    } else {
      toast.success(`${item.name} sevimlilarga qo‘shildi`);
    }
  };

  return (
    <div className="py-10 container">
      <div className="relative max-w-md mb-6">
        <Input
          ref={inputRef}
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10 w-[300px]"
        />
        <Search className="absolute left-64 top-2.5 text-gray-400" size={20} />
      </div>
      {error?.response?.status === 404 && (
        <div className="text-red-500 text-center text-xl font-bold">
          Mahsulot topilmadi!
        </div>  
      )}

      {isLoading ? (
        <div className="text-2xl font-bold text-black flex justify-center items-center h-full mt-[200px]"><RingLoader/></div>
      ) :  (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {categoryData?.map((item) => {
              const isFav = isItemFavorite(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group"
                >
                  <div className="h-[180px] w-full overflow-hidden">
                    <img
                      src={item?.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col px-4 my-1">
                    <h3 className="mb-3 font-semibold">{item.name}</h3>
                    <p className="line-clamp-2 text-sm text-gray-500">{item.description}</p>
                    <div className="flex items-center justify-between mt-5">
                      <strong>{formatPrice(item.price)}</strong>
                      <span>{item.inStock} шт</span>
                    </div>

                    <div className="mt-10 flex justify-between">
                      {isItemInCart(item.id) ? (
                        <Button disabled className="opacity-70 cursor-default">
                          <CircleCheckBig />
                        </Button>
                      ) : (
                        <Button onClick={() => handleToCart(item)}>
                          <ShoppingCart />
                        </Button>
                      )}
                      <Button onClick={() => toggleFavorite(item)}>
                        <Heart className={`${isFav ? 'text-red-600' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-10 mt-10">
            <button
              disabled={page <= 1}
              className={`px-4 py-2 rounded-md font-bold text-xl ${page <= 1
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-black text-white'
                }`}
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              <ArrowLeft />
            </button>

            <span className="text-lg font-semibold">
              <span className="font-bold">{page}</span>
            </span>

            <button
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold text-xl"
              onClick={() => setPage(page + 1)}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
