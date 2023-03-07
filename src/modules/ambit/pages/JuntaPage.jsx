import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetJuntaByIdQuery } from '../../../store/actions'
import { LoadingPage } from '../../../components'
import { JuntaAmbitZone, JuntaBanner, JuntaModuleDelete, JuntaInformation, JuntaAmbitWaterSource, JuntaAmbitCommittee } from '../components'
import { Card, Nav, Tab } from 'react-bootstrap'
import { useNavigateState } from '../../../hooks'

export const JuntaPage = () => {

    const { juntaid } = useParams()
    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const dispatch = useDispatch()
    const { data = null, isLoading, isError } = useGetJuntaByIdQuery(juntaid)

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        redirectEscape()
    }

    return (
        <>
            {
                !!data
                &&
                <>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className="col-sm-3">
                                <JuntaBanner />
                            </div>
                            <div className='col-sm-9'>
                                <Tab.Container>
                                    <Card className='p-2'>
                                        <Nav variant='pills'>
                                            <Nav.Item>
                                                <NavLink to={``} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Información</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink to={`zn`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Zonas</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink to={`ws`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Fuentes de agua</NavLink>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <NavLink to={`comm`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comisiones</NavLink>
                                            </Nav.Item>
                                        </Nav>
                                    </Card>
                                    <div className='mt-2'>
                                        <Routes>
                                            <Route index element={<JuntaInformation />} />
                                            <Route path={`zn`} element={<JuntaAmbitZone />} />
                                            <Route path={`ws`} element={<JuntaAmbitWaterSource />} />
                                            <Route path={`comm`} element={<JuntaAmbitCommittee />} />
                                        </Routes>
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}