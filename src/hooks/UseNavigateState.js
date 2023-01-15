import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useNavigateState = (url = '') => {

  const { state } = useLocation()
  const navigate = useNavigate()
  const { from } = state

  const redirect = () => {
    navigate(from || url, { state: { from: from?.state?.from || null } })
  }

  const redirectEscape = () => {
    navigate(from || url, { replace: true, state: { from: from?.state?.from || null } })
  }


  return [state, redirect, redirectEscape]
}
