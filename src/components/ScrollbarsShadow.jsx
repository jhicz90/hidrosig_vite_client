import { useRef } from 'react'
import Scrollbars from 'rc-scrollbars'

export const ScrollbarsShadow = (props) => {

    const scrollbars = useRef(null)
    const shadowTop = useRef(null)
    const shadowBottom = useRef(null)
    const { style } = props
    const containerStyle = {
        ...style,
        position: 'relative',
    }
    const shadowTopStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 3
    }
    const shadowBottomStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 10,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 3
    }
    const handleUpdate = (values) => {
        const { scrollTop, scrollHeight, clientHeight } = values
        const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20)
        const bottomScrollTop = scrollHeight - clientHeight
        const shadowBottomOpacity =
            (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
        shadowTop.current.style.opacity = shadowTopOpacity
        shadowBottom.current.style.opacity = shadowBottomOpacity
    }

    return (
        <div style={containerStyle}>
            <Scrollbars ref={scrollbars} onUpdate={handleUpdate} {...props} />
            <div ref={shadowTop} style={shadowTopStyle} />
            <div ref={shadowBottom} style={shadowBottomStyle} />
        </div>
    )
}
