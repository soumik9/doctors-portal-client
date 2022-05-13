import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true});
    const [updateProfile, updating, uerror] = useUpdateProfile(auth);
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

    let loginErrorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.form?.pathname || "/";

    if(loading || updating || gloading){
        return <Loading />
    }

    if(error || uerror || gerror){
        loginErrorMessage = <p className='text-red-500 text-center mt-4'>{error?.message || uerror?.message || gerror?.message}</p>
    }

    if(user || guser){
        navigate(from, { replace: true });
    }

    const onRegisterSubmit = async ({ name, email, password }) => {
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName: name});
        navigate('/appointment');
    }

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Register</h2>

                    <form onSubmit={handleSubmit(onRegisterSubmit)} className="my-5">

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name Here" className="input input-bordered w-full max-w-xs" {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Name is required.'
                                }
                            })} />
                        </div>
                        {errors.name?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.name.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email Here" className="input input-bordered w-full max-w-xs" {...register('email', {
                                required: {
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
                            <input type="password" placeholder="Your Password Here" className="input input-bordered w-full max-w-xs" {...register('password', {
                                required: {
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

                        <input type="submit" className='mt-5 w-full btn btn-outline' value='Register' />
                    </form>

                    <p className='text-center'><small>Already have account <Link to='/login' className='text-secondary'>Login here</Link></small></p>

                    <div className="divider">OR</div>

                    <button className="btn btn-outline"
                        onClick={handleGoogleLogin}
                    >Google Login</button>
                </div>
            </div>
        </div>
    );
};

export default Register;