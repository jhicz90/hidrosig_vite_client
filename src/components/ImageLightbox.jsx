import React from 'react'
import Lightbox from 'react-spring-lightbox'
import styled from 'styled-components'
import { IoIosClose } from 'react-icons/io'

export const ImageLightbox = ({ galleryTitle, images, currentImageIndex, setCurrentIndex, isOpen, onClose }) => {

    const gotoPrevious = () => {
        currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1)
    }

    const gotoNext = () => {
        currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1)
    }

    return (
        <StyledLightbox
            isOpen={isOpen}
            onPrev={gotoPrevious}
            onNext={gotoNext}
            onClose={onClose}
            images={images}
            currentIndex={currentImageIndex}
            singleClickToZoom
            renderHeader={() => (
                <TopHeaderBar>
                    <LeftSideDescriptionContainer>
                        <GalleryHeading>{galleryTitle}</GalleryHeading>
                        {/* <GallerySubheading>{images[currentIndex].alt}</GallerySubheading> */}
                    </LeftSideDescriptionContainer>

                    <RightSideContainer>
                        <PageIndicator>
                            {currentImageIndex + 1} / {images.length}
                        </PageIndicator>
                        <CloseButton onClick={onClose} type='button'>
                            <IoIosClose size={60} />
                        </CloseButton>
                    </RightSideContainer>
                </TopHeaderBar>
            )}
        /* Add your own UI */
        // renderHeader={() => (<CustomHeader />)}
        // renderFooter={() => (<CustomFooter />)}
        // renderPrevButton={() => (<CustomLeftArrowButton />)}
        // renderNextButton={() => (<CustomRightArrowButton />)}
        // renderImageOverlay={() => (<ImageOverlayComponent >)}

        /* Add styling */
        // className="cool-class"
        // style={{ background: "grey" }}

        /* Handle closing */
        // onClose={handleClose}

        /* Use single or double click to zoom */
        // singleClickToZoom

        /* react-spring config for open/close animation */
        pageTransitionConfig={{
          from: { transform: "scale(1)", opacity: 0 },
          // enter: { transform: "scale(1)", opacity: 1 },
          leave: { transform: "scale(1)", opacity: 0 },
          // config: { mass: 1, tension: 320, friction: 32 }
        }}
        />
    )
}

const StyledLightbox = styled(Lightbox)`
  /* background-color: rgba(0,0,0,0.5); */
  background-color: rgba(17, 24, 39,0.8);
`

const GalleryHeading = styled.h2`
  margin: 0;
  font-weight: normal;
`

// const GallerySubheading = styled.h4`
//   margin: 0;
//   font-weight: normal;
//   color: darkcyan;
// `

const PageIndicator = styled.span`
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
`

const RightSideContainer = styled.div`
  width: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseButton = styled.button`
  height: 100%;
  display: flex;
  border-left-style: solid;
  border-left-width: 3px;
  border-left-color: #e2e5ec;
  color: inherit;
  z-index: 10;
  background: none;
  border-style: none;
  font-size: 50px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: #e2e5ec;
  transition: color 0.2s linear;
  :hover {
    color: orangered;
  }
  :focus {
    outline: none;
    color: orangered;
  }
`

const LeftSideDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left-width: 3px;
  border-left-color: darkcyan;
  border-left-style: solid;
  padding-left: 6px;
`

const TopHeaderBar = styled.header`
  z-index: 10;
  height: 60px;
  cursor: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px 6px 12px;
  color: #e2e5ec;
  background-color: #101010;
  box-shadow: 0 0 #0000, 0 0 #0000,  0 10px 15px -3px hsla(0,0%,100%,.1),0 4px 6px -2px hsla(0,0%,100%,.05);;
`