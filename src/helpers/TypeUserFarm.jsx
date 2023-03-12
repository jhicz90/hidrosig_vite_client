export const typeUserFarm = (type) => {
    try {
        return ({
            1: 'Natural',
            2: 'Juridico',
            3: 'Institucional',
            4: 'Sucesión Hereditaria',
            5: 'Sociedad Conyugal',
            6: 'Otros'
        }[type])
    } catch (err) {
        console.log(err)
        return ''
    }
}