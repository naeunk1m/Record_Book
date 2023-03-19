import axios from 'axios';

export const Kakao = axios.create({
    baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
    headers: {
        Authorization: `KakaoAK f0d22bcbb7a1a47d37c96d64ea718d6f`,
    },
});

// search book api
export const bookSearch = (params) => {
    return Kakao.get('/v3/search/book?target=title', { params });
};

// book api
export const book = () => {
    return Kakao.get('/v3/search/book?target=title');
};