export const comandModules = (comands) => {
    const newArr = []
    const arr = [...comands].map(c => {
        if (c.children) {
            newArr.push(...c.children.filter(ch => ch.to !== '').map(ch => ({ ...ch, id: `${c.to}_${ch.to}`, to: `${c.to}/${ch.to}`, section: 'Navegación', parent: c.to })))
        }

        return { ...c, id: c.to, shortcut: [c.label.charAt(0)], section: 'Navegación', parent: null }
    })

    return arr.concat(newArr)
}
