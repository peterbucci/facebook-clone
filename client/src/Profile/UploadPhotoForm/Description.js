import React, { useState } from 'react'
import './Description.css'

function Description() {
  const [description, setDescription] = useState('')
  const splitDesc =  description ? description.split('\n') : []
  const textArea = document.querySelector('textarea')
  const textRowCount = textArea ? textArea.value.split("\n").length : 0
  const rows = textRowCount === 1 ? 2 : textRowCount

  return (
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
  )
}

export default Description
