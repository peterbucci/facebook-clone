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
import './UploadPhoto.css'

function UploadPhoto({
  closeAllMenus
}) {
  const [images, setImages] = useState([]);
  const [cropped, setCropped] = useState(false)
  const croppedImageRef = useRef(null)

  const [description, setDescription] = useState('')
  const splitDesc =  description ? description.split('\n') : []
  const textArea = document.querySelector('textarea')
  const textRowCount = textArea ? textArea.value.split("\n").length : 0
  const rows = textRowCount === 1 ? 2 : textRowCount

  const [minZoom] = useState(300)
  const [maxZoom, setMaxZoom] = useState(600)
  const [zoomValue, setZoomValue] = useState(300)
  const [imageWidth, setImageWidth] = useState(null)

  const imageRef = useRef(null)

  const imageDimensions = {
    height: `${cropped ? '300' : zoomValue}px`,
    width: `${cropped ? '300' : imageWidth}px`
  }

  useEffect(() => {
    if (imageRef.current) {
      const ratio = (zoomValue - imageRef.current.height) / imageRef.current.height + 1
      setImageWidth(imageRef.current.width * ratio)
      imageRef.current.naturalHeight > 300 && setMaxZoom(imageRef.current.naturalHeight * 2)
    }

    if (images.length === 0) {
      setMaxZoom(600)
    } 

    // if (cropped) {
    //   cropPhoto(images[0])
    // }
  }, [imageRef.current, images, cropped, zoomValue])
 
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  }

  const cropPhoto = (image) => {
    console.log(imageRef.current)
    const canvas = croppedImageRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image

    img.onload = () => { 
      const destinationX = (imageWidth - 300) / 2
      const destinationY = (zoomValue - 300) / 2
      ctx.drawImage(img, 0, 0, img.width, img.height, -destinationX, -destinationY, imageWidth, zoomValue) 
    };
    img.src = image['data_url']
  }
  
  let offsetX,offsetY
  const move = e => {
    const el = e.target

    el.style.left = `${e.pageX - offsetX}px`
    el.style.top = `${e.pageY - offsetY}px`
    
    imageRef.current.style.left = `${e.pageX - offsetX}px`
    imageRef.current.style.top = `${e.pageY - offsetY}px`
  }
  const add = e => {
    console.log('down')
    
    const el = e.target
    offsetX = e.clientX - el.getBoundingClientRect().left
    offsetY = e.clientY - el.getBoundingClientRect().top
    console.log(e)
    el.addEventListener('mousemove', move)
  }
  const remove = e => {
    console.log('up')
    const el = e.target
    el.removeEventListener('mousemove', move)
  }

  return (
      <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
        }) => (
          // write your building UI
          <div className="profilePhoto__modal__background">
            <div className="profilePhoto__modal__container">
              <div className="profilePhoto__modal__header">
                <h3>Update Profile Picture</h3>
                <button className="profilePhoto__modal__closeButton" onClick={() => closeAllMenus()}><CloseIcon /></button>
              </div>
              {images.length > 0 && <div className="updatePhoto__modal__body">
                  <form className="updatePhoto__description">
                    <label className={description ? 'containsText' : 'noText'}>Description</label>
                    <div class="growWrap">
                        <div className="growWrap__container">
                            {splitDesc.map((line, key) => line === '' ? <br/> : <p key={key}>{line}</p>)}
                            {(splitDesc.length === 1 || splitDesc.length === 0) && <br />}
                            {(splitDesc.length === 1 && description === ' ' || splitDesc.length === 0) && <br />}
                        </div>
                        <textarea 
                          name="text" 
                          id="text" 
                          value={description}
                          rows={rows}
                          onChange={(e) => setDescription(e.target.value)}></textarea>
                      </div>
                  </form> 
                  <div className='updatePhoto__image'>
                    <div className="image__dragDropContainer" onMouseDown={add} onMouseUp={remove} onMouseLeave={remove}>
                      <div className="dragDrop__object" style={imageDimensions} >
                      </div>
                    </div>
                    <div className="image__thumbnailOverlay">
                      <div className="image__thumbnailOutline"></div>
                    </div>
                    <div className={`imageContainer${cropped ? ' imageCropped' : ''}`}>
                      <img ref={imageRef} src={imageList[0]['data_url']} alt="" style={{height: `${zoomValue}px`}}/>
                    </div>
                  </div>
                  
                  <div class="updatePhoto__zoomSlider">
                    <RemoveIcon className={zoomValue === minZoom ? 'disabled' : 'enabled'} />
                    <Slider 
                      disableRipple={true}
                      value={zoomValue}
                      min={minZoom}
                      max={maxZoom}
                      onChange={(e, val) => setZoomValue(val)}
                    />
                    <AddIcon className={zoomValue === maxZoom ? 'disabled' : 'enabled'} />
                  </div>
                  <div className="updatePhoto__options">
                    <button onClick={() => setCropped(!cropped)}><CropIcon /> Crop Photo</button>
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

export default UploadPhoto
