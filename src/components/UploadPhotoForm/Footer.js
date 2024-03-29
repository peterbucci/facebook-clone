import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import './styles/footer.css'

function Footer({
  image,
  onImageRemove,
  onSave,
  onImageUpload
}) {
  return (
    <div className={`updatePhoto__modal__footer ${image.length > 0 ? 'stepTwo' : 'stepOne'}`}>
      {image.length > 0
        ? <>
            <button onClick={() => onImageRemove(0)}>Cancel</button>
            <button onClick={(e) => onSave(e, image[0])}>Save</button>
        </>
        : <>
            <button onClick={onImageUpload}><AddIcon /> Upload Photo</button>
            <button><WallpaperIcon /> Add Frame</button>
        </>}
    </div>
  )
}

export default Footer
