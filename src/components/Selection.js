import React from 'react'
import Dropdown from './dropdown/Dropdown'

function Selection({imageUploaded, imagebase}) {
    function display(){
        console.log("synth_image_b64: ", imagebase)
      }
  return (
    <div>
        <Dropdown />
        <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={imageUploaded}
        />
      </div>
    </div>
  )
}

export default Selection