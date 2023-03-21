import React, { useState } from 'react';
import axios from 'axios';

function BookSearch(props) {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(`https://dapi.kakao.com/v3/search/book?query=${query}`, {
                headers: {
                    Authorization: 'KakaoAK 487511c7467690d9e70b6d6b301f54c1',
                },
            })
            .then((response) => {
                console.log(response.data.documents);
                setBooks(response.data.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleBookSelect = (book) => {
        props.onBookSelect(book);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    책 검색:
                    <input type="text" value={query} onChange={handleChange} />
                </label>
                <button type="submit">검색</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book.isbn} onClick={() => handleBookSelect(book)}>
                        <img src={book.thumbnail} alt={book.title} />
                        <div>{book.title}</div>
                        <div>{book.authors}</div>
                        <div>{book.publisher}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookSearch;
