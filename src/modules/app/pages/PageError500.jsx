import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearToolbarActions } from '../../../store/actions'

import ocThinking from '../../../assets/oc-thinking.svg'

export const PageError500 = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
    })

    return (
        <div style={{ display: 'flex', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
            <div className='container-fluid'>
                <div className='row justify-content-center align-items-sm-center py-sm-10'>
                    <div className='col-9 col-sm-6 col-lg-4'>
                        <div className='text-center text-sm-end me-sm-4 mb-5 mb-sm-0'>
                            <img className='img-fluid' src={ocThinking} alt='404' />
                        </div>
                    </div>

                    <div className='col-sm-6 col-lg-4 text-center text-sm-start'>
                        <h1 className='display-1 mb-0'>404</h1>
                        <p className='lead'>Lo siento, la página que estabas viendo no puede ser encontrada, o simplemente ocurrio un error.</p>
                        <Link to={`/app`} className='btn btn-primary'>Regresar al INICIO</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
