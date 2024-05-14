import React, { useState } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';
import arrowLeft from "../../assets/calendar/chevron-left.svg";
import arrowRight from "../../assets/calendar/chevron-right.svg";

// Поточний місяць за замовчуванням
const generateDate = (

    month = dayjs().month(), 

    year = dayjs().year()

) => {
    const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');

    const arrayOfDate = [];

    // Генерація днів попереднього місяця
    for (let i = 0; i < firstDayOfMonth.day(); i++) {
        arrayOfDate.push({
            currentMonth: false, 
            date: firstDayOfMonth.day(i)
        });
    }

    // Генерація днів поточного місяця
    for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDayOfMonth.date(i)
        });
    }

    // Генерація днів наступного місяця
    const remaining = 42 - arrayOfDate.length;

    for (let i = lastDayOfMonth.date() + 1; i <= lastDayOfMonth.date() + remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDayOfMonth.date(i)
        });
    }

    return arrayOfDate;
}

// Індекс місяця та рік (4, 2024)
const Calendar = ({ month, year, onChange }) => {

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ];

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleDateClick = (date) => {
        setSelectedDate(date); 
        console.log(date.toDate());
    }

    return (
        <div className='calendar-container'>
            <div className='calendar-container__month'>
                <div>
                    <img src={arrowLeft} alt='previous month button' 
                    onClick={(e) => onChange(e)} className='arrow-left'/>

                    <h1>{months[month]} {year}</h1>

                    <img src={arrowRight} alt='next month button' 
                    onClick={(e) => onChange(e)} className='arrow-right'/>
                </div>
            </div>
            <div className='calendar-container__days'>
                {days.map((day, index) => {
                    return  <h1 key={index}>{day}</h1>
                })}
            </div>

            <div className='calendar-container__dates'>
                {generateDate(month, year).map(({ date, currentMonth }, index) => {

                    return (
                        <div key={index}
                        className={selectedDate.toDate().toDateString() === date.toDate().toDateString() ? 'calendar-container__dates__selected-date' : ''}
                        onClick={() => handleDateClick(date)}>
                            <h1 className={currentMonth ? '' : 'calendar-container__dates__not-current-month'}
                            >{date.date()}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Calendar;