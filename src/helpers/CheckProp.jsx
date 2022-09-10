export const chckProp = (obj, prop) => {
    return obj.hasOwnProperty(prop)
        ? (obj[prop] !== null ? true : false)
        : false
}