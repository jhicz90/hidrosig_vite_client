import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './SIHGApp'
// CONFIGURACION JS
import 'moment/dist/locale/es'

// ESTILOS
import 'bootstrap/dist/css/bootstrap.min.css'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css'
import 'animate.css'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
