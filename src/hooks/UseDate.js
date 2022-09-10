import { useState } from 'react'
import moment from 'moment'
import { months } from '../types/Datepicker'
import { rangeNumber } from '../helpers/RangeNumber'

const years = rangeNumber(1900, new Date().getFullYear() + 10, 1)

export const UseDateOne = (initialDate = new Date()) => {

    const [date, _setDate] = useState(moment(initialDate).toDate())

    const handleDateChange = (dateSelected) => {
        _setDate(dateSelected)
    }

    const setDate = (date) => {
        _setDate(moment(date).toDate())
    }

    return [date, setDate, handleDateChange]
}

export const UseDateRange = () => {

}

export const UseDateHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => (
    <div className="input-group">
        <button
            style={{ border: '1px solid #ced4da' }}
            className="btn btn-light"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}>
            <i className="fas fa-chevron-left"></i>
        </button>
        <select
            className="form-select"
            value={new Date(date).getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
        >
            {years.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <select
            className="form-select"
            value={months[new Date(date).getMonth()]}
            onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
            }
        >
            {months.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <button
            style={{ border: '1px solid #ced4da' }}
            className="btn btn-light"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}>
            <i className="fas fa-chevron-right"></i>
        </button>
    </div>
)