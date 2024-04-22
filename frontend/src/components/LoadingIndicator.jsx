import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className="spinner-border text-info" role="status" style={{alignItems: 'center'}}>
        <span className="sr-only"></span>
    </div>
  )
}

export default LoadingIndicator