import React from 'react'
import Lottie from 'lottie-react'
import styled from 'styled-components'
import waterAnimation from './animation_waterFilling.json'

export const LoadingLottie = () => {
    return (
        <LottieWrapper className='lottie-wrapper animate__animated animate__fadeOut'>
            <Lottie
                animationData={waterAnimation}
                loop={true}
                className='lootie'
                style={{
                    height: '300px'
                }}
            />
        </LottieWrapper>
    )
}

const LottieWrapper = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;

    & > .lootie {
        position: absolute;
        width: 100%;
        top: 30%;
    }
`