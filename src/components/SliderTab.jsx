import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

export const SliderTab = ({ children }) => {

    const [sliderRef] = useKeenSlider(
        {
            mode: 'snap',
            slides: {
                origin: 'center',
                perView: 3,
                spacing: 10,
            },
        },
        [MutationPlugin]
    )

    return (
        <div ref={sliderRef} className='keen-slider'>
            {children}
        </div>
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