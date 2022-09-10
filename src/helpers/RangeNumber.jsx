export const rangeNumber = (init, end, step) => {
    let range = []
    let value = init
    while (value <= end) {
        range.push(value)
        value = value + step
    }

    return range
}