import { forwardRef } from 'react'
import { Form, FormCheck, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

export const ListGroupOption = ({ children }) => {
    return (
        <ListGroupRadio>
            {children}
        </ListGroupRadio>
    )
}

export const ListGroupOptionItem = forwardRef(({ labelTitle, labelDesc, value, ...rest }, ref) => {
    return (
        <div className='position-relative'>
            <input
                id={`radio-option-${value}`}
                {...rest}
                ref={ref}
                type='radio'
                value={value}
                className='form-check-input position-absolute top-50 end-0 me-3 fs-5'
            />
            <ListGroup.Item htmlFor={`radio-option-${value}`} as={Form.Label} className='py-3 pe-5'>
                <strong className='fw-semibold'>{labelTitle}</strong>
                <span className='d-block small opacity-75'>{labelDesc}</span>
            </ListGroup.Item>
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