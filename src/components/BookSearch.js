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

    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedBooksComponents, setSelectedBooksComponents] = useState([]);

    const handleSelectedBooksChange = (books, bookComponent) => {
        setSelectedBooks(books);
        setSelectedBooksComponents((components) => [...components, bookComponent]);
    };

    const handleBookSelect = (book) => {


        // 현재 선택된 책 목록에 추가합니다.
        setSelectedBooks((selectedBooks) => [...selectedBooks, book]);

        // 선택된 책 목록을 DiaryEditor 컴포넌트로 전달합니다.
        props.onBookSelect(selectedBooks);

        // 선택된 책을 DiaryEditor에서 표시할 때 사용할 컴포넌트를 생성합니다.
        const bookComponent = (
            <div key={book.isbn}>
                <img src={book.thumbnail} alt={book.title} />
                <div>{book.title}</div>
                <div>{book.authors}</div>
                <div>{book.publisher}</div>
            </div>
        );

        // 선택된 책 목록과 새로운 책 추가 버튼을 DiaryEditor에 전달합니다.
        props.onSelectedBooksChange(selectedBooks, bookComponent);
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
            <div>
                {selectedBooksComponents}
            </div>
        </div>
    );
}

export default BookSearch;
