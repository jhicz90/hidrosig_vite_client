import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './SIHGApp'
// CONFIGURACION JS
import 'moment/dist/locale/es'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { es } from 'date-fns/locale'
registerLocale('es', es)
setDefaultLocale('es')

// ESTILOS
import 'react-datepicker/dist/react-datepicker.css'
import 'react-cmdk/dist/cmdk.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css'
import 'react-custom-scroll/dist/customScroll.css'
import 'animate.css'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
