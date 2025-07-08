import { Button } from '@/components/button';
import { ConfirmModal } from '@/components/modal';
import DleteAllProduct from '@/components/modal/DleteAll';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { decrementQuantity, deleteAllProducts, incrementQuantity } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { Minus, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((s) => s.all.cart);
  const dispatch = useDispatch()

  const [open, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const toggleOpen = () => setIsOpen(!open);
  const handleOpen = (product) => {
    setSelected(product);
    toggleOpen();
  };
  return (
    <div className="py-10 container space-y-10">
      {
        cart.length === 0 ? (
          <Link to={'/'} className="cursor-pointer  px-4 py-2 bg-black text-white rounded-md font-bold text-xl">
            Mahsulot qoshilmagan</Link>
        ) : (
          <div className='flex flex-col space-y-5 justify-end items-end'>
            <DleteAllProduct/>
            <div className="grid grid-cols-4 gap-10">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group"
                >
                  <div className="h-[180px] w-full overflow-hidden">
                    <img
                      src={item.image}
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
                      <Button onClick={() => handleOpen(item)}>
                        <Trash />
                      </Button>
                      {
                        item.quantity > 1 ? (
                          <Button onClick={() => dispatch(decrementQuantity(item.id))}>
                            <Minus />
                          </Button>
                        ) : (
                            <Button className="opacity-70 cursor-not-allowed">
                              <Minus />
                            </Button>
                        )
                      }
                      <span className="text-xl font-bold">{item.quantity}</span>
                      <Button onClick={() => dispatch(incrementQuantity(item.id))}><Plus /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      <ConfirmModal open={open} toggleOpen={toggleOpen} item={selected} />
    </div>
  );
};

export default CartPage;
