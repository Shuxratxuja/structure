import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LOGIN } from '@/constants';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onTouched',
  });
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(LOGIN, data);
      if (res.data.accessToken || res.data.refreshToken) {
        dispatch(login({token: res.data.accessToken}));
        navigate('/');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Username yoki password xato');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6 w-1/3')}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register('username', { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type={visible ? 'text' : 'password'}
                  required
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 translate-y-1"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <Button disabled={!isValid} type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
