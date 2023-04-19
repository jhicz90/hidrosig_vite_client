import { statusUserFarm, typeUserFarm } from '../helpers'
import { Avatar } from './Avatar'

export const OptionUserFarm = ({ userfarm = null }) => {
    return (
        <div className='d-flex flex-row align-items-center p-1'>
            <Avatar
                img={userfarm?.image?.metadata?.url || ''}
                cloud={userfarm?.image?.cloud || false}
                noImgTxt={userfarm.type > 1 ? `${userfarm.socialReason}` : `${userfarm.names} ${userfarm.lastName} ${userfarm.motherLastName}`}
                noImg={4004}
                circle={true}
                width={32}
                height={32}
            />
            <div className='d-flex flex-column align-self-center ms-2'>
                <div className='fw-bold' style={{ fontSize: '0.75rem' }}>{userfarm.type > 1 ? `${userfarm.socialReason}` : `${userfarm.names} ${userfarm.lastName} ${userfarm.motherLastName}`}</div>
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>TIPO DE USUARIO: {typeUserFarm(userfarm.type)}</div>
                <div className='text-muted' style={{ fontSize: '0.75rem' }}>ESTADO: {statusUserFarm(userfarm.status)}</div>
            </div>
        </div>
    )
}
