import React from 'react'

const Notification = ({ type, message }) => {
  const messageClass = type === 'error' ? 'notification notification--error' : 'notification'
  if (!message) {
    return null
  }
  return <div className={messageClass}>{message}</div>
}

export default Notification
