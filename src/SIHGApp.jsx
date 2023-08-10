import { BrowserRouter } from 'react-router-dom'
import { Router } from './router/Router'

// S - Sistema de
// I - Informacion
// H - Hidro
// G - Grafico

const SIHGApp = () => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default SIHGApp