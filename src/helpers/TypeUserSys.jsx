export const namesUserSys = (usr) => {
    try {
        return `${usr.names} ${usr.surnames}`
    } catch (err) {
        console.log(err)
        return ''
    }
}