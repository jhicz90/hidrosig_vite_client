export const normalizeText = (str = '', { lowerCase = false, removeSpaces = false }) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    lowerCase === true && (str = str.toLowerCase())

    removeSpaces === true && (str = str.replace(/ /g, ''))

    return str
}