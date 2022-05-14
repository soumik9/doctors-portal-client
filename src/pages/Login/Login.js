import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error, ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user || guser);

    let loginErrorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect( () => {
        if(token){
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    if(loading || gloading){
        return <Loading />
    }

    if(error || gerror){
        loginErrorMessage = <p className='text-red-500 text-center mt-4'>{error?.message || gerror?.message}</p>
    }

    const onLoginSubmit = ({ email, password}) => {
        signInWithEmailAndPassword(email, password);
    }

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">

                <Toaster />

                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit(onLoginSubmit)} className="my-5">

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email Here" className="input input-bordered w-full max-w-xs" {...register('email', { required: {
                                    value: true,
                                    message: 'Email is required.'
                                }, 
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 
                                    message: 'Provide a valid email.'
                                }
                            })} />
                        </div>
                        {errors.email?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.email.message}</p>}
                        {errors.email?.type === 'pattern' && <p className='text-error mt-1 text-center'>{errors.email.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password Here" className="input input-bordered w-full max-w-xs" {...register('password', { required: {
                                    value: true,
                                    message: 'Password is required.'
                                }, minLength: {
                                    value: 6, 
                                    message: 'Must be 6 characters or longer.'
                                }, 
                                pattern: {
                                    value: /[A-Z]/, 
                                    message: 'Uppercase 1 letter need.'
                                }
                            })} />
                        </div>
                        {errors.password?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}
                        {errors.password?.type === 'minLength' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}
                        {errors.password?.type === 'pattern' && <p className='text-error mt-1 text-center'>{errors.password.message}</p>}

                        {loginErrorMessage}

                        <input type="submit" className='mt-5 w-full btn btn-outline' value='Login' />
                    </form>

                    <p className='text-center'><small>New to Doctors Portal <Link to='/register' className='text-secondary'>Create new account</Link></small></p>
                    <p className='text-center'><small>Forget Password <Link to='/reset' className='text-secondary'>Reset here</Link></small></p>

                    <div className="divider">OR</div>

                    <button className="btn btn-outline"
                        onClick={handleGoogleLogin}
                    >Google Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;