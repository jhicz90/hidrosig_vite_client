export const OptionBlock = ({ block = null }) => {
    return (
        <div className='d-flex flex-column p-1'>
            <div className='fw-bold' style={{ fontSize: '0.75rem' }}>{block.name.toUpperCase()}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>CODIGO: {block.code}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>RESOLUCIÓN: {block.resolution.name}</div>
        </div>
    )
}