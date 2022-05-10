import React from 'react';

const PrimaryButton = ({ name }) => {
    return (
        <button className="btn btn-primary text-white bg-gradient-to-r from-secondary to-primary">{ name }</button>
    );
};

export default PrimaryButton;