import { useState, useEffect } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import { MdClear } from 'react-icons/md'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import { SYSCONST } from '../types'

export const InputTextDebounce = ({ value, onChange, autoComplete = false }) => {

    const [valueInput, setValueInput] = useState(value)
    const [valueDebounce] = useDebounce(valueInput, SYSCONST.searchDebounce)

    useEffect(() => {
        onChange(valueDebounce)
    }, [valueDebounce])

    return (
        <InputText>
            <FormControl
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                autoComplete={autoComplete ? true : 'off'}
                placeholder={'Buscar...'}
            />
            {
                valueInput.length > 0
                &&
                <ButtonClear variant='outline-dark' size={'sm'} onClick={() => setValueInput('')}>
                    <MdClear size={20} />
                </ButtonClear>
            }
        </InputText>
    )
}

const InputText = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const ButtonClear = styled(Button)`
    position: absolute;
    right: 0.5rem;
    border: none !important;
    background-color: white !important;
    color: black !important;
`