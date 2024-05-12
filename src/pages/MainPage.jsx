import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
// import ApiComponent from '../components/ApiComponent/ApiComponent';
import Calendar from "../components/Calendar/Calendar";

const MainPage = () => {
  const startDate = new Date("2014-01-01"); // Початкова дата
  const today = new Date(); // Сьогоднішня дата

  const maxSliderValue = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const [latestRate, setLatestRate] = useState(0);
  const [rateByDate, setRateByDate] = useState(0);
  const [profit, setProfit] = useState(0);
  const [investment, setInvestment] = useState(100);
  const [investmentDate, setInvestmentDate] = useState("2014-01-01");

  const sliderValueToDate = (value) => {
    // Додає значення днів до стартової дати
    const newDate = new Date(startDate.getTime() + value * 1000 * 60 * 60 * 24); 
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Повертає дату у форматі `YYYY-MM-DD`
  };

  const handleSliderChange = (value) => {
    const newDate = sliderValueToDate(value); 
    setInvestmentDate(newDate);
    console.log("Investment Date:", newDate); // Вивід в консоль
  };
  
  const handleInvestmentChange = (value) => {
    console.log("Investment:", value); // Вивід значення в консоль
    setInvestment(value); // Зберігаємо значення в стані
  };

  const fetchApi = async () => {
    const response = await fetch(
      "https://openexchangerates.org/api/latest.json?app_id=2069bfec40854cce81a65a1b2de83ae9"
    );
    const data = await response.json();
    setLatestRate(data.rates.BTC);
  };

  const fetchApi2 = async () => {
    if (investmentDate) {
      const response = await fetch(
        `https://openexchangerates.org/api/historical/${investmentDate}.json?app_id=2069bfec40854cce81a65a1b2de83ae9`
      );
      const data = await response.json();
      setRateByDate(data.rates.BTC);
    } else {
      console.error("Investment date is not set or invalid");
    }
  };

  const calculateProfit = async (e) => {
    e.preventDefault();
    if (investmentDate) {
      await fetchApi();
      await fetchApi2();
      if (latestRate && rateByDate && investment > 0) {
        const calculatedProfit = (investment * rateByDate) / latestRate;
        setProfit(calculatedProfit);
      }
    } else {
      console.error("Investment date is not set");
    }
  };
  useEffect(() => {
    if (latestRate !== null && rateByDate !== null) {
      console.log("latestRate", latestRate);
      console.log("rateByDate", rateByDate);
      console.log("investment", investment);
      const calculatedProfit = (investment * rateByDate) / latestRate;
      setProfit(calculatedProfit);
    }
  }, [latestRate, rateByDate, investment, investmentDate]);


  const handleCalendarMonthChange = (e) => {
    const elementClass = e.target.classList;

    if (elementClass.contains('arrow-left')) {
      console.log('left');
      //month--
    } else {
      console.log('right');
      //month++
    }
  }

  return (
    <div className="main">
      <h1 className="main__title">How much have you lost/earned on Bitcoin?</h1>
      <div className="main__content">
        <p className="main__content__text">
          {profit !== null && !isNaN(profit) && <span>Profit: {profit}</span>}
        </p>
        <div className="main__content__result">

        <Calendar month={4} year={2024} onChange={handleCalendarMonthChange}/>

        </div>
        <form className="main__content__form">
          <div className="main__content__form__sliders">
            <Slider
              min={100}
              max={1000}
              label="Investment"
              unit="$"
              onChange={handleInvestmentChange}
            />
            <Slider
              min={0}
              max={maxSliderValue}
              label="Investment date"
              value={sliderValueToDate(maxSliderValue)}
              onChange={handleSliderChange}
            />
          </div>

          <button
            type="submit"
            className="main__content__form__button"
            onClick={calculateProfit}
          >
            Calculate
          </button>
        </form>
      </div>
      {/* <ApiComponent/> */}
    </div>
  );
};

export default MainPage;
