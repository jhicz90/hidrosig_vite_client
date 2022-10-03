import { FaFaucet, FaTint, FaWater } from 'react-icons/fa'

export const treeNetIrrig = (data, check = false) => {
    // const hierachy = (items, parent = 0, link = 'parent') => items.filter(item => item[link] === parent).map(item => ({ ...item, icon: <span className={item.classIcon} />, children: hierachy(items, item.value) }))
    // const hierachy = (items) => items.map(item => ({ ...item, showCheckbox: item.showCheckbox === true ? check : false, icon: <span className={item.classIcon} />, children: hierachy(item.children) }))
    const hierachy = (items) => items.map(item => {
        if (item.hasOwnProperty('children')) {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                icon: <span className={item.classIcon} />,
                children: hierachy(item.children)
            }
        } else {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                icon: <span className={item.classIcon} />
            }
        }
    })
    return hierachy(data)
}

export const treeNetIrrigSiga = (data, check = false) => {
    // const hierachy = (items, parent = 0, link = 'parent') => items.filter(item => item[link] === parent).map(item => ({ ...item, icon: <span className={item.classIcon} />, children: hierachy(items, item.value) }))
    // const hierachy = (items) => items.map(item => ({ ...item, showCheckbox: item.showCheckbox === true ? check : false, icon: <span className={item.classIcon} />, children: hierachy(item.children) }))
    const hierachy = (items) => items.map(item => {
        if (item.hasOwnProperty('children')) {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                icon: {
                    0: <FaTint color='#0d6efd' />,
                    'CD': <FaWater color='#fd7e14' />,
                    'L01': <FaWater color='brown' />,
                    'L02': <FaWater color='blue' />,
                    'L03': <FaWater color='green' />,
                    'L04': <FaWater color='yellow' />,
                    'L05': <FaWater color='black' />,
                    'CP': <FaWater color='#6f42c1' />,
                    'D01': <FaFaucet color='#432874' />,
                }[item.lvl] || <FaQuestionCircle />,
                children: hierachy(item.children)
            }
        } else {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                icon: {
                    0: <FaTint color='#0d6efd' />,
                    'CD': <FaWater color='#fd7e14' />,
                    'L01': <FaWater color='brown' />,
                    'L02': <FaWater color='blue' />,
                    'L03': <FaWater color='green' />,
                    'L04': <FaWater color='yellow' />,
                    'L05': <FaWater color='black' />,
                    'CP': <FaWater color='#6f42c1' />,
                    'D01': <FaFaucet color='#432874' />,
                }[item.lvl] || <FaQuestionCircle />,
            }
        }
    })
    return hierachy(data)
}

export const childrenNode = (data) => {
    // const childrenArray = ({ children }) => children.map(c => c.value).concat(...children.map(c => childrenArray(c)))
    const childrenArray = (item) => {
        if (item.hasOwnProperty('children')) {
            if (item.children) {
                return item.children.map(c => c.value).concat(...item.children.map(c => childrenArray(c)))
            } else {
                return []
            }
        } else {
            return []
        }
    }

    return [data.value, ...childrenArray(data)]
}