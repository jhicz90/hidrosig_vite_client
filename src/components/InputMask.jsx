import ReactInputMask from 'react-input-mask'

export const InputMask = (props) => {
    return (
        <ReactInputMask
            id={props.id || ''}
            mask={props.mask}
            maskPlaceholder={props.maskPlaceholder}
            value={props.value || 0}
            onChange={props.onChange}
            className='form-control'
        />
    )
}
