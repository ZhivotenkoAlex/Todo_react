import React from 'react'
import { ITextInputProps } from '../../types/componentsTypes'
import './TextInput.scss'

export default function TextInput({ placeholder, value, onChange, type }: ITextInputProps) {
  const placeholderArray = placeholder.split('')
  placeholderArray[0] = placeholderArray[0].toUpperCase()
  const newPlaceholder = placeholderArray.join('')

  return (
    <input
      type={type}
      className="textInput__input"
      value={value}
      placeholder={`${newPlaceholder}...`}
      id={placeholder}
      name={placeholder}
      onChange={onChange}
    />
  )
}
