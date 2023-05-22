export const getYearActive = (years = []) => {
    const findYear = years.find(year => year?.campaigns?.find(campaign => campaign.opened === true))

    return String(findYear?._id || new Date().getFullYear())
}

export const getCampaignActive = (year = '', listYears = []) => {

    const yearActive = listYears.find(y => String(y._id) === String(year))

    const findCampaign = yearActive?.campaigns?.find(camp => camp.opened === true)

    return String(`${findCampaign?._id}-${findCampaign?.inputIrrigId}` || null)
}

export const getCollectActive = (year = '', listYears = []) => {

    const yearActive = listYears.find(y => String(y._id) === String(year))

    const findCampaign = yearActive?.campaigns?.find(camp => camp.opened === true)

    return String(findCampaign?.collectId || null)
}