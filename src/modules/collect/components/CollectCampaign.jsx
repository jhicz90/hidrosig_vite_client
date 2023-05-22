import { useMemo } from 'react'
import { Button, Card } from 'react-bootstrap'
import validator from 'validator'
import { useCollectStore } from '../../../hooks'
import { CropCampaignEdit } from '..'

export const CollectCampaign = ({ tabId = '' }) => {

    const { listSearched } = useCollectStore()
    const cmpActive = useMemo(() => listSearched.find(ls => ls.id === tabId)?.campId || null, [listSearched])

    return (
        validator.isMongoId(String(cmpActive))
        &&
        <Card style={{ overflow: 'hidden' }}>
            <div className='d-flex p-3'>
                <Button>Hola</Button>
            </div>
            <CropCampaignEdit campaignId={cmpActive} />
            <Card.Body>
                Aqui iran las opciones de como pagar
            </Card.Body>
        </Card>
    )
}