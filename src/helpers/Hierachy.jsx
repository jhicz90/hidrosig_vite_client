export const hierachy = (items, higher = null, link = 'higher') => items.filter(item => item[link] === higher).map(item => ({ ...item, key: item._id, children: hierachy(items, item._id) }))
