export const OptionRole = ({ role = null }) => {
    return (
        <div className='d-flex flex-column align-items-start'>
            <div>{role?.name}</div>
            <div>Nivel de acceso: {role?.levelRole}</div>
            {role.levelRole > 1 && <div>Junta: {role?.junta?.name}</div>}
            {role.levelRole === 3 && <div>Comision: {role?.committee?.name}</div>}
        </div>
    )
}
