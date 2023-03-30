import { FaFaucet, FaQuestionCircle, FaTint, FaWater } from 'react-icons/fa'
import { TypeWaterSource } from '../components'

export const treeNetIrrig = (data, check = false) => {
    // const hierachy = (items, parent = 0, link = 'parent') => items.filter(item => item[link] === parent).map(item => ({ ...item, icon: <span className={item.classIcon} />, children: hierachy(items, item.value) }))
    // const hierachy = (items) => items.map(item => ({ ...item, showCheckbox: item.showCheckbox === true ? check : false, icon: <span className={item.classIcon} />, children: hierachy(item.children) }))
    const hierachy = (items) => items.map(item => {
        if (item.hasOwnProperty('children')) {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                children: hierachy(item.children),
                icon: {
                    0: <TypeWaterSource type={item.type} size='1em' />,
                    'CD': <FaWater color='#fd7e14' />,
                    'L01': <FaWater color='brown' />,
                    'L02': <FaWater color='blue' />,
                    'L03': <FaWater color='green' />,
                    'L04': <FaWater color='yellow' />,
                    'L05': <FaWater color='black' />,
                    'L06': <FaWater color='purple' />,
                    'CP': <FaWater color='#6f42c1' />,
                    'DR': <FaFaucet color='#432874' />,
                }[item.order] || <FaQuestionCircle />
                // icon: {
                //     0: <FaTint color='#0d6efd' />,
                //     'CD': <FaWater color='#fd7e14' />,
                //     'L01': <FaWater color='brown' />,
                //     'L02': <FaWater color='blue' />,
                //     'L03': <FaWater color='green' />,
                //     'L04': <FaWater color='yellow' />,
                //     'L05': <FaWater color='black' />,
                //     'L06': <FaWater color='purple' />,
                //     'CP': <FaWater color='#6f42c1' />,
                //     'D01': <FaFaucet color='#432874' />,
                // }[item.order] || <FaQuestionCircle />
            }
        } else {
            return {
                ...item,
                showCheckbox: item.showCheckbox === true ? check : false,
                icon: {
                    0: <TypeWaterSource type={item.type} size='1em' />,
                    'CD': <FaWater color='#fd7e14' />,
                    'L01': <FaWater color='brown' />,
                    'L02': <FaWater color='blue' />,
                    'L03': <FaWater color='green' />,
                    'L04': <FaWater color='yellow' />,
                    'L05': <FaWater color='black' />,
                    'L06': <FaWater color='purple' />,
                    'CP': <FaWater color='#6f42c1' />,
                    'DR': <FaFaucet color='#432874' />,
                }[item.order] || <FaQuestionCircle />
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

export const formatLatLng = (latlng = []) => {
    if (Array.isArray(latlng)) {
        return latlng.map(ll => formatLatLng(ll))
    } else {
        const data = [latlng.lat, latlng.lng]
        return data
    }
}

export const typeGeoData = (type = '') => {
    const geoData = {
        'marker': 'Point',
        'circle': 'Point',
        'circlemarker': 'Point',
        'polyline': 'LineString',
        'polygon': 'Polygon',
        'rectangle': 'Polygon',
    }[type] || ''
    return geoData
}

export const scaleZoom = (area) => {
    if (area >= 24000000) {
        return 11
    } else if (area >= 12000000) {
        return 11.5
    } else if (area >= 6000000) {
        return 12
    } else if (area >= 3000000) {
        return 12.5
    } else if (area >= 1500000) {
        return 13
    } else if (area >= 750000) {
        return 13.5
    } else if (area >= 375000) {
        return 14
    } else if (area >= 188000) {
        return 14.5
    } else if (area >= 94000) {
        return 15
    } else if (area >= 47000) {
        return 15.5
    } else if (area >= 23500) {
        return 16
    } else if (area >= 11750) {
        return 16.5
    } else if (area >= 5900) {
        return 17
    } else if (area >= 3000) {
        return 17.5
    } else {
        return 18
    }
}