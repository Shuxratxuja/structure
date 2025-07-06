import { Button } from '@/components/button';
import { ConfirmModal } from '@/components/modal';
import { formatPrice } from '@/utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const cart = useSelector((s) => s.all.cart);
  const [open, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const toggleOpen = () => setIsOpen(!open);
  const handleOpen = (product) => {
    setSelected(product);
    toggleOpen();
  };
  return (
    <div className="py-10 container space-y-10">
      {cart?.map((item) => (
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
            <h3 className="mb-3">{item.quantity}</h3>
            <p className="line-clamp-2 ">{item.description}</p>
            <div className="flex items-center justify-between mt-5">
              <strong>{formatPrice(item.price)}</strong>
              <span>{item.inStock} шт</span>
            </div>

            <div className="mt-10 flex justify-between">
              <Button onClick={() => handleOpen(item)}>Delete</Button>
            </div>
          </div>
        </div>
      ))}
      <ConfirmModal open={open} toggleOpen={toggleOpen} item={selected} />
    </div>
  );
};

export default CartPage;
