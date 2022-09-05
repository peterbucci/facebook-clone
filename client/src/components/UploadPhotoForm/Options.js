import React, { useState } from 'react'
import Select from '@material-ui/core/Select'
import CropIcon from '@material-ui/icons/Crop'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import './styles/options.css'

function Options({
  cropped,
  setCropped,
}) {
  const [toggleTemporary, setToggleTemporary] = useState(false)
  const [temporaryDuration, setTemporaryDuration] = useState('oneHour')

  return <>
    <div className="updatePhoto__options">
      <button className={cropped ? "optionSelected" : 'optionNotSelected'} onClick={() => setCropped(!cropped)}><CropIcon /> Crop Photo</button>
      <button className={toggleTemporary ? "optionSelected" : 'optionNotSelected'} onClick={() => setToggleTemporary(!toggleTemporary)}><WatchLaterIcon /> Make Temporary</button>
    </div>
    {toggleTemporary && <div className="updatePhoto__temporarySelector">
      <label>Switch back to previous profile picture in</label>
      <Select 
        native
        value={temporaryDuration}
        onChange={(e) => setTemporaryDuration(e.target.value)}
      >
        <option value="oneHour">1 Hour</option>
        <option value="oneDay">1 Day</option>
        <option value="oneWeek">1 Week</option>
        <option value="oneMonth">1 Month</option>
        <option value="never">Never</option>
        <option value="custom">Custom</option>
      </Select>
    </div>}
  </>
  
}

export default Options
