export const normalizeText = (str = '', { lowerCase = false, removeSpaces = false, removeSymbols = true }) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    lowerCase === true && (str = str.toLowerCase())

    removeSpaces === true && (str = str.replace(/ /g, ''))

    removeSymbols === true && (str = str.replace(/[^a-zA-Z0-9 ]/g, ''))

    return str
}