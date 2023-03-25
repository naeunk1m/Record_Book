import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, date, title, content, book }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate('/edit/' + id);
  };

  return (
    <div className="DiaryItem">
      <div className="book_info">
        {book && book.thumbnail && (
          <img src={book.thumbnail} alt={book.title} />
        )}
        <div className="info">
          {book && book.title && (
            <div className="book">책 제목: {book.title}</div>
          )}
        </div>
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);