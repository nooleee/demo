import { Box, Heading, Input, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr, Td, Icon, HStack, Button, Stack, IconButton, useColorMode, useColorModeValue, Text, SimpleGrid, Flex, Center } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineOndemandVideo } from "react-icons/md";
import { Image } from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';

const VideoList = () => {
    // useState는 화면 랜더링에 반영됨
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('달고나 커피');

    // useRef 는 화면 랜더링에 반영되지 않는 참조값
    const pageCount = useRef(1);

    const color = useColorModeValue('Purple 500', 'Purple 200');
    const buttonScheme = useColorModeValue('blackAlpha', 'whiteAlpha');


    const fetchVideos = async () => {
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

        setVideoList(data.documents);
    };


    const changeSearch = e => {
        // 내용 작성
        if (e.target.value.length >= 2) {
            setSearch(e.target.value);
        }
    }


    useEffect(() => {
        fetchVideos();
    }, [page, search]);

    return (
        <>
            <Box>
                <Heading color={color}>
                </Heading>
                <Input type="text" placeholder='검색어 입력' onChange={changeSearch} size="lg" variant={"filled"} width='240px' mb={4}/>
                <SimpleGrid spacing="20px" columns={[1, null, 5]} gap={6}>
                        {videoList.map((video, index) => (
                    <Card maxH={'350px'}>
                            <CardBody>
                            <Flex direction="column" alignItems="center">
                                <a href={video.url}><Image src={video.thumbnail} borderRadius='lg'  height='150px' width='300px' /></a>
                                <Stack mt='6' spacing='3'>
                                    <Text color='grey.600' fontSize='md' noOfLines={2} maxW="1000%">
                                        <a href={video.url}>{video.title}</a>
                                    </Text>
                                </Stack>
                                </Flex>
                            </CardBody> 
                            <CardFooter>/
                            <Text color='grey.600' fontSize='1xl'>
                                        {video.author}
                                    </Text>
                            </CardFooter>
                    </Card>
                        ))}
                </SimpleGrid>
                {/* <TableContainer>
                    <Table variant={"striped"} colorScheme="purple">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Title</Th>
                                <Th>PreView</Th>
                                <Th>Authoe</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {videoList.map((video, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td><a href={video.url}>{video.title}</a></Td>
                                        <Td><Box boxSize='150px'>
                                            <Image src={video.thumbnail} />
                                        </Box></Td>
                                        <Td>{video.author}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                        <Tfoot></Tfoot>
                    </Table>
                </TableContainer> */}
                <HStack mt={4} justifyContent="center">
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

export default VideoList;