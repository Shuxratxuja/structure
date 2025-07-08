import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteAllProducts } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../button';

export const DleteAllProduct = ({ open, toggleOpen }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAllProducts());
    toggleOpen(false); 
    toast.success("Hamma mahsulot o'chirildi");
  };

  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Hammasini ochirish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Rostan ham barcha mahsulotlarni o'chirmoqchimisiz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ushbu amal ortga qaytarib bo'lmaydi. Barcha mahsulotlar o'chiriladi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button
            onClick={() => toggleOpen(false)}
            className="mr-2 px-3 py-1 bg-black text-white rounded-md"
          >
            Bekor qilish
          </button>
          <button
            className="bg-red-600 text-white rounded-md px-4 py-2 font-bold"
            onClick={handleDelete}
          >
            Ha o‘chir
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DleteAllProduct;
