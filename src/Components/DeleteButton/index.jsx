import React, { useCallback } from 'react';
import s from './DeleteButton.module.css';

export default function DeleteButton(props) {
  const {
    onDelete: onDeleteProps,
    id,
  } = props;

  const onDelete = useCallback(() => {
    onDeleteProps(id);
  }, [onDeleteProps, id]);

  return (
    <button className = {s.deleteButton} type = "button" onClick = {onDelete}> X </button>
  );
}
