export const OptionLocation = ({ location = null }) => {
    return (
        <div className='d-flex flex-column p-1'>
            <div className='fw-bold' style={{ fontSize: '0.75rem' }}>{`${location.region} - ${location.departamento} - ${location.provincia}`}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>INEI: {location.inei}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>RENIEC: {location.reniec}</div>
        </div>
    )
}
