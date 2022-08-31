import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
// Firebase
import db from '../../firebase'

function NewAvatar({ pictureId, className }) {
  const [thumbnail, setThumbnail] = useState(null)

  useEffect(() => {
    db.collectionGroup('posts')
      .where('id', '==', pictureId)
      .get().then(res => {
        res.forEach(doc => setThumbnail(`http://localhost:3001/images/${doc.data().thumbnail}`))
      })
  }, [pictureId])

  return (
    <Avatar src={thumbnail} className={className} />
  )
}

export default NewAvatar
