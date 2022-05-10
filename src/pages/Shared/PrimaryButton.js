import React from 'react';

const PrimaryButton = ({ name }) => {
    return (
        <button class="btn btn-primary text-white bg-gradient-to-r from-secondary to-primary">{ name }</button>
    );
};

export default PrimaryButton;