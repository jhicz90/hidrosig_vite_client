import { forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'

export const InputMask = forwardRef((props, ref) => {
    return (
        <ReactInputMask
            ref={ref}
            mask={props.mask}
            maskPlaceholder={props.maskPlaceholder}
            className='form-control'
            {...props}
        />
    )
})
