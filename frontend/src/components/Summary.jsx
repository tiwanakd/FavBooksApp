import React, { useState, useEffect } from 'react'
import api from '../api';
import Modal from 'react-bootstrap/Modal';
import LoadingIndicator from './LoadingIndicator';
import "../styles/summary.css"

const Summary = ({ show, onHide, bookId }) => {

  const [bookSummary, setBookSummary] = useState("");

  useEffect(() => {
    if (show) {
      getSummary(bookId);
    }
  }, [show, bookId]);

  const getSummary = (bookId) => {
    api
      .get(`api/books/summary/${bookId}`)
      .then(res => res.data)
      .then(data => {setBookSummary(data)})
      .catch(err => console.error(err));
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book Summary <span id='title-span'>(Generated by AI)</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookSummary ? (
          <>
            <h4 className='book-title'>{bookSummary.title}</h4>
            <p className='summary-content'>{bookSummary.summary}</p>
          </>
        ) : (
          <div style={{textAlign: 'center', color: 'aqua'}}>
            <LoadingIndicator />
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
} 

export default Summary