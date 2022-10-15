import { ListGroup } from 'react-bootstrap'
import { MiniLoader } from './MiniLoader'

export const SettingBlock = ({ title = '', children, loading = false, action = null, list = null }) => {
    return (
        <>
            <ListGroup.Item>
                <div className='d-flex flex-sm-row flex-column align-items-start align-items-sm-center'>
                    <div className='mb-2 mb-md-0'>
                        <div className='fs-6 fw-bolder mb-1'>
                            {title}
                            {
                                loading
                                &&
                                <div className='d-inline ms-3'>
                                    <MiniLoader />
                                </div>
                            }
                        </div>
                        <div className='fs-6 text-muted'>
                            {
                                !loading
                                &&
                                <>{children}</>
                            }
                        </div>
                    </div>
                    {action}
                </div>
            </ListGroup.Item>
            {list}
        </>
    )
}

export const SettingAction = ({ children }) => {

    return (
        <div className='settingaction ms-sm-auto w-sm-auto flex-md-shrink-0'>
            {children}
        </div>
    )
}