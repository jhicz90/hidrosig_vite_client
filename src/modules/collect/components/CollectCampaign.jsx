import { Card } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import validator from 'validator'
import { CollectManagePay, CropCampaignEdit } from '..'

export const CollectCampaign = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const valid = validator.isMongoId(cmp || '') && validator.isMongoId(irr || '')

    return (
        valid
        &&
        <Card style={{ overflow: 'hidden' }}>
            <div className='row'>
                <div className='col-12'>
                    <CropCampaignEdit campaignId={cmp} inputIrrig={irr} />
                </div>
            </div>
            <Card.Body>
                <CollectManagePay campaignId={cmp} inputIrrig={irr} />
            </Card.Body>
        </Card>
    )
}