import React from 'react'
import './Checkbox.scss'

function Checkbox(id:string) {
  return (

    <label htmlFor = {id} className = "label">
      <input type = "checkbox" className = "checkBox" id = {id} />
    </label>

  )
}

export default Checkbox
