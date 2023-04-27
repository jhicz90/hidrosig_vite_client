import styled from 'styled-components'
import Flicking from '@egjs/react-flicking'

import '@egjs/react-flicking/dist/flicking.css'

export const SliderNavFlip = ({ refSlider = null, className = '', spacingChilds = true, marginChilds = '0.5rem', children }) => {

    return (
        <FlipWrapper
            ref={refSlider}
            moveType='freeScroll'
            bound={true}
            align='prev'
            renderOnSameKey={true}
            className={className}
            spacingchilds={String(spacingChilds)}
            marginchilds={marginChilds}
        >
            {children}
        </FlipWrapper>
    )
}

const FlipWrapper = styled(Flicking)`

    padding-left: 0.125rem;
    padding-right: 0.125rem;

        & *:not(:last-child) {
            margin-right: ${props => props.spacingchilds === 'true' ? props.marginchilds : 'unset'};
        }

`