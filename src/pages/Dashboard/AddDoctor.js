import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('https://doctors-portal-server9.herokuapp.com/services').then(res => res.json()));

    if (isLoading) return <Loading />

    const imgStorageKey = '9536834f24e13107c187d1316c96427d';

    /* 
        three ways to store images
        1. Third party storage //free open public storage
        2. Own storage in own server (file system)
        3. Database (Mongodb)

        YUP: to validate file
    */

    const onAddDoctorSubmit = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url =`https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res =>  res.json())
        .then(result => {
            if(result.success){
                const imgUrl = result.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    img: imgUrl
                }

                //send to data base
                fetch('https://doctors-portal-server9.herokuapp.com/doctor', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(inserted => {
                    if(inserted.insertedId){
                        toast.success('Doctor added!', { duration: 2000, position: 'top-right' });
                        reset();
                    }else{
                        toast.error('Failed!', { duration: 2000, position: 'top-right' });
                    }
                })
            }
        })
    }

    return (
        <div>
            <h2 className='text-2xl'>Add a new Doctor</h2>

            <form onSubmit={handleSubmit(onAddDoctorSubmit)} className="my-5">

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
                        <span className="label-text">Speciality</span>
                    </label>
                    <select className="select w-full max-w-xs input-bordered" {...register('speciality')}>
                        {
                            services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                        }
                    </select>
                </div>
                {errors.speciality?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.Speciality.message}</p>}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="file" className="input input-bordered w-full max-w-xs" {...register('image', {
                        required: {
                            value: true,
                            message: 'Image is required.'
                        }
                    })} />
                </div>
                {errors.image?.type === 'required' && <p className='text-error mt-1 text-center'>{errors.image.message}</p>}


                <input type="submit" className='mt-5 w-50 btn btn-outline' value='ADD DOCTOR' />
            </form>
        </div>
    );
};

export default AddDoctor;