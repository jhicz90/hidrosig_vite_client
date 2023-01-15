export const pDistance = (progressive = '') => {
    let distance = 0

    progressive.split('+').forEach((p, i) => {
        distance = distance + Number(p) * (i === 0 ? 1000 : 1)
    })

    return distance
}

export const pProgressive = (distance = 0) => {

    const thousands = parseInt(distance / 1000).toString().padStart(3, '0')

    const hundreds = parseInt(distance - 1000 < 0 ? distance : distance - 1000).toString().padStart(3, '0')

    const decimals = parseInt((distance.toFixed(2) - parseInt(distance)) * 100).toString().padStart(2, '0')

    return `${thousands}+${hundreds}.${decimals}`
}