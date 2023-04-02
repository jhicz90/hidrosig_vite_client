import { Link, useLocation } from 'react-router-dom'

export const LinkBack = ({ to, state = {}, ...props }) => {

    const location = useLocation()

    return (
        <Link {...props} to={to} state={{ from: location, ...state }} />
    )
}
