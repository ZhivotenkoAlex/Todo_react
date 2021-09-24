import React, { useCallback } from 'react'
import { IDeleteButtonProps } from '../../types/componentsTypes'
import './DeleteButton.scss'

export default function DeleteButton(props:IDeleteButtonProps) {
  const {
    onDelete: onDeleteProps,
    id,
  } = props

  const onDelete = useCallback(() => {
    onDeleteProps(id)
  }, [onDeleteProps, id])

  return (
    <button className = "deleteButton" type = "button" onClick = {onDelete}> X </button>
  )
}
