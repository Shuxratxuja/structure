import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { logout } from '@/redux/slices/authSlice';
import { Heart, ShoppingBag } from 'lucide-react';

export const Header = () => {
  const cart = useSelector((s) => s.all.cart);
  const auth = useSelector((s) => s.all.auth);
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
            className={`text-2xl px-7 font-bold ${
              auth ? 'bg-red-600' : 'bg-amber-500'
            } text-white  $`}
          >
            {auth ? 'Logout' : 'Login'}
          </Button>
          <Link
            to={'/cart'}
            className={`text-2xl px-7 font-bold  bg-amber-500 text-white rounded-md  py-3 flex items-center gap-1 $`}
          >
            <ShoppingBag />
            {cart.length !== 0 && (
              <span className="text-red-600">({cart.length})</span>
            )}
          </Link>
          <Link
            to={'/favorite'}
            className={`text-2xl px-7 font-bold  bg-amber-500 text-white rounded-md  py-3 flex items-center gap-1 $`}><Heart/></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
