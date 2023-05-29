import React from 'react'
import ContentLoader from 'react-content-loader'

export const CardLoader = props => {
    return (
        <ContentLoader
            width={500}
            height={200}
            viewBox='0 0 500 200'
            {...props}
        >
            <rect x='10' y='10' rx='3' ry='3' width='120' height='30' />
            <rect x='140' y='10' rx='3' ry='3' width='120' height='30' />
            <rect x='270' y='10' rx='3' ry='3' width='120' height='30' />

            <rect x='10' y='60' rx='3' ry='3' width='300' height='20' />
            <rect x='10' y='90' rx='3' ry='3' width='320' height='20' />
            <rect x='10' y='120' rx='3' ry='3' width='280' height='20' />
            <rect x='10' y='150' rx='3' ry='3' width='300' height='20' />
        </ContentLoader>
    )
}

export const FarmsLoader = props => {
    return (
        <ContentLoader
            width={350}
            height={140}
            viewBox='0 0 350 140'
            backgroundColor='#f5f5f5'
            foregroundColor='#dbdbdb'
            {...props}
        >
            <rect x='5' y='5' rx='3' ry='3' width='550' height='40' />

            <rect x='5' y='50' rx='3' ry='3' width='550' height='40' />

            <rect x='5' y='95' rx='10' ry='3' width='550' height='40' />
        </ContentLoader>
    )
}

export const CampaignsLoader = props => {
    return (
        <ContentLoader
            width={350}
            height={300}
            viewBox='0 0 350 300'
            backgroundColor='#f5f5f5'
            foregroundColor='#dbdbdb'
            {...props}
        >
            <rect x='5' y='5' rx='3' ry='3' width='500' height='40' />
            <rect x='20' y='50' rx='3' ry='3' width='500' height='10' />
            <rect x='20' y='70' rx='3' ry='3' width='500' height='10' />
            <rect x='20' y='90' rx='3' ry='3' width='500' height='10' />

            <rect x='5' y='105' rx='3' ry='3' width='500' height='40' />
            <rect x='20' y='150' rx='3' ry='3' width='500' height='10' />
            <rect x='20' y='170' rx='3' ry='3' width='500' height='10' />
            <rect x='20' y='190' rx='3' ry='3' width='500' height='10' />

            <rect x='5' y='205' rx='10' ry='3' width='500' height='40' />
            <rect x='20' y='250' rx='3' ry='3' width='500' height='10' />
            <rect x='20' y='270' rx='3' ry='3' width='500' height='10' />
        </ContentLoader>
    )
}
