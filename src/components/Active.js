export const Active = ({ active }) => {
    return (
        <>
            {
                active
                    ?
                    <span className="badge bg-success rounded-pill px-2 py-1"><i className="fa-solid fa-check me-1" />Activo</span>
                    :
                    <span className="badge bg-warning rounded-pill px-2 py-1 text-dark"><i className="fa-solid fa-circle-minus me-1" />Desactivado</span>
            }
        </>
    )
}
