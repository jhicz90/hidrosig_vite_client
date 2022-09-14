import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteActiveUserSys } from '../../../actions/UserSys'

export const DeleteUserSys = ({ type = 1 }) => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    const handleDelete = () => {
        dispatch(startDeleteActiveUserSys())
    }

    return (
        <>
            {
                Object.keys(active).length > 0
                &&
                <button
                    onClick={handleDelete}
                    className="btn btn-neutral text-warning fw-bold"
                >
                    {
                        type === 3
                        && <><i className="fa-solid fa-trash me-1" />Eliminar</>
                    }
                    {
                        type === 2
                        && <i className="fa-solid fa-trash" />
                    }
                    {
                        type === 1
                        && <>Eliminar cuenta</>
                    }
                </button>
            }
        </>
    )
}