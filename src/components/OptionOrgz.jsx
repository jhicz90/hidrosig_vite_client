import { Avatar } from './Avatar'

export const OptionOrgz = ({ orgz = null }) => {
    return (
        <div className='d-flex p-1'>
            <Avatar
                img={orgz.image?.metadata.url}
                cloud={orgz.image?.cloud}
                noImgTxt={orgz.name}
                noImg={4003}
                circle={true}
                width={32}
                height={32}
            />
            <span className='ms-2 align-self-center'>{orgz.name}</span>
        </div>
    )
}
