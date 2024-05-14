import { Box, Heading, Input, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr, Td, Icon, HStack, Button, Stack, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { WiDaySunny  , WiLightning  } from "react-icons/wi";

const BookList = () => {
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('달고나 커피');

    // useRef 는 화면 랜더링에 반영되지 않는 참조값
    const pageCount = useRef(1);

    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('Purple 500', 'Purple 200');
    const buttonScheme = useColorModeValue('blackAlpha', 'whiteAlpha');


    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`,
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
    }, [page, search]);

    return (
        <>
            <Box>
                <Heading color={color}>
                    <Icon as={MdOutlineOndemandVideo} boxSize="1.5em" />동영상 검색 목록
                </Heading>

                {
                    colorMode === "light" ? 
                    <IconButton icon={<WiLightning />} onClick={toggleColorMode} size={"lg"}></IconButton> :
                    <IconButton icon={<WiDaySunny />} onClick={toggleColorMode} size={"lg"}></IconButton>
                }

                <Input type="text" placeholder='검색어 입력' onChange={changeSearch} size="lg" variant={"filled"} />
                <TableContainer>
                    <Table variant={"striped"} colorScheme="purple">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Title</Th>
                                <Th>Authoe</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookList.map((book, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td><a href={book.url}>{book.title}</a></Td>
                                        <Td>{book.author}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                        <Tfoot></Tfoot>
                    </Table>
                </TableContainer>
                <HStack>
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