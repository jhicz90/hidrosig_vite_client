import { useState, useEffect } from 'react'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { MdClear } from 'react-icons/md'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import { SYSCONST } from '../types'
import { MiniLoader } from './MiniLoader'

export const InputSearch = ({ className = '', value, onChange, autoComplete = false, loading = false, placeholder = 'Buscar...', controlId = 'search' }) => {

    const [valueInput, setValueInput] = useState(value)
    const [valueDebounce] = useDebounce(valueInput, SYSCONST.searchDebounce)

    useEffect(() => {
        onChange(valueDebounce)
    }, [valueDebounce])

    return (
        <Form.Group as={Row} className={`gx-2 ${className}`} controlId={controlId}>
            {
                loading
                    ?
                    <Col xs='auto' className='d-flex align-items-center' style={{ flex: '0 0 40px' }}>
                        <MiniLoader />
                    </Col>
                    :
                    <Form.Label column xs='auto' style={{ flex: '0 0 40px' }}>
                        <BsSearch size={22} />
                    </Form.Label>
            }
            <Col>
                <InputText>
                    <FormControl
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        autoComplete={autoComplete ? true : 'off'}
                        placeholder={placeholder}
                    />
                    {
                        valueInput.length > 0
                        &&
                        <ButtonClear variant='outline-dark' size={'sm'} onClick={() => setValueInput('')}>
                            <MdClear size={20} />
                        </ButtonClear>
                    }
                </InputText>
            </Col>
        </Form.Group>
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