import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { toast, ToastBar, Toaster } from 'react-hot-toast'
import { AuthMiddleware } from './guards'
import { store } from './store'
import { Router } from './router/Router'

// S - Sistema de
// I - Informacion
// H - Hidro
// G - Grafico

const SIHGApp = () => {
    return (
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
            <BrowserRouter>
                <CookiesProvider>
                    <AuthMiddleware>
                        <Router />
                    </AuthMiddleware>
                </CookiesProvider>
            </BrowserRouter>
        </Provider>
    )
}

export default SIHGApp