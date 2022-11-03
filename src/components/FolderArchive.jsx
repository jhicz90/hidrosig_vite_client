export const FolderArchive = ({ folderName = '', action = null, selected = false }) => {
    return (
        <div
            onClick={action}
            className="file"
            style={{
                boxShadow: `0 0 0 0.25rem ${selected ? '#0d6efd' : '#e9ecef'}`,
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f0f0ad',
                overflow: 'hidden',
                width: '230px',
                height: '230px',
            }}
        >
            <div style={{
                flexGrow: 1,
                backgroundImage: 'url("http://localhost:4000/api/resource/image/sys/get/1022")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                borderRadius: '0.375rem 0.375rem 0 0',
            }} />
            <div style={{
                fontSize: '16px',
                textAlign: 'center',
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: selected ? '#0d6efd' : 'inherit'
            }}>
                <span
                    className='fw-semibold'
                    style={{
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                        padding: '2px 4px',
                        borderRadius: '3px'
                    }}>
                    {folderName}
                </span>
            </div>
        </div>
    )
}
