import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { MdClear } from 'react-icons/md'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import { SYSCONST } from '../types'

export const InputSearch = ({ className = '', value, onChange, debounce = 500, autoComplete = false, loading = false, placeholder = 'Buscar...', controlId = 'search' }) => {

    const [valueInput, setValueInput] = useState(value)
    const [valueDebounce] = useDebounce(valueInput, debounce <= 500 ? debounce : SYSCONST.searchDebounce)

    useEffect(() => {
        onChange(valueDebounce)
    }, [valueDebounce])

    useEffect(() => {
        setValueInput(value)
    }, [value])

    return (
        <SearchBox className={className}>
            <Form.Control
                id={controlId}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                autoComplete={autoComplete ? true : 'off'}
                placeholder={placeholder}
                type='text'
                name='search'
            />
            <BsSearch className='search-box-icon' size={20} color='#8a94ad' />
            <div className='search-box-options'>
                {
                    loading
                    &&
                    <BeatLoader size={10} color='#8a94ad' style={{ opacity: 0.7, display: 'flex' }} />
                }
                {
                    valueInput.length > 0
                    &&
                    <ButtonClear className='search-box-clear' variant='outline-dark' size={'sm'} onClick={() => setValueInput('')}>
                        <MdClear size={20} />
                    </ButtonClear>
                }
            </div>
        </SearchBox>
    )
}

const SearchBox = styled.div`
    position: relative;
    box-sizing: content-box;

    & .form-control {
        padding-left: 2.5rem;
        padding-right: 2rem;
        border-radius: 0.375rem;
    }

    & .search-box-icon {
        overflow: visible;
        box-sizing: content-box;
        position: absolute;
        color: #1f6bff;
        top: 50%;
        left: 12px;
        transform: translateY(-48%);
        display: inline-block;
        height: 1.5em;
        overflow: visible;
        vertical-align: -0.125em;
    }

    & .search-box-options {
        /* box-sizing: content-box; */
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-48%);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        /* height: 1.5em; */
        /* vertical-align: -0.125em; */
    }
`

const ButtonClear = styled(Button)`
    display: flex;
    align-items: center;
    border: none !important;
    background-color: white !important;
    color: black !important;
`