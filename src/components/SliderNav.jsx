import { useState } from 'react'
import styled from 'styled-components'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export const SliderNav = ({ children, variant = 'pills' }) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            mode: 'snap',
            slides: {
                perView: 'auto',
                spacing: 10,
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [MutationPlugin]
    )

    return (
        <WrapperSlider>
            <SliderNavigation ref={sliderRef} className={`keen-slider nav nav-${variant}`}>
                {children}
            </SliderNavigation>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide === 1
                        }
                    />
                </>
            )}
        </WrapperSlider>
    )
}

const MutationPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            slider.update()
        })
    })
    const config = { childList: true }

    slider.on('created', () => {
        observer.observe(slider.container, config)
    })
    slider.on('destroyed', () => {
        observer.disconnect()
    })
}

function Arrow(props) {
    const disabeld = props.disabled ? ' arrow--disabled' : ''
    return (
        // <svg
        //     onClick={props.onClick}
        //     className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'
        //         } ${disabeld}`}
        //     xmlns='http://www.w3.org/2000/svg'
        //     viewBox='0 0 24 24'
        // >
        //     {props.left && (
        //         <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
        //     )}
        //     {!props.left && (
        //         <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
        //     )}
        // </svg>
        <div
            onClick={props.onClick}
            className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'
                } ${disabeld}`}
            style={{ display: 'flex', alignItems: 'center' }}
        >
            {props.left &&
                <IoIosArrowBack size={30} />
            }
            {!props.left && (
                <IoIosArrowForward size={30} />
            )}
        </div>
    )
}

const WrapperSlider = styled.div`

    position: relative;
    padding-left: 40px;
    padding-right: 40px;

    & .arrow {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.7);
        cursor: pointer;
    }

    & .arrow--left {
        left: 5px;
    }

    & .arrow--right {
        left: auto;
        right: 5px;
    }

    & .arrow--disabled {
        color: rgb(0 0 0 / 13%);
    }
`

const SliderNavigation = styled.div`

    flex-wrap: inherit !important;

    & .keen-slider__slide .nav-link {
        text-align: center;
    }
`