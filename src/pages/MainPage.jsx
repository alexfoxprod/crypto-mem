import React, { useState, useEffect } from "react";
import Slider from "../components/Slider/Slider";
// import ApiComponent from '../components/ApiComponent/ApiComponent';
import Calendar from "../components/Calendar/Calendar";
import dayjs from 'dayjs';

const MainPage = () => {
  const startDate = dayjs('2014-01-01'); // Початкова дата
  const today = dayjs(); // Сьогоднішня дата

  const maxSliderValue = dayjs().diff(startDate, 'month');
  const [latestRate, setLatestRate] = useState(0);
  const [rateByDate, setRateByDate] = useState(0);
  const [profit, setProfit] = useState(0);
  const [investment, setInvestment] = useState(100);
  const [investmentDate, setInvestmentDate] = useState("2014-01-01");
  const [hiddenResult, setHiddenResult] = useState(false);
  const [memeClass, setMemeClass] = useState('');

  const [calMonth, setCalMonth] = useState(0);
  const [calYear, setCalYear] = useState(2014);

  const [sliderPosition, setSliderPosition] = useState(0);

  
  const handleSliderChange = (value) => {
    const month = value % 12;
    const year = Math.floor(2014 + value / 12);
    setCalMonth(month);
    setCalYear(year);

    const newDate = `${year}-${month}`;
    setInvestmentDate(newDate);
    console.log("Investment Date:", newDate);
  };
  
  const handleInvestmentChange = (value) => {
    console.log("Investment:", value); // Вивід значення в консоль
    setInvestment(value); // Зберігаємо значення в стані
  };

  const fetchApi = async () => {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setLatestRate(data.rates.BTC);
  };

  const fetchApi2 = async () => {
    if (investmentDate) {
      const response = await fetch(
        `https://openexchangerates.org/api/historical/${investmentDate}.json?app_id=${process.env.REACT_APP_API_KEY}`
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
        const calculatedProfit = ((investment * rateByDate) / latestRate).toFixed(2);
        setProfit(calculatedProfit);
      }
    } else {
      console.error("Investment date is not set");
    }
  };

  useEffect(() => {
    const memeClass = profit >= 70000 ? 'main__content__result__border__meme8' :
                      profit >= 60000 ? 'main__content__result__border__meme7' :
                      profit >= 50000 ? 'main__content__result__border__meme6' :
                      profit >= 40000 ? 'main__content__result__border__meme5' :
                      profit >= 30000 ? 'main__content__result__border__meme4' :
                      profit >= 20000 ? 'main__content__result__border__meme3' :
                      profit >= 10000 ? 'main__content__result__border__meme2' :
                                        'main__content__result__border__meme1';
    setMemeClass(memeClass);
  }, [profit]);
  

  useEffect(() => {
    if (profit !== 0 && !isNaN(profit)) {
      setHiddenResult(true)
    }
  }, [profit]);

  useEffect(() => {
    if (latestRate !== null && rateByDate !== null) {
      console.log("latestRate", latestRate);
      console.log("rateByDate", rateByDate);
      console.log("investment", investment);
      console.log("profit", profit);
      const calculatedProfit = ((investment * rateByDate) / latestRate).toFixed(2);
      setProfit(calculatedProfit);
    }
  }, [latestRate, rateByDate, investment, investmentDate]);


  const sliderValueToDate = (value) => {
    const month = value % 12;
    const year = (2014 + value / 12).toFixed();
    return `${year}-${month}`;
  };


  const handleCalendarMonthChange = (e) => {
    const elementClass = e.target.classList;
  
    if (elementClass.contains('arrow-left')) {
      if (calMonth === 0 && calYear === 2014) {
        return;
      }
      setCalMonth(calMonth === 0 ? 11 : calMonth - 1);
      setCalYear(calMonth === 0 ? calYear - 1 : calYear);
    } else {
      if (calMonth === dayjs().month() && calYear === dayjs().year()) {
        return;
      }
      setCalMonth(calMonth === 11 ? 0 : calMonth + 1);
      setCalYear(calMonth === 11 ? calYear + 1 : calYear);
    }
  }

  const handleDateSelect = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setInvestmentDate(formattedDate);
    console.log("Selected Investment Date:", formattedDate);
  };

  return (
    <div className="main">
      <h1 className="main__title">How much have you lost/earned on Bitcoin?</h1>
      <div className="main__content">
        <div className="main__content__result" style={{ display: hiddenResult ? 'block' : 'none' }}>
          <p className="main__content__result__text">
            {profit !== null && !isNaN(profit) && <span>You lost {profit}$</span>}
          </p>
          <div className="main__content__result__border">
            <div className={`main__content__result__border__meme ${memeClass}`}></div>
          </div>
        </div>
        <form className="main__content__form">
          <div className="main__content__form__sliders">
            <Slider
              min={100}
              max={1000}
              leftValue="100"
              rightValue="1000"
              label="Investment"
              unit="$"
              onChange={handleInvestmentChange}
            />
            <Slider
              min={0}
              max={maxSliderValue}
              leftValue="2014"
              rightValue="2024"
              label="Investment date"
              onChange={handleSliderChange}
              valueComponent={<Calendar month={calMonth} year={calYear} onChange={handleCalendarMonthChange} onDateSelect={handleDateSelect}/>}

              value={'ні на що не впливає'}
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
