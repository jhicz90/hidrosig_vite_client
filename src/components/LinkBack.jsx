import { Link, useLocation } from 'react-router-dom'

export const LinkBack = ({ to, ...props }) => {

    const location = useLocation()

    return (
        <Link to={to} state={{ from: location }} {...props} />
    )
}
