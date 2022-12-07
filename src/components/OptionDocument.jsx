import { docTypes } from '../types'

export const OptionDocument = ({ docm = null }) => {
    return (
        <div className='d-flex flex-column p-1' style={{ fontSize: '0.75rem' }}>
            <span className='text-start fw-bold'>{docTypes.find(d => d.type === docm.type).name}</span>
            <span className='text-start'>{docm?.name}</span>
            <span className='text-start'>{docm?.signer}</span>
        </div>
    )
}
