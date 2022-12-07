import { useState } from 'react'
import { imageSysGet } from '../../../helpers'
import { useGetDocumentsQuery } from '../../../store/actions'

export const DocumentBrowser = () => {

    const { data: docs = [], isLoading } = useGetDocumentsQuery('')
    const [selectedDocs, setSelectedDocs] = useState([])

    return (
        <>
            {
                JSON.stringify(docs, null, 2)
                // docs.length === 0
                //     ?
                //     <p>No ahi documentos</p>
                //     :
                //     <div style={{
                //         display: 'flex',
                //         rowGap: '20px',
                //         columnGap: '20px',
                //         flexWrap: 'wrap'
                //     }}>
                //         {
                //             docs.map(d =>
                //                 <div
                //                     key={d._id}
                //                     className="file"
                //                     style={{
                //                         boxShadow: `0 0 0 0.25rem #e9ecef`,
                //                         borderRadius: '0.375rem',
                //                         display: 'flex',
                //                         flexDirection: 'column',
                //                         backgroundColor: '#f0f0f0ad',
                //                         overflow: 'hidden',
                //                         width: '230px',
                //                         height: '230px',
                //                     }}
                //                 >
                //                     <div style={{
                //                         flexGrow: 1,
                //                         display: 'flex',
                //                         background: backColor,
                //                         borderRadius: '0.375rem 0.375rem 0 0',
                //                     }} >
                //                         <div style={{
                //                             flexGrow: 1,
                //                             backgroundImage: `url("${imageSysGet(2008)}")`,
                //                             backgroundPosition: 'center',
                //                             backgroundRepeat: 'no-repeat',
                //                             backgroundSize: 'contain',
                //                         }} />
                //                     </div>
                //                     <div style={{
                //                         fontSize: '12px',
                //                         textAlign: 'center',
                //                         wordBreak: 'break-word',
                //                         padding: '0.5rem',
                //                         whiteSpace: 'nowrap',
                //                         overflow: 'hidden',
                //                         textOverflow: 'ellipsis',
                //                         maxHeight: '45px',
                //                         color: 'inherit'
                //                     }}>
                //                         <span
                //                             className='fw-semibold'
                //                             style={{
                //                                 backgroundColor: 'transparent',
                //                                 textDecoration: 'none',
                //                                 padding: '2px 4px',
                //                                 borderRadius: '3px'
                //                             }}>
                //                             {d.name}
                //                         </span>
                //                     </div>
                //                 </div>
                //             )
                //         }
                //     </div>
            }
        </>
    )
}
