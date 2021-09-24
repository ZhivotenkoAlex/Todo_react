import React from 'react'
import './Button.scss'

export default function Button({ value }: { value: string }) {
  return (
    <button className="button" type="submit">
      {value}
    </button>
  )
}
