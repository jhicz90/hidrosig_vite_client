import { imageGet } from '../helpers'
import { Avatar } from './Avatar'

export const OptionOrgz = ({ orgz = null }) => {
    return (
        <div className='d-flex p-1'>
            <Avatar
                img={orgz.image?.fileName}
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