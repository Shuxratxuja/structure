import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { logout } from '@/redux/slices/authSlice';
import { Heart, ShoppingBag } from 'lucide-react';
import { Badge } from '../ui/badge';

export const Header = () => {
  const cart = useSelector((s) => s.all.cart);
  const auth = useSelector((s) => s.all.auth);
  const favorites = useSelector((s) => s.all.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoLogin = () => {
    if (auth) {
      dispatch(logout());
      window.location.reload();
    } else {
      navigate('/auth/signin');
    }
  };
  return (
    <header className="bg-body-color text-white py-7 ">
      <div className="container flex justify-between items-center">
        <Link to={'/'} className="text-2xl font-bold">
          U7
        </Link>

        <div className="flex items-center gap-10">
          <Button
            onClick={handleGoLogin}
            className={`text-2xl px-7 h-[48px] font-bold ${
              auth ? 'bg-red-600' : 'bg-amber-500'
            } text-white  $`}
          >
            {auth ? 'Logout' : 'Login'}
          </Button>
          <Link
            to={'/cart'}
            className={`relative text-2xl px-7 font-bold h-[48px]  bg-amber-500 text-white rounded-md  py-2 flex items-center gap-1 $`}
          >
            <ShoppingBag size={32} />
            {cart.length !== 0 && (
              <Badge variant="destructive" className="absolute top-1 left-[58px] ">
                <span className=''>{cart.length}</span>
              </Badge>
            )}
          </Link>
          <Link
            to={'/favorite'}
            className={`relative text-2xl px-7 font-bold h-[48px] bg-amber-500 text-white rounded-md  py-3 flex items-center gap-1 $`}>
              <Heart size={30}/>
            {favorites.length !== 0 && (
              <Badge variant="destructive" className="absolute top-1 left-[58px] ">
                <span className=''>{favorites.length}</span>
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
