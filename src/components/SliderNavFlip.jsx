import styled from 'styled-components'
import Flicking from '@egjs/react-flicking'

import '@egjs/react-flicking/dist/flicking.css'

export const SliderNavFlip = ({ refSlider = null, className = '', cameraClass = 'nav', spacingChilds = true, marginChilds = '0.25rem', children }) => {

    return (
        <Flicking
            ref={refSlider}
            autoResize={true}
            renderOnlyVisible={false}
            moveType='freeScroll'
            bound={true}
            align='prev'
            renderOnSameKey={true}
            className={className}
            spacingchilds={String(spacingChilds)}
            marginchilds={marginChilds}
            cameraClass={cameraClass}
        >
            {children}
        </Flicking>
    )
}

const FlipWrapper = styled(Flicking)`

    padding-left: 0.125rem;
    padding-right: 0.125rem;

        & > .flicking-camera > *:not(:last-child) {
            margin-right: ${props => props.spacingchilds === 'true' ? props.marginchilds : 'unset'};
        }

`