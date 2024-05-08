import React, {useCallback, useEffect, useState} from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';

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
const Calendar = ({ month, year }) => {

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

    return (
        <div className='calendar-container'>
            <div className='calendar-container__month'>
                <div>
                    <h1>{months[month]} {year}</h1>
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
                        <div key={index}>
                            <h1 className={currentMonth ? '' : 
                            'calendar-container__dates__not-current-month'}>{date.date()}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Calendar;