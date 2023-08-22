export const HomePage = () => {
    return (
        <>
            {/* <SliderMixed
                slides={[
                    {
                        src: '/assets/slider1.jpg',
                        title: 'Bienvenidos a HIDRO WEB',
                        subtitle: 'Web diseñada para el seguimiento del recurso hidrico',
                        message: 'Use esta web para enterarse sobre el manejo del recurso hidrico en las diferentes JUNTAS DE USUARIOS registradas.'
                    },
                    {
                        src: '/assets/slider2.jpg'
                    },
                    {
                        src: '/assets/slider3.jpg'
                    }
                ]}
            /> */}
            <div className='container-md py-3'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='h3'>Noticias</div>
                        <div className='card'>
                            <img src='https://romin.com/sitio/wp-content/uploads/2016/11/riego-1156x578.jpg' className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>Mensaje</h5>
                                <p className='card-text'>Hola somos el cuerpo de WEB, desde aqui se iran insertando NOTICIAS, ARTICULOS, MENSAJES, etc.</p>
                                <button className='btn btn-primary'>Go somewhere</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className='h3'>Eventos</div>
                        <div className='card'>
                            <img src='http://www.chirapiura.gob.pe/imagenes/noticias/php5fNCxV-4.jpg' className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>Evento</h5>
                                <p className='card-text'>Hola somos el cuerpo de WEB, desde aqui se iran insertando NOTICIAS, ARTICULOS, MENSAJES, etc.</p>
                                <button className='btn btn-primary'>Go somewhere</button>
                            </div>
                        </div>
                        <div className='card'>
                            <img src='http://www.chirapiura.gob.pe/imagenes/noticias/php5fNCxV-4.jpg' className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>Evento</h5>
                                <p className='card-text'>Hola somos el cuerpo de WEB, desde aqui se iran insertando NOTICIAS, ARTICULOS, MENSAJES, etc.</p>
                                <button className='btn btn-primary'>Go somewhere</button>
                            </div>
                        </div>
                        <div className='card'>
                            <img src='http://www.chirapiura.gob.pe/imagenes/noticias/php5fNCxV-4.jpg' className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>Evento</h5>
                                <p className='card-text'>Hola somos el cuerpo de WEB, desde aqui se iran insertando NOTICIAS, ARTICULOS, MENSAJES, etc.</p>
                                <button className='btn btn-primary'>Go somewhere</button>
                            </div>
                        </div>
                        <div className='card'>
                            <img src='http://www.chirapiura.gob.pe/imagenes/noticias/php5fNCxV-4.jpg' className='card-img-top' alt='...' />
                            <div className='card-body'>
                                <h5 className='card-title'>Evento</h5>
                                <p className='card-text'>Hola somos el cuerpo de WEB, desde aqui se iran insertando NOTICIAS, ARTICULOS, MENSAJES, etc.</p>
                                <button className='btn btn-primary'>Go somewhere</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='h3'>Secciones</div>
                        <ul>
                            <li>Junta de Usuarios del Chira</li>
                            <li>Junta de Usuarios de Sechura</li>
                            <li>Junta de Usuarios del Alto Piura</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
