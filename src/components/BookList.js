import React, { useEffect, useRef, useState } from 'react';

const BookList = () => {
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('달고나 커피');

    // useRef 는 화면 랜더링에 반영되지 않는 참조값
    const pageCount = useRef(1);

    const fetchBooks = async() => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`, 
            {   
                method : "GET",
                headers : {
                    Authorization: "KakaoAK ce92da4c80559fa5590cccefcce8599e",
                },
            }
        );
        const data = await response.json();
        // console.log(data);

        pageCount.current = 
        data.meta.pageable_count % 10 > 0 
            ? data.meta.pageable_count / 10 + 1 
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
        console.log(pageCount.current);

        setBookList(data.documents);
    };


    const changeSearch = e => {
        // 내용 작성
        if(e.target.value.length >=2) {
            setSearch(e.target.value);
        }
    }


    useEffect(() => {
        fetchBooks();
    }, [page, search]);

    return (
        <>
            <h1>동영상 검색 목록</h1>
            <input type="text" placeholder='검색어 입력' onChange={changeSearch} />
            <div>
                {bookList.map((book) => (
                    <>
                        <p>{book.title}</p>
                    </>
                ))}
            </div>
            <ul>
                {Array.from({length: pageCount.current}, (_, index) => (
                    <>
                        <li onClick={e => {setPage(index + 1)} }>{index + 1}</li>
                    </>
                ))}
            </ul>
        </>
    );
};

export default BookList;