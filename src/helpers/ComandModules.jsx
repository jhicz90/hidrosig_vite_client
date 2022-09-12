export const comandModules = (comands) => {
    const newArr = []
    const arr = [...comands].map(c => {
        if (c.children) {
            newArr.push(...c.children.map(ch => ({ ...ch, id: `${c.to}.${ch.to}`, to: `${c.to}/${ch.to}`, section: c.label, parent: c.to })))
        }

        return { ...c, id: c.to, shortcut: [c.label.charAt(0)], section: 'Páginas', parent: null }
    })

    return arr.concat(newArr)
}
