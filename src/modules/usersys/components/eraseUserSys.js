import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startEraseActiveUserSys } from '../../../actions/UserSys'

export const EraseUserSys = ({ type = 1 }) => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)

    const handleDelete = () => {
        dispatch(startEraseActiveUserSys())
    }

    return (
        <>
            {
                Object.keys(active).length > 0
                &&
                <button
                    onClick={handleDelete}
                    className="btn btn-neutral text-danger fw-bold"
                >
                    {
                        type === 3
                        && <><i className="fa-solid fa-file-circle-xmark me-1" />Borrar</>
                    }
                    {
                        type === 2
                        && <i className="fa-solid fa-file-circle-xmark" />
                    }
                    {
                        type === 1
                        && 'Borrar permanentemente'
                    }
                </button>
            }
        </>
    )
}
