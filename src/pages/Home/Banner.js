import React from 'react';
import bannerImg from '../../assets/images/chair.png'
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div class="hero min-h-screen">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src={bannerImg} alt='banner img' class="max-w-sm rounded-lg shadow-2xl" />
                <div class='md:mr-10'>
                    <h1 class="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton name='Get Started' />
                </div>
            </div>
        </div>
    );
};

export default Banner;