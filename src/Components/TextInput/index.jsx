import React from 'react';
import s from './TextInput.module.css';

export default function TextInput({
  placeholder, value, onChange, type,
}) {
  const placeholderArray = placeholder.split('');
  placeholderArray[0] = placeholderArray[0].toUpperCase();
  const newPlaceholder = placeholderArray.join('');

  return (
    <input type = {type} className = {s.input} value = {value} placeholder = {`${newPlaceholder}...`} id = {placeholder} name = {placeholder} onChange = {onChange} />
  );
}
