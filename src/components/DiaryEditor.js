import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import BookSearchModal from './BookSearchModal';
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

import { getStringDate } from "../util/date.js";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  const [book, setBook] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  function handleBookChange(event) {
    setBook(event.target.value);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    console.log(selectedBook);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content);
      } else {
        onEdit(originData.id, date, content);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setSelectedBook({
        isbn: originData.bookId,
        title: originData.bookTitle,
        thumbnail: originData.bookThumbnail,
      });
    }
  }, [isEdit, originData]);


  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>날짜를 등록해주세요.</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>책정보</h4>
          <div>
            <button onClick={openModal}>책 검색</button>
            <BookSearchModal isOpen={modalOpen} onRequestClose={closeModal} onBookSelect={handleBookSelect} />
            {selectedBook ? (
              <div>
                <img src={selectedBook.thumbnail} alt={selectedBook.title} />
                <div>{selectedBook.title}</div>
                <div>{selectedBook.authors}</div>
                <div>{selectedBook.publisher}</div>
              </div>
            ) : (
              <div>선택된 책이 없습니다.</div>
            )}
          </div>
        </section>

        <section>
          <h4>서평을 작성해주세요. </h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="서평을 작성해주세요."
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;