import React, {useCallback, useEffect, useState} from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';


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

const Calendar = ({ month, year }) => {

    return (
        <div className='calendar-container'>
            <h1 className='calendar-container__h1'>leawkmf</h1>
        </div>
    )
}


export default Calendar;