import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaServer } from 'react-icons/fa'
import { LoadingPage, ModuleNav } from '../../../components'
import { SystemSettings } from '../components'
import { setSettings, startGetSystemSettings } from '../../../store/actions'

export const SystemPage = () => {

    const dispatch = useDispatch()
    const { settings } = useSelector(state => state.system)

    useEffect(() => {
        dispatch(startGetSystemSettings())
        return () => dispatch(setSettings(null))
    }, [dispatch])

    return (
        <>
            {
                !!settings
                    ?
                    <div className='container'>
                        <ModuleNav
                            modules={[
                                {
                                    id: 'systemsettings',
                                    icon: FaServer,
                                    name: 'Sistema',
                                    title: true,
                                    module: SystemSettings
                                }
                            ]}
                        />
                    </div>
                    :
                    <LoadingPage />
            }
        </>
    )
}
