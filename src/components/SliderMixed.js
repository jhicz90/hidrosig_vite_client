import React, { useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'

export const SliderMixed = ({ slides = [], children, ...props }) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <Slider
            autoplay
            autoplaySpeed={8000}
            fade
            pauseOnHover
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            afterChange={(current) => { setCurrentIndex(current) }}
        >
            {
                slides.map((sld, index) =>
                    <div key={`slide-${sld}`}>
                        {
                            sld.hasOwnProperty('title')
                            &&
                            <div
                                className={`slider-ttl fs-1 fw-bold ui-text-white ${currentIndex === index ? 'animate__animated animate__slideInRight' : 'animate__animated animate__fadeOut'}`}
                            >
                                {sld.title}
                            </div>
                        }
                        {
                            (sld.hasOwnProperty('subtitle') || sld.hasOwnProperty('message'))
                            &&
                            <div
                                className={`slider-msg shadow ${currentIndex === index ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`}
                            >
                                {
                                    sld.hasOwnProperty('subtitle')
                                    &&
                                    <div className="fs-2 fw-bold">
                                        {sld.subtitle}
                                    </div>
                                }
                                {
                                    sld.hasOwnProperty('message')
                                    &&
                                    <div className="fs-6 fw-light">
                                        {sld.message}
                                    </div>
                                }
                            </div>
                        }
                        {
                            sld.hasOwnProperty('src')
                            &&
                            <div
                                className="slider-img"
                                style={{ backgroundImage: `url(${sld.src})` }}
                            />
                        }
                    </div>
                )
            }
        </Slider>
    )
}
