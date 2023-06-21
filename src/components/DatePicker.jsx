import moment from 'moment'
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { es } from 'date-fns/locale'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('es', es)
setDefaultLocale('es')

const years = (init = 1900, end = new Date().getFullYear(), options = { step: 1 }) => {
    let range = []
    let value = init
    while (value <= end) {
        range.push(value)
        value = value + options.step
    }

    return range
}

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
    <div
        className='input-group px-1 pb-1'
    >
        <button
            style={{ border: '1px solid #ced4da' }}
            className='btn btn-light'
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type='button'
        >
            <BsChevronLeft />
        </button>
        <select
            className='form-select'
            value={new Date(date).getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
        >
            {
                years(1900, new Date(date).getFullYear() + 1).map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
        <select
            className='form-select'
            value={months[new Date(date).getMonth()]}
            onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
            }
        >
            {
                months.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
        <button
            style={{ border: '1px solid #ced4da' }}
            className='btn btn-light'
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type='button'
        >
            <BsChevronRight />
        </button>
    </div>
)

export const DatePicker = (props) => {
    return (
        <ReactDatePicker
            id={props.id || ''}
            renderCustomHeader={DateHeader}
            dateFormat={'dd/MM/yyyy'}
            selected={moment(props.value).toDate() || new Date()}
            minDate={props.minDate || null}
            onChange={(date) => {
                props.onChange(moment(date).toISOString() || moment().toISOString())
            }}
            className={`form-control ${props.className}`}
            disabled={props.disabled || false}
        />
    )
}