import React, { useContext } from 'react'
import { ManageCollectCampaignContext } from '../context'
import { Button } from 'react-bootstrap'
import { FaLeaf } from 'react-icons/fa'
import { FarmCropCreate, TableFarmCropCollect, FarmCropEdit } from '.'
import { CardHeaderStyled } from '../../../../../style'

export const ManageCollectContent = () => {

    const [context, setContext] = useContext(ManageCollectCampaignContext)

    return (
        <React.Fragment>
            <FarmCropCreate />
            <FarmCropEdit />
            <CardHeaderStyled>
                <div className='card-header-wrapper'>
                    <div className='card-header-tittle'>
                        <h3>Cultivos asignados</h3>
                    </div>
                    <div className='card-header-actions'>
                        <Button
                            onClick={() => setContext(v => ({ ...v, farmCropNew: true }))}
                            variant='neutral'
                            size='sm'
                            className='d-flex align-items-center gap-2'
                        >
                            <FaLeaf />
                            Agregar cultivo
                        </Button>
                    </div>
                </div>
            </CardHeaderStyled>
            <div className='row'>
                <div className='col-12'>
                    <TableFarmCropCollect />
                </div>
            </div>
            {/* AQUI IRA EL COMPONENTE QUE PERMITIRA PAGAR */}
        </React.Fragment>
    )
}
