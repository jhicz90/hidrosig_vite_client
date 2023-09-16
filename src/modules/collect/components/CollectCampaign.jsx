import { useSearchParams } from 'react-router-dom'
import validator from 'validator'
import { ManageCollectCampaign } from '..'

export const CollectCampaign = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const valid = validator.isMongoId(cmp || '') && validator.isMongoId(irr || '')

    return (
        valid
        &&
        <ManageCollectCampaign
            campaign={cmp}
            inputIrrigation={irr}
        />
    )
}