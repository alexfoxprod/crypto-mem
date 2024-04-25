import React from 'react'
import Slider from "../components/Slider/Slider";

const MainPage = () => {
  return (
    <div className="main">
        <h1 className="main__title">How much have you lost/earned on Bitcoin?</h1>
        <div className="main__content">
            <form className="main__content__form">
                <Slider
                    min={100}
                    max={1000}
                    label="Investment"
                />
                <Slider
                    min={2012}
                    max={2024}
                    label="Investment date"
                />
                <button
                    type="submit"
                    className="main__content__form__button">
                    Calculate
                </button>
            </form>
        </div>
    </div>
  )
}

export default MainPage