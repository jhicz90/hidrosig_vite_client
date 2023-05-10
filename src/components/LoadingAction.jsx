import { PuffLoader } from 'react-spinners'

export const LoadingAction = () => {
    return (
        <div className='d-flex align-items-center justify-content-center my-3'>
            <PuffLoader color='#1f6bff' margin={6} />
        </div>
    )
}
