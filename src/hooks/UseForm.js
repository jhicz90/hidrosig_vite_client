import { useState } from 'react'

export const UseForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const reset = () => {
        setValues(initialState)
    }


    const handleInputChange = ({ target }) => {

        let value = null

        switch (target.type) {
            case 'checkbox':
                value = target.checked
                break

            default:
                value = target.value
                break
        }

        setValues({
            ...values,
            [target.name]: value
        })
    }

    return [values, setValues, handleInputChange, reset]
}