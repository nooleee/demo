import { Box, Heading, Input, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr, Td, Icon, HStack, Button, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsBook  } from "react-icons/bs";
import BookSearch from './BookDetail';

const BookList = () => {
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('해리포터');

    // useRef 는 화면 랜더링에 반영되지 않는 참조값
    const pageCount = useRef(1);

    const color = useColorModeValue('Purple 500', 'Purple 200');
    const buttonScheme = useColorModeValue('blackAlpha', 'whiteAlpha');


    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
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
        if (e.target.value.length >= 2) {
            setSearch(e.target.value);
        }
    }


    useEffect(() => {
        fetchBooks();
        <BookSearch />
    }, [page, search]);

    return (
        <>
            <Box>
                <Heading color={color}>
                </Heading>

                <Input type="text" placeholder='검색어 입력' onChange={changeSearch} size="lg" variant={"filled"} width='240px' mb={5}/>
                <TableContainer>
                    <Table variant={"striped"} colorScheme="purple">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Title</Th>
                                <Th>Author</Th>
                                <Th>Publisher</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookList.map((book, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td><a href={"/demo/book/search/" + book.isbn}>{book.title}</a></Td>
                                        <Td>{book.authors}</Td>
                                        <Td>{book.publisher}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                        <Tfoot></Tfoot>
                    </Table>
                </TableContainer>
                <HStack justifyContent="center" mt={4}>
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <>
                            <Button colorScheme={
                                page === index + 1 ?
                                    "purple" : buttonScheme
                            }
                                onClick={(e) => { setPage(index + 1) }}>{index + 1}</Button>
                        </>
                    ))}
                </HStack>
            </Box>
        </>
    );
};

export default BookList;