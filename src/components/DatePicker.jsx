import { forwardRef } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import ReactDatePicker, { CalendarContainer, registerLocale, setDefaultLocale } from 'react-datepicker'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IoCalendar } from 'react-icons/io5'
import moment from 'moment'
import { es } from 'date-fns/locale'

import 'react-datepicker/dist/react-datepicker.css'
import { useRef } from 'react'

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

export const DatePicker = ({ id, value = new Date(), className = '', disabled = false, minDate = null, title = '', modal = false, onChange, ...props }) => {

    const calendarRef = useRef()

    const handleDateToday = () => {
        onChange(moment().toISOString())
        calendarRef.current.state.open = false
    }

    const handleDateYesterday = () => {
        onChange(moment().add(-1, 'day').toISOString())
        calendarRef.current.state.open = false
    }

    const handleDateAWeekAgo = () => {
        onChange(moment().add(-1, 'week').toISOString())
        calendarRef.current.state.open = false
    }

    const handleDateAMonthAgo = () => {
        onChange(moment().add(-1, 'month').toISOString())
        calendarRef.current.state.open = false
    }

    const CustomInput = forwardRef(({ value, title, onClick, onFocus }, ref) => (
        <button
            type='button'
            ref={ref}
            onClick={onClick}
            onFocus={onFocus}
            title={title}
            className='btn btn-neutral w-100'
        >
            <div className='d-flex gap-2 justify-content-between align-items-center w-100'>
                <IoCalendar />
                {value}
            </div>
        </button>
    ))

    const HeaderCustom = ({
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
                className='btn btn-sm btn-neutral d-flex align-items-center justify-content-end gap-2'
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
                className='btn btn-sm btn-neutral d-flex align-items-center justify-content-end gap-2'
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type='button'
            >
                <BsChevronRight />
            </button>
        </div>
    )

    const CalendarCustom = ({ className, children }) => {
        return (
            <div className='react-datepicker__container d-flex flex-row bg-white border border-1 border-secondary-subtle' style={{ borderRadius: '9px' }}>
                <ListGroup className='react-datepicker__pre-dates' style={{ width: '160px' }}>
                    <ListGroup.Item
                        onClick={handleDateToday}
                        action
                        type='button'
                    >
                        Hoy
                    </ListGroup.Item>
                    <ListGroup.Item
                        onClick={handleDateYesterday}
                        action
                        type='button'
                    >
                        Ayer
                    </ListGroup.Item>
                    {/* <ListGroup.Item action type='button'>
                        Esta semana
                    </ListGroup.Item> */}
                    <ListGroup.Item
                        onClick={handleDateAWeekAgo}
                        action
                        type='button'
                    >
                        Semana pasada
                    </ListGroup.Item>
                    {/* <ListGroup.Item action type='button'>
                        Este mes
                    </ListGroup.Item> */}
                    <ListGroup.Item
                        onClick={handleDateAMonthAgo}
                        action
                        type='button'
                    >
                        Mes pasado
                    </ListGroup.Item>
                    {/* <ListGroup.Item action>
                        N dias atras
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        N dias adelante
                    </ListGroup.Item> */}
                </ListGroup>
                <CalendarContainer className={className}>
                    <div style={{ position: 'relative' }}>{children}</div>
                </CalendarContainer>
            </div>
        )
    }

    return (
        <ReactDatePicker
            id={id || ''}
            ref={calendarRef}
            customInput={<CustomInput />}
            renderCustomHeader={HeaderCustom}
            calendarContainer={CalendarCustom}
            dateFormat={'dd/MM/yyyy'}
            selected={moment(value).toDate() || new Date()}
            minDate={minDate}
            onChange={(date) => {
                onChange(moment(date).toISOString() || moment().toISOString())
            }}
            wrapperClassName={`btn btn-neutral p-0 border-0`}
            disabled={disabled}
            className='form-control'
            //? REVISAR portalId MÁS ADELANTE
            // portalId='body'
            title={title}
            withPortal={modal}
            // {...props}
        />
    )
}