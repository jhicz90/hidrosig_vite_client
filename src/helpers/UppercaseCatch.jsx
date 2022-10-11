export const upperCaseCatch = (str = '') => {

    let catching = ''

    for (let index = 0; index < str.length; index++) {
        const charIndex = str[index]

        if (charIndex === charIndex.toUpperCase() && charIndex !== ' ') {
            catching = catching.concat(charIndex)
        }
    }

    return catching
}