import Flicking from '@egjs/react-flicking'

import '@egjs/react-flicking/dist/flicking.css'
import styled from 'styled-components'

export const SliderNavFlip = ({ children }) => {
    return (
        <FlipWrapper moveType='freeScroll' align='prev'>
            {children}
        </FlipWrapper>
    )
}

const FlipWrapper = styled(Flicking)`
    & *:not(:last-child) {
        margin-right: 0.5rem;
    }
`