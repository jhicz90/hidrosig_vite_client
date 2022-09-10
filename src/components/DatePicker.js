import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import { rangeNumber } from '../helpers'

export const DatePicker = (props) => {
    return (
        <ReactDatePicker
            renderCustomHeader={DateHeader}
            dateFormat={'dd/MM/yyyy'}
            selected={moment(props.value).toDate() || new Date()}
            minDate={props.minDate || null}
            onChange={(date) => {
                props.onChange(moment(date).toISOString() || moment().toISOString())
            }}
            className='form-control'
        />
    )
}

const years = rangeNumber(1900, new Date().getFullYear() + 10, 1)

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

const DateHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => (
    <div className='input-group'>
        <button
            style={{ border: '1px solid #ced4da' }}
            className='btn btn-light'
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}>
            <i className='fas fa-chevron-left'></i>
        </button>
        <select
            className='form-select'
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
            className='form-select'
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
            className='btn btn-light'
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}>
            <i className='fas fa-chevron-right'></i>
        </button>
    </div>
)