import React, { useCallback, useEffect, useState } from 'react';
import { bookSearch } from '.';
import AppStateContext from '../contexts/AppStateContext';

const AppStateProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');

    // 책 검색
    useEffect(() => {
        if (query.length > 0) {
            bookSearchHttpHandler(query, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
        }
    }, [query]);

    // book search 핸들러
    const bookSearchHttpHandler = async (query, reset) => {
        // paramter 설정
        const params = {
            query: query,
            sort: 'accuracy', // accuracy | recency 정확도 or 최신
            page: 1, // 페이지번호
            size: 10, // 한 페이지에 보여 질 문서의 개수
        };

        const { data } = await bookSearch(params); // api 호출
        if (reset) {
            setBooks(data.documents);
        } else {
            setBooks(books.concat(data.documents));
        }
    };

    const searchBook = (text) => {
        setQuery(text);
    };
    const [orders, setOrders] = useState([]);

    // 장바구니 추가
    // [{isbn, quantity : 1}]
    const addToOrder = useCallback((isbn) => {
        setOrders((orders) => {
            // 동일한 책을 추가할 땐 2권, 3권 으로 변경해주기 위해 동일한 isbn가 있는지 검사
            const finded = orders.find((order) => order.isbn === isbn);
            // 장바구니에 동일한 책이 없으면 quantity에 1을 넣어줌
            if (finded === undefined) {
                return [...orders, { isbn, quantity: 1 }];
            } // 동일한 책이 있으면
            else {
                return orders.map((order) => {
                    if (order.isbn === isbn) {
                        return {
                            isbn,
                            quantity: order.quantity + 1,
                        };
                    } else {
                        return order;
                    }
                });
            }
        });
    }, []);

    // 장바구니에서 책 삭제하기
    const remove = useCallback((isbn) => {
        setOrders((orders) => {
            return orders.filter((order) => order.isbn !== isbn);
        });
    }, []);

    // 장바구니에서 전체 책 삭제하기
    const removeAll = useCallback(() => {
        setOrders([]);
    }, []);

    return (
        <AppStateContext.Provider
            value={{
                books,
                searchBook,
                orders,
                addToOrder,
                remove,
                removeAll,
            }}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateProvider;