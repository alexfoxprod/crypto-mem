import React from 'react';

const Slider = ({min, max, label}) => {

    return (
        <div className="slider">
            <label htmlFor="slider">{label}</label>
            <input
                id="slider"
                type="range"
                min={min}
                max={max}
            />
        </div>
    );
};


export default Slider;