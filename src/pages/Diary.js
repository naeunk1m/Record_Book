import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import DiaryItem from "../components/DiaryItem";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import axios from "axios";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [selectedBook, setSelectedBook] = useState(null); // 선택한 책 정보를 저장하는 상태 추가
  const [diaries, setDiaries] = useState([]);

  // DiaryEditor.js에서 호출할 함수
  const handleSelectedBook = (book) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    document.title = `감정 일기장 - ${id}번 일기`;
    return () => {
      document.title = "감정 일기장";
    };
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/diaries");
      setDiaries(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  }

  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          <MyButton
            text={"수정하기"}
            onClick={() => navigate(`/edit/${data.id}`)}
          />
        }
      />
      <article>
        <section>
          <h4>선택도서</h4>
          {selectedBook && (
            <div className="selected-book">
              <div className="selected-book-cover">
                <img src={selectedBook.thumbnail} alt="selected book cover" />
              </div>
              <div className="selected-book-info">
                <p>{selectedBook.title}</p>
                <p>{selectedBook.author}</p>
              </div>
            </div>
          )}
          {!selectedBook && (
            <div className="selected-book">
              <div>선택한 책이 없습니다.</div>
            </div>
          )}
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Diary;