import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const RecordEditor = () => {
    const { onCreate } = useContext(DiaryDispatchContext);
    useEffect(() => {
        console.log("RecordEditor 렌더");
    });

    const [diary, setDiary] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    const handleChangeDiary = (e) => {
        setDiary({
            ...diary,
            [e.target.name]: e.target.value
        });
    };

    const handleAddButtonClick = () => {
        alert("일기가 추가되었어요!");
        return;
        console.log("추가될 일기 : ", diary);

        if (diary.author.length < 1) {
            authorRef.current.focus();
            return;
        }

        if (diary.content.length < 1) {
            contentRef.current.focus();
            return;
        }

        onCreate(diary.author, diary.content, diary.emotion);
        alert("일기가 성공적으로 추가되었습니다");

        setDiary({
            author: "",
            content: "",
            emotion: 1
        });
    };

    const authorRef = useRef(null);
    const contentRef = useRef(null);

    return (
        <div className="RecordEditor_container">
            <h2>독서기록</h2>
            <div>
                <input
                    ref={authorRef}
                    name="author"
                    placeholder="작성자"
                    type="text"
                    value={diary.author}
                    onChange={handleChangeDiary}
                />
            </div>
            <div>
                <textarea
                    ref={contentRef}
                    name="content"
                    placeholder="서평을 남겨주세요."
                    type="text"
                    value={diary.content}
                    onChange={handleChangeDiary}
                />
            </div>
            <div>
                <span>독서감상평 : </span>
                <select
                    name="emotion"
                    value={diary.emotion}
                    onChange={handleChangeDiary}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleAddButtonClick}>저장하기</button>
            </div>
        </div>
    );
};

export default memo(RecordEditor);
