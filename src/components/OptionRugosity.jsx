export const OptionRugosity = ({ rug = null }) => {
    return (
        <div className='d-flex flex-column'>
            <div className='fw-bold'>{rug.name}</div>
            <div>{rug.value}</div>
        </div>
    )
}
