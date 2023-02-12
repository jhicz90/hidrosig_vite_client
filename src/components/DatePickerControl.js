import React from 'react'
import DatePicker from 'react-multi-date-picker'
import moment from 'moment'

const months = [
    ['Enero', 'Ene'],
    ['Febrero', 'Feb'],
    ['Marzo', 'Mar'],
    ['Abril', 'Abr'],
    ['Mayo', 'May'],
    ['Junio', 'Jun'],
    ['Julio', 'Jul'],
    ['Agosto', 'Ago'],
    ['Setiembre', 'Set'],
    ['Octubre', 'Oct'],
    ['Noviembre', 'Nov'],
    ['Diciembre', 'Dic'],
]

const weekDays = [
    ['Lunes', 'Lun'],
    ['Martes', 'Mar'],
    ['Miercoles', 'Mie'],
    ['Jueves', 'Jue'],
    ['Viernes', 'Vie'],
    ['Sábado', 'Sáb'],
    ['Domingo', 'Dom'],
]

export const DatePickerControl = (props) => {
    return (
        <DatePicker
            months={months}
            weekDays={weekDays}
            value={moment(props.value).format('DD/MM/YYYY') || ''}
            format={'DD/MM/YYYY'}
            onChange={(date) => {
                props.onChange(date?.isValid ? moment(`${date.year}-${date.monthIndex + 1}-${date.day}`).toISOString() : '')
            }}
        />
    )
}
