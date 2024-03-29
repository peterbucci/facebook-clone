import React, { useEffect, useRef } from 'react'
import './styles/photo.css'

import { actionTypes } from 'reducers/state_reducer'
import { useStateValue } from 'providers/StateProvider'

function Photo({
  imageList,
  imageDimensions,
  zoomedHeight,
  cropped,
}) {
  const { dispatch } = useStateValue()

  const imageRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imageThumbnailRef = useRef(null)
  const dragDropLayerRef = useRef(null)
  const dragDropTransparentContainerRef = useRef(null)
  const croppedImageRef = useRef(null)

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_UPLOAD_REFS,
      uploadRefs: {
        imageRef,
        imageContainerRef,
        imageThumbnailRef,
        dragDropLayerRef,
        dragDropTransparentContainerRef,
        croppedImageRef
      }
    })
  }, [dispatch])

  let offsetX, offsetY
  const move = e => {
    const imageTop = imageContainerRef.current.getBoundingClientRect().top - dragDropLayerRef.current.getBoundingClientRect().top
    const imageLeft = imageContainerRef.current.getBoundingClientRect().left - dragDropLayerRef.current.getBoundingClientRect().left
    const imageRight = dragDropLayerRef.current.getBoundingClientRect().right - imageContainerRef.current.getBoundingClientRect().right
    const imageBottom = dragDropLayerRef.current.getBoundingClientRect().bottom - imageContainerRef.current.getBoundingClientRect().bottom

    const thumbnailTop = imageThumbnailRef.current.getBoundingClientRect().top - dragDropLayerRef.current.getBoundingClientRect().top
    const thumbnailLeft = imageThumbnailRef.current.getBoundingClientRect().left - dragDropLayerRef.current.getBoundingClientRect().left
    const thumbnailRight = dragDropLayerRef.current.getBoundingClientRect().right - imageThumbnailRef.current.getBoundingClientRect().right
    const thumbnailBottom = dragDropLayerRef.current.getBoundingClientRect().bottom - imageThumbnailRef.current.getBoundingClientRect().bottom

    const styleTop = imageTop - (offsetY - e.offsetY)
    const styleLeft = imageLeft - (offsetX - e.offsetX)
    const styleRight = imageRight + (offsetX - e.offsetX)
    const styleBottom = imageBottom + (offsetY - e.offsetY)

    if (styleLeft < thumbnailLeft && styleRight < thumbnailRight) {
      dragDropTransparentContainerRef.current.style.left = styleLeft + 'px'
      imageContainerRef.current.style.left = styleLeft + 'px'
      dragDropTransparentContainerRef.current.style.right = null
      imageContainerRef.current.style.right = null
    }

    if (styleTop < thumbnailTop && styleBottom < thumbnailBottom) {
      dragDropTransparentContainerRef.current.style.top = styleTop + 'px'
      imageContainerRef.current.style.top = styleTop + 'px'
      dragDropTransparentContainerRef.current.style.bottom = null
      imageContainerRef.current.style.bottom = null
    }
  }

  const add = e => {
    offsetX = e.clientX - imageContainerRef.current.getBoundingClientRect().left
    offsetY = e.clientY - imageContainerRef.current.getBoundingClientRect().top
    imageContainerRef.current.onpointermove = move
    imageContainerRef.current.setPointerCapture(e.pointerId)
  }

  const remove = e => {
    imageContainerRef.current.onpointermove = null
    imageContainerRef.current.releasePointerCapture(e.pointerId)
  }

  if (dragDropTransparentContainerRef.current) { 
    dragDropTransparentContainerRef.current.onpointerdown = add 
    dragDropTransparentContainerRef.current.onpointerup = remove
  }

  return <>
    <div className='updatePhoto__image'>
      <div ref={dragDropLayerRef} className="image__dragDropContainer">
        <div ref={dragDropTransparentContainerRef} className={`dragDrop__object${cropped ? ' croppedObj' : ''}`} style={imageDimensions} >
      </div>
      </div>
      <div className="image__thumbnailOverlay">
        <div ref={imageThumbnailRef} className={`image__croppedOutline${cropped ? ' cropped' : ''}`}>
          <div className="image__thumbnailOutline"></div>
        </div>
      </div>
      <div ref={imageContainerRef} className="imageContainer">
        <img ref={imageRef} src={imageList[0]['data_url']} alt="" style={{height: `${zoomedHeight}px`}}/>
      </div>
    </div>
    <canvas ref={croppedImageRef} className="croppedCanvas" width="300px" height="300px" />
</>
}

export default Photo
