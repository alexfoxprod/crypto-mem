import React, { useState, useEffect } from "react";
const ApiComponent = () => {
    const [latestRate, setLatestRate] = useState(0);
    const [rateByDate, setRateByDate] = useState(0);
    const [profit, setProfit] = useState(0);
    const [investment, setInvestment] = useState("");
    const [investmentDate, setInvestmentDate] = useState("");

    const handleInput = (event) => {
        const input = parseFloat(event.target.value); // Перевірка чи значення є числом
        if (isNaN(input)) {
            setInvestment(0); // Якщо значення `NaN`, встановлюємо 0
        } else {
            setInvestment(input);
        }
    }

    const handleInputDate = (event) => {
        let inputDate = event.target.value;

        // Видалення всього, що не є цифрами
        inputDate = inputDate.replace(/\D/g, ""); // Залишити лише цифри

        if (inputDate.length > 4) {
            inputDate = `${inputDate.slice(0, 4)}-${inputDate.slice(4)}`; // Додаємо тире після року
        }
        if (inputDate.length > 7) {
            inputDate = `${inputDate.slice(0, 7)}-${inputDate.slice(7)}`; // Додаємо тире після місяця
        }

        if (inputDate.length > 10) {
            inputDate = inputDate.slice(0, 10); // Обмеження довжини
        }

        setInvestmentDate(inputDate);
    }
    const fetchApi = async () => {
        const response = await fetch("https://openexchangerates.org/api/latest.json?app_id=2069bfec40854cce81a65a1b2de83ae9");
        const data = await response.json();
        setLatestRate(data.rates.BTC);
    }

    const fetchApi2 = async () => {
        if (investmentDate) {
            const response = await fetch(`https://openexchangerates.org/api/historical/${investmentDate}.json?app_id=2069bfec40854cce81a65a1b2de83ae9`);
            const data = await response.json();
            setRateByDate(data.rates.BTC);
        } else {
            console.error("Investment date is not set or invalid");
        }
    }

    const calculateProfit = async () => {
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
    }
    useEffect(() => {
        if (latestRate !== null && rateByDate !== null) {
            console.log("latestRate", latestRate);
            console.log("rateByDate", rateByDate);
            console.log("investment", investment);
            const calculatedProfit = (investment * rateByDate) / latestRate;
            setProfit(calculatedProfit);
        }
    }, [latestRate, rateByDate, investment, investmentDate]); 
    

  return (
    <div>
      <div className="investmentsPrice">
        <label htmlFor="">Investment price</label>
        <input type="text" onChange={handleInput} value={investment}/>
      </div>
      <div className="investmentsDate">
        <label htmlFor="">Investment Date</label>
        <input type="text" placeholder="YYYY-MM-DD" onChange={handleInputDate} value={investmentDate}/>
      </div>
      <button onClick={fetchApi}>Calculate</button>
      <button onClick={fetchApi2}>Calculate</button>
      <button onClick={calculateProfit}>Calculate Profit</button>
      {profit !== null && !isNaN(profit) && <p>Profit: {profit}</p>}
    </div>
  );
};

export default ApiComponent;
