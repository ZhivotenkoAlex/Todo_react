import React from 'react';
import s from './Button.module.css';

export default function Button({ value }) {
  return (
    <button className = {s.button} type = "submit">{value}</button>
  );
}
