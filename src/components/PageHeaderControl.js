import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearPageHeader, editActionPageHeader, editDescPageHeader, editTitlePageHeader, hidePageHeader, seePageHeader } from '../actions'

export const PageHeaderControl = ({ title = '', desc = '', action = null }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(seePageHeader())
        return () => {
            dispatch(hidePageHeader())
            dispatch(clearPageHeader())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(editTitlePageHeader(title))
    }, [dispatch, title])

    useEffect(() => {
        dispatch(editDescPageHeader(desc))
    }, [dispatch, desc])

    useEffect(() => {
        dispatch(editActionPageHeader(action))
    }, [dispatch, action])

    return <></>
}
