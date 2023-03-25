import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

function BookSearch(props) {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const debouncedQuery = useDebounce(query, 500);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchBooks();
    };

    const handleBookSelect = (book) => {
        props.onBookSelect(book);
        
    };

    const fetchBooks = () => {
        axios
            .get(`https://dapi.kakao.com/v3/search/book?query=${debouncedQuery}`, {
                headers: {
                    Authorization: 'KakaoAK 487511c7467690d9e70b6d6b301f54c1',
                },
            })
            .then((response) => {
                setBooks(response.data.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (debouncedQuery) {
            fetchBooks();
        }
    }, [debouncedQuery]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    책 검색:
                    <input type="text" value={query} onChange={handleChange} />
                </label>
                <button type="submit">검색</button>
            </form>
            {books.length === 0 && <p>검색 결과가 없습니다.</p>}
            {books.length > 0 && (
                <ul>
                    {books.map((book) => (
                        <li key={book.isbn} onClick={() => handleBookSelect(book)}>
                            {book.thumbnail && (
                                <img src={book.thumbnail} alt={book.title} />
                            )}
                            {book.title && <div>{book.title}</div>}
                            {book.authors && <div>{book.authors}</div>}
                            {book.publisher && <div>{book.publisher}</div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookSearch;
