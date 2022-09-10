import React from 'react'

export const EditorImage = ({ name = `ImagenEditada${new Date().getTime()}`, path = '' }) => {
    return (
        <>PROXIMAMENTE</>
        // <ImageEditor
        //     includeUI={{
        //         loadImage: {
        //             path,
        //             name,
        //         },
        //         menu: ['shape', 'filter','mask'],
        //         initMenu: 'filter',
        //         uiSize: {
        //             width: '1000px',
        //             height: '700px',
        //         },
        //         menuBarPosition: 'bottom',
        //     }}
        //     cssMaxHeight={500}
        //     cssMaxWidth={700}
        //     selectionStyle={{
        //         cornerSize: 20,
        //         rotatingPointOffset: 70,
        //     }}
        //     usageStatistics={true}
        // />
    )
}
