import styled from 'styled-components'
import Flicking from '@egjs/react-flicking'

import '@egjs/react-flicking/dist/flicking.css'

export const SliderNavFlip = ({ children }) => {
    return (
        <FlipWrapper
            moveType='freeScroll'
            bound={true}
            align='prev'
            renderOnSameKey={true}
        >
            {children}
        </FlipWrapper>
    )
}

const FlipWrapper = styled(Flicking)`

    padding-left: 0.125rem;
    padding-right: 0.125rem;

    & *:not(:last-child) {
        margin-right: 0.5rem;
    }
`