import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useLazyVerifySectionsByIdQuery } from '@/store/actions'

export const AddSectionInChannel = ({ channel }) => {

    const navigate = useNavigate()
    const [verifySections, { isLoading: isVerifyingSections }] = useLazyVerifySectionsByIdQuery()

    const handleAddSunatImage = async () => {
        await verifySections(channel)
            .unwrap()
            .then((resp) => {
                if (resp.ok) {
                    navigate({
                        pathname: `/app/schm/irrig/sct/create`,
                        search: `?chnid=${channel}`
                    })
                }
            })
    }

    return (
        <Button
            disabled={isVerifyingSections}
            onClick={handleAddSunatImage}
            variant='primary'
        >
            Agregar tramo
        </Button>
    )
}
