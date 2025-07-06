import { Button } from '@/components/button';
import { CATEGORY } from '@/constants';
import { useGetData } from '@/hooks/fetch-data';
import { addToCart } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data: categoryData, isLoading } = useGetData(CATEGORY, page);

  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };
  console.log(page);

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="text-2xl font-bold text-black">Loading...</div>
      ) : (
        <div className="container">
          <div className="grid grid-cols-4 gap-10">
            {categoryData?.map((item) => (
              <div
                key={item.id}
                className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group"
              >
                <div className="h-[180px] w-full overflow-hidden">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                  />
                </div>
                <div className="flex flex-col px-4 my-1">
                  <h3 className="mb-3">{item.name}</h3>
                  <p className="line-clamp-2 ">{item.description}</p>
                  <div className="flex items-center justify-between mt-5">
                    <strong>{formatPrice(item.price)}</strong>
                    <span>{item.inStock} шт</span>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button onClick={() => handleToCart(item)}>
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-10">
            <button
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold text-xl"
              onClick={() => setPage(page - 1)}
            >
              Ortga
            </button>
            <button
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold text-xl"
              onClick={() => setPage(page + 1)}
            >
              Keyingi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
