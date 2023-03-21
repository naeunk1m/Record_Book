import React from 'react';

function Book(props) {
    const handleAddBook = () => {
        props.onAddBook(props.book);
    };

    return (
        <div>
            <img src={props.book.thumbnail} alt={props.book.title} />
            <div>{props.book.title}</div>
            <div>{props.book.authors}</div>
            <div>{props.book.publisher}</div>
        </div>
    );
}

export default Book;
