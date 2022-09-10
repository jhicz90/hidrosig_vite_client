import React from 'react'
import { Image } from './Image'

export const ImageFile = ({ img = '', noImg = 2010 }) => {

    return (
        <div className="ui-100 position-relative mb-3 me-3 pe-cursor border border-1 rounded-3">
            <Image
                className="rounded-3 position-absolute"
                style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}
                img={img}
                noImg={noImg}
            />
            <div
                className="ui-20 d-flex align-items-center justify-content-center position-absolute rounded-circle ui-text-white ui-bg-red top-0 end-0"
                style={{ marginRight: '-0.5rem', marginTop: '-0.5rem' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' className="ui-15"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        </div>
    )
}
