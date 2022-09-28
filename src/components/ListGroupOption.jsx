import { forwardRef, useId } from 'react'
import { Form, FormCheck, ListGroup, ListGroupItem } from 'react-bootstrap'
import styled from 'styled-components'

export const ListGroupOption = ({ children }) => {
    return (
        <ListGroupRadio>
            {children}
        </ListGroupRadio>
    )
}

export const ListGroupOptionItem = forwardRef(({ labelTitle, labelDesc, valueOption, ...rest }, ref) => {

    const idRadioOption = useId()

    return (
        <div className='position-relative'>
            <input
                id={idRadioOption}
                {...rest}
                ref={ref}
                type='radio'
                value={valueOption}
                className='form-check-input position-absolute top-50 end-0 me-3 fs-5'
            />
            <label htmlFor={idRadioOption} className='form-label list-group-item py-3 pe-5'>
                <strong className='fw-semibold'>{labelTitle}</strong>
                <span className='d-block small opacity-75'>{labelDesc}</span>
            </label>
        </div>
    )
})

const ListGroupRadio = styled(ListGroup)`
    display: grid !important;
    /* gap: 0.5rem !important; */
    border: 0 !important;
    width: auto !important;

    & .form-check-input {
        z-index: 2;
        margin-top: -0.6em;
    }

    & .form-check-input:checked + .list-group-item {
        background-color: transparent;
        border-color: #0d6efd;
        box-shadow: 0 0 0 2px #0d6efd;
    }

    & .list-group-item {
        cursor: pointer;
        border-radius: 0.5rem;
    }
`