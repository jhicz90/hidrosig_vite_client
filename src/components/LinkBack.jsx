import { Link, useLocation } from 'react-router-dom'

export const LinkBack = ({ to, state, ...props }) => {

    let location = useLocation()
    location = { ...location, state }

    return (
        <Link to={to} {...props} state={{ from: location }} />
    )
}
