import { forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'

export const InputMask = ({ id, mask, maskPlaceholder, value = '', onChange, disabled }) => {
    return (
        <ReactInputMask
            id={id}
            mask={mask}
            maskPlaceholder={maskPlaceholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className='form-control'
        />
    )
}
