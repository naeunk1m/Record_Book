import React from 'react';
import Modal from 'react-modal';
import BookSearch from './BookSearch';

Modal.setAppElement('#root');

function BookSearchModal(props) {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
            <BookSearch onBookSelect={props.onBookSelect} />
        </Modal>
    );
}

export default BookSearchModal;
