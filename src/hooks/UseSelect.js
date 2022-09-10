import { useEffect, useState } from 'react'

export const UseSelect = (selectValue = null, initialState = [], fields = ['name', '_id']) => {

    const checkInitialState = (valueInitial) => {
        let objValue = []

        if (Array.isArray(valueInitial)) {
            valueInitial.forEach(val => {
                if (val[fields[0]] !== undefined && val[fields[1]] !== undefined) {
                    objValue.push({ label: val[fields[0]], value: val[fields[1]] })
                }
            })
            return objValue
        } else {
            return []
        }
    }

    const handleChange = (option) => {
        setOptions({ ...options, selectValue: option })
    }

    const [options, setOptions] = useState({
        selectValue: checkInitialState(initialState).find(b => b.value === selectValue),
        list: checkInitialState(initialState)
    })

    const setValues = (selectValue, list) => {
        setOptions({
            selectValue: options.list.find(b => b.value === selectValue),
            list: checkInitialState(list)
        })
    }

    const [optionsValue, setOptionsValue] = useState('')

    useEffect(() => {
        setOptionsValue(options.selectValue ? options.selectValue.value : '')
    }, [options])

    return [options, setValues, handleChange, optionsValue]
}

export const UseSelectCreate = (inputValue = '', initialState = []) => {

    const checkInitialState = (valueInitial) => {
        let objValue = []

        if (Array.isArray(valueInitial)) {
            valueInitial.forEach(val => {
                if (val.value === undefined) {
                    objValue.push(createOption(val))
                } else {
                    objValue.push({ label: val.label, value: val.value })
                }
            })
            return objValue
        } else {
            return []
        }
    }

    const createOption = (label) => ({
        label,
        value: label,
    })

    const reset = () => {
        setOptions({ ...options, list: checkInitialState(initialState) })
    }

    const handleChange = (value) => {
        setOptions({ ...options, list: [...value] })
    }

    const handleSelectChange = (input) => {
        setOptions({ ...options, inputValue: input })
    }

    const handleKeyChange = (event) => {
        if (!options.inputValue) return null
        switch (event.keyCode) {
            case 9:
            case 13:
                setOptions({
                    inputValue: '',
                    list: [...options.list, createOption(options.inputValue)]
                })
                event.preventDefault()
                break

            case 32:
                event.preventDefault()
                break

            default:
                break
        }
    }

    const [options, setOptions] = useState({
        inputValue,
        list: checkInitialState(initialState),
    })

    const setValues = (options) => {
        setOptions({ ...options, list: checkInitialState(options) })
    }

    const [optionsValue, setOptionsValue] = useState([])

    useEffect(() => {
        let objValue = []

        options.list.forEach(val => {
            objValue.push(val.value)
        })

        setOptionsValue(objValue)
    }, [options.list])

    return [options, setValues, handleChange, handleSelectChange, handleKeyChange, optionsValue, reset]
}