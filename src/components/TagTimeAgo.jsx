import React from 'react'
import moment from 'moment'
import { TagNewReg } from './TagStatus'

export const TagTimeAgo = ({ timestamp = new Date(), timeago = false }) => {
    return (
        <div className='d-inline-flex flex-column'>
            <div className='flex-fill' style={{ fontSize: '0.75rem' }}>{moment(timestamp).format('DD MMMM YYYY, hh:mm A').toUpperCase()}</div>
            {
                !timeago &&
                <TagNewReg time={timestamp} />
            }
            {
                timeago &&
                <div className='fst-italic text-muted mt-1' style={{ fontSize: '0.75rem' }}>({(moment(timestamp).fromNow())})</div>
            }
        </div>
    )
}

export const TagDate = ({ date = new Date() }) => {
    return (
        <div className='d-inline-flex flex-column'>
            <div className='flex-fill' style={{ fontSize: '0.75rem' }}>{moment(date).format('DD MMMM YYYY').toUpperCase()}</div>
        </div>
    )
}