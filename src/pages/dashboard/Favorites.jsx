import { Button } from "@/components/button";
import { ConfirmModal } from "@/components/modal";
import { CircleCheckBig, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils";
import {
    deleteAllFavorites,
    addToCart,
    deleteFavorite
} from "@/redux/slices/authSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const Favorites = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);



    const toggleOpen = () => setOpen(!open);

    const favorites = useSelector((state) => state.all.favorites);
    const cart = useSelector((state) => state.all.cart);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    const handleOpen = (item) => {
        setSelected(item);
        toggleOpen();
    };

    const isItemInCart = (id) => cart.some((el) => el.id === id);


    return (
        <div className="py-10 container space-y-10">
            {favorites.length === 0 ? (
                <Link
                    to="/"
                    className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold text-xl"
                >
                    Istaklar royxati bo'sh
                </Link>
            ) : (
                <div className="flex flex-col space-y-5 justify-end items-end">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Barchasini o'chirish</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Rostdan ham barchasini o‘chirmoqchimisiz?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                <AlertDialogAction onClick={() => dispatch(deleteAllFavorites())}>
                                    Ha, o‘chirish
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className="grid grid-cols-4 gap-10">
                        {favorites.map((item) => (
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


                                    <h3 className="mb-3 flex items-center">{item.name}</h3>
                                    <p className="line-clamp-2">{item.description}</p>
                                    <div className="flex items-center justify-between mt-5">
                                        <strong>{formatPrice(item.price)}</strong>
                                        <span>{item.inStock} шт</span>
                                    </div>

                                    <div className="mt-10 flex justify-between">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive"><Trash /></Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Rostdan ham o‘chirmoqchimisiz?</AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => dispatch(deleteFavorite(item.id))}>
                                                        Ha, o‘chirish
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        {isItemInCart(item.id) ? (
                                            <Button disabled className="opacity-70 cursor-default">
                                                <CircleCheckBig />
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleAddToCart(item)}>
                                                <ShoppingCart />
                                            </Button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ConfirmModal open={open} toggleOpen={toggleOpen} item={selected} />
        </div>
    );
};
