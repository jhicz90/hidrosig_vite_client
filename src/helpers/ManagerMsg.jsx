import { toast } from 'react-hot-toast'
import parse from 'html-react-parser'

export const msgFetchAlert = ({ msg }) => {
    msg.forEach(({ type, title, message, duration, dismiss, timeAgo, alertBy, err }) => {
        switch (type) {
            case 1:
                toast(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            case 2:
                toast.success(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            case 3:
                toast.error(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            case 4:
                toast.success(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            case 5:
                toast.error(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            case 6:
                toast.custom()
                break

            case 'custom':
                toast(t => (
                    <>
                        {message}
                    </>
                ), {
                    duration,
                    className: 'notify-body'
                })
                break

            default:
                toast(message, { duration })
                break

        }
    })
}

export const msgAlert = (msg, delay = 5000, type = 'default') => {
    switch (type) {
        case 'default':
            toast(msg, { duration: delay })
            break

        case 'success':
            toast.success(msg, { duration: delay })
            break

        case 'warning':
            toast.error(msg, { duration: delay })
            break

        case 'error':
            toast.error(msg, { duration: delay })
            break

        case 'info':
            toast(msg, { duration: delay })
            break

        default:
            toast(msg, { duration: delay })
            break
    }
}

const parseContent = (alert, tst) => {
    return parse(alert.content, {
        replace: (domNode) => {
            if (domNode.type === 'tag') {
                if (domNode.attribs.class === 'notify-title' && alert.title.length > 0) {
                    return <div className='fs-5 fw-bold text-uppercase'>{alert.title}</div>
                } else if (domNode.attribs.class === 'notify-link') {
                    if (alert.linkTitle === '') {
                        return (
                            alert.linkDownload
                                ? <a href={alert.link} target={alert.linkTarget ? '_blank' : ''} download rel="noreferrer" >{alert.link}</a>
                                : <a href={alert.link} target={alert.linkTarget ? '_blank' : ''} rel="noreferrer" >{alert.link}</a>
                        )
                    } else {
                        return (
                            alert.linkDownload
                                ? <a href={alert.link} target={alert.linkTarget ? '_blank' : ''} download rel="noreferrer" className="link-primary">{alert.linkTitle}</a>
                                : <a href={alert.link} target={alert.linkTarget ? '_blank' : ''} rel="noreferrer" className="link-primary">{alert.linkTitle}</a>
                        )
                    }
                } else {
                    return domNode
                }
            } else {
                return domNode
            }
        }
    })
}