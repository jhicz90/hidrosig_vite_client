export const typeIrrigation = (type) => {
    try {
        return ({
            0: 'No regulado',
            1: 'Regulado',
            2: 'Variable'
        }[type])
    } catch (err) {
        console.log(err)
        return ''
    }
}