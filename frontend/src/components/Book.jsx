import React, { useState } from 'react'
import "../styles/book.css"
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants'
import Summary from './Summary'


const Book = ({ book, addFavBook, isHome, removeFromFav }) => {

  const token = localStorage.getItem(ACCESS_TOKEN);
  const [modalShow, setModalShow] = useState(false);

  const favRemoveBtn = isHome ? 
    <div className='btn-fav-div'><Link className='book-fav' onClick={() => {addFavBook(book.id)}}>Add to My Books</Link></div> :
    <div className='remove-fav-div'><Link className='remove-fav' onClick={() => {removeFromFav(book.id)}}>Remove</Link></div>

  return (
    <>
    <div className="card">
        <img src={book.coverURL} alt="Book Image" className='card-img-top'/>
        <div className='card-body'>
            <h4 className='card-title'>{book.title}</h4>
            <p className='book-info'>Author: {book.author}</p>
            <p className='book-info'>Genre: {book.genre}</p>
            <p className='book-info'>Publised Year: {book.publication_year}</p>
            <div className='card-btns'>
              <Link className="btn-summary" onClick={() => {setModalShow(true)}}>Summary</Link>
              {token && favRemoveBtn}
            </div>
        </div> 
    </div>
    <Summary 
            show={modalShow}
            onHide={() => setModalShow(false)}
            bookId={book.id}
          />
    </>
  )
}

export default Book