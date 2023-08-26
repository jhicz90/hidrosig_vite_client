export const typeIrrigation = (type) => {
    try {
        return ({
            1: 'No regulado',
            2: 'Regulado',
            3: 'Variable'
        }[type])
    } catch (err) {
        console.log(err)
        return ''
    }
}