import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import './ZoomSlider.css'

import { useStateValue } from '../../../providers/StateProvider'

function ZoomSlider({
  image,
  zoomedHeight,
  setZoomedHeight
}) {
  const { 
    state: { uploadPhotoForm: { imageRef, imageContainerRef, imageThumbnailRef, dragDropLayerRef, dragDropTransparentContainerRef } }
  } = useStateValue()
  const [minZoom] = useState(300)
  const [maxZoom, setMaxZoom] = useState(600)

  useEffect(() => {
    imageRef && imageRef.current && imageRef.current.naturalHeight > 300 && setMaxZoom(imageRef.current.naturalHeight * 2)
    image.length === 0 && setMaxZoom(600)
  }, [image, imageRef])

  const createBoundary = () => {
    if (imageContainerRef.current.getBoundingClientRect().right < imageThumbnailRef.current.getBoundingClientRect().right) {
      const styleRight = dragDropLayerRef.current.getBoundingClientRect().right - imageThumbnailRef.current.getBoundingClientRect().right + "px"
      imageContainerRef.current.style.left = null
      dragDropTransparentContainerRef.current.style.left = null
      imageContainerRef.current.style.right = styleRight
      dragDropTransparentContainerRef.current.style.right = styleRight
    }
    
    if (imageContainerRef.current.getBoundingClientRect().bottom < imageThumbnailRef.current.getBoundingClientRect().bottom) {
      const styleBottom = dragDropLayerRef.current.getBoundingClientRect().bottom - imageThumbnailRef.current.getBoundingClientRect().bottom + "px"
      imageContainerRef.current.style.top = null
      dragDropTransparentContainerRef.current.style.top = null
      imageContainerRef.current.style.bottom = styleBottom
      dragDropTransparentContainerRef.current.style.bottom = styleBottom
    }
  }

  const handleZoom = (e, val) => {
    createBoundary()
    setZoomedHeight(val)
  }

  return (
    <div class="updatePhoto__zoomSlider">
      <RemoveIcon className={zoomedHeight === minZoom ? 'disabled' : 'enabled'} />
      <Slider 
        disableRipple={true}
        value={zoomedHeight}
        min={minZoom}
        max={maxZoom}
        onChange={handleZoom}
      />
      <AddIcon className={zoomedHeight === maxZoom ? 'disabled' : 'enabled'} />
    </div>
  )
}

export default ZoomSlider
