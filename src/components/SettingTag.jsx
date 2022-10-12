import React from 'react'

export const SettingBlock = ({ title = '', children }) => {

    const action = Array.isArray(children) ? children.findIndex(ch => ch.hasOwnProperty('type') && ch.type.hasOwnProperty('name') && ch.type.name === 'SettingAction') : null
    const block = Array.isArray(children) ? children.filter((ch, i) => i !== action) : null

    return (
        <div className='d-flex flex-sm-row flex-column align-items-start align-items-sm-center'>
            <div className='mb-2 mb-md-0'>
                <div className='fs-6 fw-bolder mb-1'>{title}</div>
                <div className='fs-6 text-muted'>
                    {block}
                </div>
            </div>
            {children[action]}
        </div>
    )
}

export const SettingAction = ({ children }) => {

    return (
        <div className='settingaction ms-sm-auto w-sm-auto flex-md-shrink-0'>
            {children}
        </div>
    )
}