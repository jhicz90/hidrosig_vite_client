import React, { useContext, useEffect, useMemo } from 'react'
import { CalendarContext } from '../context'
import moment from 'moment'
import { LoadingOverlay } from '../../../../../components'
import { CalendarContainer, CalendarMonth, DayCell, DaysContainer, DaysMonthContainer, DaysWeekContainer, MonthName } from './'
import { useLazyGetListVolByCmpAndIrrAndFrpQuery } from '../../../../../store/actions'

export const CalendarBody = () => {

    const [{ campaign, campaignId, inputIrrigId, farmCrop }, setContext] = useContext(CalendarContext)

    const year = useMemo(() => campaign?.year ?? new Date().getFullYear(), [campaign])

    const [loadVolDays, { data: events = [], isLoading }] = useLazyGetListVolByCmpAndIrrAndFrpQuery()

    useEffect(() => {
        if (events.length > 0) {
            setContext(v => ({ ...v, events }))
        }
    }, [events, setContext])

    useEffect(() => {
        if (!!farmCrop) {
            loadVolDays({
                campaign: campaignId,
                inputIrrig: inputIrrigId,
                farmCrop: farmCrop._id
            })
        }
    }, [farmCrop])

    return (
        <React.Fragment>
            <CalendarContainer>
                {
                    isLoading
                    &&
                    <LoadingOverlay />
                }
                {
                    new Array(12).fill(null).map((_, month) =>
                        <CalendarMonth key={`month-${month}`}>
                            <MonthName monthIndex={month} />
                            <DaysContainer>
                                <DaysWeekContainer>
                                    {
                                        new Array(7).fill(null).map((_, index) =>
                                            <div key={`week-${month}-${index}`} className='dayWeek'>
                                                {moment().isoWeekday(index + (index === 0 ? 7 : 0)).format('ddd').toUpperCase()}
                                            </div>
                                        )
                                    }
                                </DaysWeekContainer>
                                <DaysMonthContainer>
                                    {
                                        getAllDaysInMonth(month + 1, year).map((day, dayNumber) =>
                                            <React.Fragment key={`month-day-${month}-${moment(day).format('D')}`}>
                                                {
                                                    dayNumber === 0
                                                    &&
                                                    new Array(Number(moment(day).format('d'))).fill(null).map((_, dayEmpty) =>
                                                        <div
                                                            key={`month-day-empty-${month}-${moment(day).format('d')}-${dayEmpty}`}
                                                            className={`dayMonth dayEmpty ${Number(moment(day).isoWeekday(dayEmpty + (dayEmpty === 0 ? 7 : 0)).format('d')) === 0 ? 'daySunday' : ''}`}
                                                        ></div>
                                                    )
                                                }
                                                <DayCell date={day} />
                                            </React.Fragment>
                                        )
                                    }
                                </DaysMonthContainer>
                            </DaysContainer>
                        </CalendarMonth>
                    )
                }
            </CalendarContainer>
        </React.Fragment>
    )
}

const getAllDaysInMonth = (month, year) =>
    Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) => new Date(year, month - 1, i + 1)
    )