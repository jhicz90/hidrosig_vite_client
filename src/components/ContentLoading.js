import React from 'react'
import ContentLoader from 'react-content-loader'

export const ContentLoading = ({type = 0}) => {
    return (
        <ContentLoader title="Cargando..." style={{ width: '100%' }}>
            {
                type === 0 &&
                <>
                    <rect x="110" y="21" rx="4" ry="4" width="254" height="6" />
                    <rect x="111" y="41" rx="3" ry="3" width="185" height="7" />
                    <rect x="304" y="-46" rx="3" ry="3" width="350" height="6" />
                    <rect x="371" y="-45" rx="3" ry="3" width="380" height="6" />
                    <rect x="484" y="-45" rx="3" ry="3" width="201" height="6" />
                    <circle cx="48" cy="48" r="48" />
                    <rect x="0" y="160" rx="3" ry="3" width="410" height="6" />
                    <rect x="0" y="130" rx="3" ry="3" width="380" height="6" />
                    <rect x="0" y="110" rx="3" ry="3" width="178" height="6" />
                </>
            }
            {
                type === 1 &&
                <>
                    <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
                    <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
                    <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
                    <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
                    <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
                    <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
                    <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
                    <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
                </>
            }
        </ContentLoader>
    )
}
