import React from 'react';
import { useSendPasswordResetEmail, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ResetPassword = () => {

    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    let loginErrorMessage;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if(sending || gloading){
        return <Loading />
    }

    if(error || gerror){
        loginErrorMessage = <p className='text-red-500 text-center mt-4'>{error?.message || gerror?.message}</p>
    }

    if(guser){
        navigate(from, { replace: true });
    }

    const onResetSubmit = async ({ email}) => {
        await sendPasswordResetEmail(email);
        reset();
        toast.success('Successfully send reset email!', { duration: 2000, position: 'top-right' });
    }

    const handleGoogleLogin = () => {
        signInWithGoogle();
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">

                <Toaster />

                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Reset Password</h2>

                    <form onSubmit={handleSubmit(onResetSubmit)} className="my-5">

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


                        {loginErrorMessage}

                        <input type="submit" className='mt-5 w-full btn btn-outline' value='Reset' />
                    </form>

                    <p className='text-center'><small>New to Doctors Portal <Link to='/register' className='text-secondary'>Create new account</Link></small></p>
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

export default ResetPassword;