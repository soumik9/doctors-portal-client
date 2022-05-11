import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onLoginSubmit = (data) => {
        console.log(data);
    }


    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit(onLoginSubmit)} className="my-5">

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email Here" class="input input-bordered w-full max-w-xs" {...register('email', { required: {
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

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password Here" class="input input-bordered w-full max-w-xs" {...register('password', { required: {
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

                        <input type="submit" className='mt-5 w-full btn btn-outline' value='Login' />
                    </form>

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