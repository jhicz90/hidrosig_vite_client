import React from 'react'
import moment from 'moment'

export const TimeAgo = ({ timestamp = new Date(), timeago = false }) => {
    return (
        <>
            <span>{moment(timestamp).format('DD/MM/yyyy')}</span>
            {
                timeago &&
                <>{' '} <span className="fst-italic text-muted">({(moment(timestamp).fromNow())})</span></>
            }
        </>
    )
}
