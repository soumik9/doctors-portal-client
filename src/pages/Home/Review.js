import React from 'react';

const Review = ({ testimonial }) => {

    const { name, location, img, review } = testimonial;

    return (
        <div className="card w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{review}</p>

                <div className='flex items-center mt-4'>
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5">
                            <img src={img} alt={name} />
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl'>{name}</h4>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;