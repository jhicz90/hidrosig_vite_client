import React from 'react'
import moment from 'moment'
import { TagNewReg } from './TagStatus'

export const TimeAgo = ({ timestamp = new Date(), timeago = false }) => {
    return (
        <div className='d-inline-flex flex-column'>
            <div className='flex-fill' style={{ fontSize: '0.75rem' }}>{moment(timestamp).format('DD MMMM, hh:mm A').toUpperCase()}</div>
            {
                !timeago &&
                <TagNewReg className time={timestamp} />
            }
            {
                timeago &&
                <div className='fst-italic text-muted mt-1' style={{ fontSize: '0.75rem' }}>({(moment(timestamp).fromNow())})</div>
            }
        </div>
    )
}
