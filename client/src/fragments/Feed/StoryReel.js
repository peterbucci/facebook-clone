import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import './StoryReel.css'

import Story from './Story'

function StoryReel({
  stories
}) {
  const createReel = () => {
    return (
      <div className="storyReel">
        <Story 
          image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
          profileSrc="./avatar.png"
          title="Brotgils"
        />
        <Story 
          image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
          profileSrc="./avatar.png"
          title="Brotgils"
        />
        <Story 
          image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
          profileSrc="./avatar.png"
          title="Brotgils"
        />
        <Story 
          image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
          profileSrc="./avatar.png"
          title="Brotgils"
        />
        <Story 
          image="https://mk0laterblogouwugirk.kinstacdn.com/wp-content/uploads/2019/01/How-Often-to-Post-to-Facebook-Stories.png"
          profileSrc="./avatar.png"
          title="Brotgils"
        />
      </div>
    )
  }

  return stories
    ? createReel()
    : (
      <div className="addStory">
        <div className="addStory__container">
          <button>
            <AddIcon />
          </button>
          <div className="addStory__desc">
            <h3>Create Story</h3>
            <p>Share a photo or write something.</p>
          </div>
        </div>
      </div>
    )
}

export default StoryReel
