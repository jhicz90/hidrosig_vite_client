export const getYearActive = (years = []) => {
    const findYear = years.find(year => year?.campaigns?.find(campaign => campaign.opened === true))

    return String(findYear?._id || new Date().getFullYear())
}