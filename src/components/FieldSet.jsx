import styled from 'styled-components'

export const FieldSet = ({ title = '', children }) => {
    return (
        <FieldSetStyle className='shadow-sm rounded-3 p-3 mb-3'>
            {
                title !== ''
                &&
                <legend>{title}</legend>
            }
            {children}
        </FieldSetStyle>
    )
}

const FieldSetStyle = styled.fieldset`
    background-color: transparent;
    border: 1px solid var(--bs-border-color-translucent);

    & legend {
        float: none;
        width: auto;
        margin: 0;
    }
`