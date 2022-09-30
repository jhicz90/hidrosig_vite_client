export const groupBy = (data = []) => data.reduce((newGroup, dataRow) => {
    const { group } = dataRow
    newGroup[group] = newGroup[group] ?? []
    newGroup[group].push(dataRow)
    return newGroup
}, {})