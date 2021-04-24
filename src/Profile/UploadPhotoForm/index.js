import React, { useState, useRef, useEffect } from 'react'
import ImageUploading from 'react-images-uploading';
import Slider from '@material-ui/core/Slider';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import CropIcon from '@material-ui/icons/Crop';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PublicIcon from '@material-ui/icons/Public';
import './index.css'

import Description from './Description'
import Photo from './Photo'

// const cropPhoto = (image) => {
//   console.log(imageRef.current)
//   const canvas = croppedImageRef.current
//   const ctx = canvas.getContext('2d')
//   const img = new Image

//   img.onload = () => { 
//     const destinationX = (imageWidth - 300) / 2
//     const destinationY = (zoomValue - 300) / 2
//     ctx.drawImage(img, 0, 0, img.width, img.height, -destinationX, -destinationY, imageWidth, zoomValue) 
//   };
//   img.src = image['data_url']
// }

function UploadPhotoForm({
  closeAllMenus
}) {
  const [images, setImages] = useState([]);
  const [cropped, setCropped] = useState(false)
  const [minZoom] = useState(300)
  const [maxZoom, setMaxZoom] = useState(600)
  const [zoomValue, setZoomValue] = useState(300)
  const [imageWidth, setImageWidth] = useState(null)

  const imageRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imageThumbnailRef = useRef(null)
  const dragDropLayerRef = useRef(null)
  const dragDropTransparentContainerRef = useRef(null)

  useEffect(() => {
    if (imageRef.current) {
      const ratio = (zoomValue - imageRef.current.height) / imageRef.current.height + 1

      setImageWidth(imageRef.current.width * ratio)
      imageRef.current.naturalHeight > 300 && setMaxZoom(imageRef.current.naturalHeight * 2)
    }

    if (images.length === 0) {
      setMaxZoom(600)
    } 
  }, [imageRef.current, images, zoomValue])

  const handleZoom = (e, val) => {
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

    setZoomValue(val)
  }

  return (
      <ImageUploading
        value={images}
        onChange={(imageList) => setImages(imageList)}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
        }) => (
          <div className="profilePhoto__modal__background">
            <div className="profilePhoto__modal__container">
              <div className="profilePhoto__modal__header">
                <h3>Update Profile Picture</h3>
                <button className="profilePhoto__modal__closeButton" onClick={() => closeAllMenus()}><CloseIcon /></button>
              </div>
              {images.length > 0 && <div className="updatePhoto__body">
                  <Description />
                  <Photo 
                    imageList={imageList} 
                    zoomValue={zoomValue}
                    imageWidth={imageWidth}
                    imageRef={imageRef}
                    imageContainerRef={imageContainerRef}
                    imageThumbnailRef={imageThumbnailRef}
                    cropped={cropped}
                    dragDropLayerRef={dragDropLayerRef}
                    dragDropTransparentContainerRef={dragDropTransparentContainerRef}
                  />
                  
                  <div class="updatePhoto__zoomSlider">
                    <RemoveIcon className={zoomValue === minZoom ? 'disabled' : 'enabled'} />
                    <Slider 
                      disableRipple={true}
                      value={zoomValue}
                      min={minZoom}
                      max={maxZoom}
                      onChange={handleZoom}
                    />
                    <AddIcon className={zoomValue === maxZoom ? 'disabled' : 'enabled'} />
                  </div>
                  <div className="updatePhoto__options">
                    <button className={cropped ? "optionSelected" : 'optionNotSelected'} onClick={() => setCropped(!cropped)}><CropIcon /> Crop Photo</button>
                    <button><WatchLaterIcon /> Make Temporary</button>
                  </div>
                  <div className="updatePhoto__visibility">
                    <PublicIcon /> Your profile picture is public.
                  </div>
              </div>}
              <div className={`updatePhoto__modal__footer ${images.length > 0 ? 'stepTwo' : 'stepOne'}`}>
                {images.length > 0
                  ? <>
                      <button onClick={() => onImageRemove(0)}>Cancel</button>
                      <button>Save</button>
                  </>
                  : <>
                      <button onClick={onImageUpload}><AddIcon /> Upload Photo</button>
                      <button><WallpaperIcon /> Add Frame</button>
                  </>}
              </div>
            </div>
          </div>
        )}
      </ImageUploading>
  )
}

export default UploadPhotoForm
