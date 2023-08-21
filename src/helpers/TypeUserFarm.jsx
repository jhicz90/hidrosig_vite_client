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

export const statusUserFarm = (status) => {
    try {
        return ({
            0: 'Fallecido',
            1: 'Vivo',
            2: 'Heredero',
        }[status])
    } catch (err) {
        console.log(err)
        return ''
    }
}

export const namesUserFarm = (usr) => {
    try {
        if (usr.type === 1) {
            return `${usr.names} ${usr.lastName} ${usr.motherLastName}`
        }else {
            return `${usr.socialReason}`
        }
    } catch (err) {
        console.log(err)
        return ''
    }
}