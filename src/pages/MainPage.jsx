import React from 'react'
import Slider from "../components/Slider/Slider";
import ApiComponent from '../components/ApiComponent/ApiComponent';

const MainPage = () => {
  return (
    <div className="main">
        <h1 className="main__title">How much have you lost/earned on Bitcoin?</h1>
        <div className="main__content">
            <div className='main__content__result'></div>
            <form className="main__content__form">
                <div className='main__content__form__sliders'>
                    <Slider
                        min={100}
                        max={1000}
                        label="Investment"
                        unit="$"
                    />
                    <Slider
                        min={2012}
                        max={2024}
                        label="Investment date"
                    />
                </div>

                <button
                    type="submit"
                    className="main__content__form__button">
                    Calculate
                </button>
            </form>
        </div>
        <ApiComponent/>
    </div>
  )
}

export default MainPage