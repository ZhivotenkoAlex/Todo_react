import React from 'react';
import s from './Checkbox.module.css';

function Checkbox(id) {
  return (

    <label htmlFor = {id} className = {s.label}>
      <input type = "checkbox" className = {s.checkBox} id = {id} />
    </label>

  );
}

export default Checkbox;
