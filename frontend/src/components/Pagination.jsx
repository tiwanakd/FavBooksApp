import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/pagination.css"

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                    <Link to="#" className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
                {pageNumbers.map(number => {
                    return (
                        <li key={number} className={currentPage === number ? "page-item active" : "page-item"}>
                            <Link to="#" className='page-link' onClick={() => paginate(number)}>
                                {number}
                            </Link>
                        </li>
                    );
                })}
                <li className={`page-item ${currentPage === pageNumbers.length && 'disabled'}`}>
                    <Link to="#" className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination