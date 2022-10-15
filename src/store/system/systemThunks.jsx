import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { fetchByToken } from '../../helpers'
import { setGeneratingBackup, setSavingSystem, setSettings } from './systemSlice'

const SwalReact = withReactContent(Swal)

export const startGetSystemSettings = () => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `app/systemsettings`
        })

        if (resp.ok) {
            dispatch(setSettings(resp.systemsettings))
        }
    }
}

export const startUpdateBackupSchedule = ({ backupDatabaseSchedule }) => {
    return async (dispatch, getState) => {

        SwalReact.fire({
            title:
                <>
                    <div className='text-uppercase'>Intervalo de copia de seguridad</div>
                </>,
            html:
                <>
                    <div className='fs-5 mb-2'>¿Estás seguro de cambiar el tiempo con que el sistema genera una copia de seguridad?</div>
                    <div className='fs-5'>Si es asi, escriba su contraseña para confirmar</div>
                </>,
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            icon: 'question',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-neutral'
            },
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(setSavingSystem(true))

                const passwordConfirm = result.value || ''

                const resp = await fetchByToken({
                    endpoint: `app/updatebackupdatabaseschedule`,
                    data: { passwordConfirm, backupDatabaseSchedule },
                    method: 'PUT'
                })

                dispatch(setSavingSystem(false))

                if (resp.ok) {
                    dispatch(setSettings(resp.systemsettings))
                }
            }
        })
    }
}

export const startForceBackupDatabase = () => {
    return async (dispatch) => {

        dispatch(setGeneratingBackup(true))

        const resp = await fetchByToken({
            endpoint: 'app/forcebackupdatabase',
            method: 'POST'
        })

        if (resp.ok) {
            dispatch(setGeneratingBackup(false))
        }
    }
}