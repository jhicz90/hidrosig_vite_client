import { Link } from 'react-router-dom'

import img404 from '../../../assets/404.svg'

export const NotFoundPage = () => {
    return (
        <div className="error-page">
            <div className="error-page-content">
                <div className="error-img">
                    <div className="error-img-code">404</div>
                    <img src={img404} alt="404" />
                </div>
                <h1>Oops!</h1>
                <h3>Nosotros no podemos encontrar la página que tu estas buscando</h3>
                <Link to={`/app/home`} className="btn btn-primary">Ir a Página principal</Link>
            </div>
        </div>
    )
}
