import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div style={{textAlign: 'center'}}>
        <h2 className="display-2" style={{ fontWeight: 'bold', color:'rgb(117, 243, 243)'}}>404 Not Found</h2>
        <h4 className="display-6" style={{color:'rgb(117, 243, 243)'}}>This page does not exist.</h4>
        <Link type="button" className="btn btn-outline-primary" style={{color: 'aqua', borderColor: 'aqua', marginTop: '15px'}} to="/">Go Home</Link>
    </div>
    
  )
}

export default NotFoundPage