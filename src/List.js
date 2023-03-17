import React, { useContext } from "react";
import { DiaryStateContext } from "./App";
import Item from "./Item";

const List = () => {
    const { data } = useContext(DiaryStateContext);

    return (
        <div className="List_container">
            <h2>일기 리스트</h2>
            <h4>{data.length}개의 일기가 있습니다.</h4>
            <div>
                {data.map((it, idx) => (
                    <Item key={`item_${it.id}`} {...it} />
                ))}
            </div>
        </div>
    );
};

export default List;