import { useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { CampaignsLoader, ScrollbarsShadow } from '../../../components'
import { useGetListYearDebtByFarmQuery } from '../../../store/actions'
import { getYearActive } from '../../../helpers'
import { GenerateFeeAccount } from './GenerateFeeAccount'

export const AreaFarmListCampaign = () => {

    const { prpid } = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const { data: listDebts = [], isFetching } = useGetListYearDebtByFarmQuery(prpid, { skip: !prpid })
    const yearActive = useMemo(() => getYearActive(listDebts), [listDebts])

    return (
        !!prpid
        &&
        <Card style={{ overflow: 'hidden' }}>
            {
                isFetching
                    ?
                    <CampaignsLoader />
                    :
                    <>
                        {
                            listDebts.length > 0
                                ?
                                <Accordion flush style={{ borderRadius: '9px' }} defaultActiveKey={getYearActive(listDebts) || ''}>
                                    <Accordion.Item eventKey='convenios'>
                                        <Accordion.Header>
                                            CONVENIOS
                                        </Accordion.Header>
                                        <Accordion.Body className='p-0'>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item variant='success' action>CONVENIO #2023A2RU - CANCELADO</ListGroup.Item>
                                                <ListGroup.Item variant='danger' action>CONVENIO #2021P123 - PENDIENTE</ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {
                                        listDebts.filter(d => String(d._id) === yearActive).map(debt =>
                                            <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                <Accordion.Header>
                                                    {`${yearActive === String(debt._id) ? `ACTUAL - ${debt._id}` : debt._id}`}
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush'>
                                                        {
                                                            debt.campaigns.map(c =>
                                                                <ListGroupCampaign
                                                                    key={`campaign_${c._id}_${c.inputIrrigation._id}`}
                                                                    onClick={() => navigate(`?cmp=${c._id}&irr=${c.inputIrrigation._id}`)}
                                                                    action
                                                                    selected={(cmp === c._id && irr === c.inputIrrigation._id) ? true : false}
                                                                >
                                                                    Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                    <div className='text-muted' style={{ fontSize: '0.75rem' }}>TOMA #{c.inputIrrigation.code.slice(-5)}</div>
                                                                </ListGroupCampaign>
                                                            )
                                                        }
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }
                                    <ScrollbarsShadow autoHide autoHeight autoHeightMin={200} autoHeightMax={200}>
                                        {
                                            listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                                <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                    <Accordion.Header>
                                                        {debt._id}
                                                    </Accordion.Header>
                                                    <Accordion.Body className='p-0'>
                                                        <ListGroup variant='flush'>
                                                            {
                                                                debt.campaigns.map(c =>
                                                                    <ListGroupCampaign
                                                                        key={`campaign_${c._id}_${c.inputIrrigation._id}`}
                                                                        onClick={() => navigate(`?cmp=${c._id}&irr=${c.inputIrrigation._id}`)}
                                                                        action
                                                                        selected={(cmp === c._id && irr === c.inputIrrigation._id) ? true : false}
                                                                    >
                                                                        Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                        <div className='text-muted' style={{ fontSize: '0.75rem' }}>#{c.inputIrrigation.code}</div>
                                                                    </ListGroupCampaign>
                                                                )
                                                            }
                                                        </ListGroup>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        }
                                    </ScrollbarsShadow>
                                </Accordion>
                                :
                                <div className='d-flex flex-column gap-2 p-4 justify-content-center'>
                                    EL PREDIO NO TIENE NINGUNA DECLARACION O CAMPAÑA
                                    <GenerateFeeAccount prpId={prpid} />
                                </div>
                        }
                    </>
            }
        </Card>
    )
}

const ListGroupCampaign = styled(ListGroup.Item)`
    & {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    &::before {
        content: '';
        display: ${props => props.selected ? 'block' : 'none'};
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 8px 0 8px 13.9px;
        border-color: transparent transparent transparent #0d6efd;
        transform: rotate(0deg);
        position: absolute;
        left: 0;
        top: 40%;
    }
`