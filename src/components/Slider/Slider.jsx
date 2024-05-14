import React, {useCallback, useEffect, useState} from 'react';
import Calendar from '../Calendar/Calendar';

const Slider = ({min, max, label, unit = "", onChange, valueComponent}) => {
    const [value, setValue] = useState(min);
    const [range, setRange] = useState(0);

    // Обрахування довжини .highlight (берюзової полоски)
    const calculateRange = useCallback(() => {
        return ((value - min) / (max - min)) * 100
    }, [value, min, max]);

    // Встановлення value для слайдера
    const handleSlider = useCallback((event) => {
        const newValue = parseFloat(event.target.value);
        setValue(newValue); // Зберігаємо нове значення
        if (onChange) {
            onChange(newValue); // Передаємо нове значення
        }
    }, [onChange]);

    useEffect(() => {
        setRange(calculateRange());
    }, [calculateRange]);

    return (
        <div className="slider-container">
            <label htmlFor="slider">{label}</label>

            <div className="slider-container__captions">
                <span>{min + unit}</span>
                <span>{max + unit}</span>
            </div>
            <div className="slider-container__highlight" style={{"width": range + "%"}}></div>
            <div className="slider-container__value" style={{"left": range + "%"}}>
                {valueComponent || 
                <div className="slider-container__value__container">
                    <span>{value + unit}</span>
                </div>
                }
            </div>

            <input
                id="slider"
                className="slider-container__slider"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleSlider}
            />
        </div>
    );
};


export default Slider;