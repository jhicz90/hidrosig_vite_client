import React, { useContext } from 'react'
import Select from 'react-select'
import { CalendarContext } from '../context'
import { useGetListCropByCampaignAndInputIrrigQuery } from '../../../../../store/actions'

export const CropSelector = () => {

    const [{ farmCrop, campaignId, inputIrrigId }, setContext] = useContext(CalendarContext)

    const { data: listFarmCrops = [], isFetching: isFetchingCrops } = useGetListCropByCampaignAndInputIrrigQuery({
        campaign: campaignId,
        inputIrrig: inputIrrigId
    })

    return (
        <div className='row'>
            <div className='col-12'>
                <Select
                    inputId='farmCropsInFarm'
                    classNamePrefix='rc-select'
                    hideSelectedOptions
                    isClearable
                    isSearchable={false}
                    options={listFarmCrops}
                    isLoading={isFetchingCrops}
                    value={farmCrop}
                    onChange={(e) => {
                        setContext(v => ({ ...v, farmCrop: e }))
                    }}
                    menuPlacement={'auto'}
                    placeholder={`Seleccione un cultivo...`}
                    noOptionsMessage={() => `Sin cultivos`}
                    getOptionValue={e => e._id}
                    getOptionLabel={e =>
                        <div className='d-flex flex-column'>
                            <div>
                                {`${e?.cropVariety.crop.name} - ${e?.cropVariety.name}`}
                            </div>
                            <div>
                                {e?.areaPlanted?.toFixed(5)} hás
                            </div>
                            <div>
                                {e?.irrigSystem?.name}
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    )
}
