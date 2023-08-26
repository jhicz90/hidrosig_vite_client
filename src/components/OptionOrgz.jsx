import { Avatar } from './Avatar'

export const OptionOrgz = ({ orgz = null }) => {
    return (
        <div className='d-flex flex-row align-items-center p-1'>
            <Avatar
                img={orgz?.image?.metadata?.url || ''}
                cloud={orgz?.image?.cloud || false}
                noImgTxt={orgz.name}
                noImg={4003}
                circle={true}
                width={32}
                height={32}
            />
            <div className='d-flex flex-column align-self-center ms-2'>
                <div className='fw-bold' style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{orgz?.name}</div>
                {
                    !!orgz?.committees
                    &&
                    <div className='text-muted' style={{ fontSize: '0.75rem' }}>COMISIONES: {orgz?.committees.length}</div>
                }
                {
                    !!orgz?.blocks
                    &&
                    <div className='text-muted' style={{ fontSize: '0.75rem' }}>BLOQUES DE RIEGO: {orgz?.blocks.length}</div>
                }
            </div>
        </div>
    )
}
