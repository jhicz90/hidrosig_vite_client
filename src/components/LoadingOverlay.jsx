import React from 'react'
import styled from 'styled-components'
import { ScaleLoader } from 'react-spinners'

export const LoadingOverlay = ({ bgTransparent = false }) => {
    return (
        <SpinnerWrapper bgTransparent={bgTransparent}>
            <div className='loading top-50 start-50 translate-middle'>
                <h4>Cargando...</h4>
                <ScaleLoader color='#1f6bff' height={90} width={15} margin={6} />
            </div>
        </SpinnerWrapper>
    )
}

const SpinnerWrapper = styled.div`
    height: 100%;
    width: 100%;

    & > .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${props => Boolean(props.bgTransparent) ? 'black' : 'white'};
        background-color: ${props => Boolean(props.bgTransparent) ? 'transparent' : 'var(--bs-border-color-translucent)'};
    }
`