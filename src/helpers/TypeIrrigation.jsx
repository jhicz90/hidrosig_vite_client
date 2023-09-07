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

export const typeWaterSource = (type) => {
    try {
        return ({
            1: 'Agua de la red',
            2: 'Aguas superficiales',
            3: 'Agua de lluvia',
            4: 'Agua subterránea',
            5: 'Agua de mar desalada',
            6: 'Aguas residuales urbanas depuradas',
            7: 'Agua de drenaje',
        }[type])
    } catch (err) {
        console.log(err)
        return ''
    }
}