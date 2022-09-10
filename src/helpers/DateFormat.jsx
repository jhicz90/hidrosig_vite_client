import moment from 'moment'

export const formatDate = (date, timeago = false) => {
    if (timeago) return `${moment(date).format('DD/MM/yyyy')} (${moment(date).fromNow()})`
    return `${moment(date).format('DD/MM/yyyy')}`
}

export const formatFullDate = (date) => {
    return `${moment(date).format('LLL')}`
}

export const formatAgoDate = (date) => {
    if (moment(date).isValid()) {
        return `${moment(date).fromNow()}`
    } else {
        return `Sin fecha aún`
    }
}