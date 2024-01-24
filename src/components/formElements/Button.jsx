import React from 'react'

export default function Button({type,label,...rest}) {
  return (
    <button type={type} {...rest}>
        {label}
    </button>
  )
}
