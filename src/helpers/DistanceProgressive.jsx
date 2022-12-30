export const pDistance = (progressive = '') => {
    let distance = 0

    progressive.split('+').forEach((p, i) => {
        distance = distance + Number(p) * (i === 0 ? 1000 : 1)
    })
    
    return distance
}