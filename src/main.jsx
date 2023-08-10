import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './SIHGApp'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { toast, ToastBar, Toaster } from 'react-hot-toast'
import { AuthMiddleware } from './guards'
import { store } from './store'
// CONFIGURACION JS
import 'moment/dist/locale/es'

// ESTILOS
import 'bootstrap/dist/css/bootstrap.min.css'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css'
import 'animate.css'
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster reverseOrder={false} position='bottom-right'>
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                {message}
                                {(t.type !== 'loading' && t.ariaProps.dismiss === 'true') && (
                                    <button
                                        className='btn btn-neutral ui-text-red ui-bg-white border-0 shadow-none border-start border-1 py-4'
                                        style={{
                                            height: '100%',
                                            fontWeight: '500',
                                            borderTopLeftRadius: '0',
                                            borderBottomLeftRadius: '0',
                                            borderTopRightRadius: '8px',
                                            borderBottomRightRadius: '8px'
                                        }}
                                        onClick={() => toast.dismiss(t.id)}>Cerrar</button>
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
            <CookiesProvider>
                <AuthMiddleware>
                    <App />
                </AuthMiddleware>
            </CookiesProvider>
        </Provider>
    </React.StrictMode>
)
