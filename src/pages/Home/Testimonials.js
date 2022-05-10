import React from 'react';
import quoteImg from '../../assets/icons/quote.svg'
import peopleOneImg from '../../assets/images/people1.png'
import peopleTwoImg from '../../assets/images/people2.png'
import peopleThreeImg from '../../assets/images/people3.png'
import Review from './Review';

const Testimonials = () => {

    const reviews = [
        {
            _id: 1,
            name: 'Winson Herry', 
            location: 'Dhaka, Bangladesh', 
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit error quaerat doloribus, iste tempora temporibus perferendis, ut earum maxime iusto',
            img: peopleOneImg
        },
        {
            _id: 2,
            name: 'Winson Herry',
            location: 'Dhaka, Bangladesh',  
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit error quaerat doloribus, iste tempora temporibus perferendis, ut earum maxime iusto',
            img: peopleTwoImg
        },
        {
            _id: 3,
            name: 'Winson Herry', 
            location: 'Dhaka, Bangladesh', 
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit error quaerat doloribus, iste tempora temporibus perferendis, ut earum maxime iusto',
            img: peopleThreeImg
        }
    ];

    return (
        <section className='my-20'>

            <div className='flex justify-between'>
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimoinals</h4>
                    <h2 className="text-3xl">What our patients says</h2>
                </div>
                <div>
                    <img className='w-24 lg:w-48' src={quoteImg} alt="" />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {
                    reviews.map(review => <Review
                            key={review._id}
                            testimonial={review}
                        />)
                }
            </div>
        </section>
    );
};

export default Testimonials;