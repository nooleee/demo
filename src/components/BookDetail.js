import { Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const BookDetail = () => {
    const [book, setBook] = useState([]);
    const [params] = useSearchParams();
    console.log("book : " + book)


    const { isbn } = useParams();
    const ISBN = isbn.substring(0, 11);

    console.log("isbn : " + ISBN)

    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${ISBN}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);

        setBook(data.documents);
    };

    useEffect(() => {
        fetchBooks();
    });
    // fetchBooks();

    return (
        <>
            {book.map((bookDetail) => (
                <Card maxW='lg' alignItems="center">
                    <Text fontSize='1.5xl'>도서 상세 페이지</Text>
                    <CardBody>
                        <Flex direction="column" alignItems="center">
                            <a href={bookDetail.url}><Image src={bookDetail.thumbnail} borderRadius='lg' height='300px' width='300px' /></a>
                        </Flex>
                            <Stack mt='6' spacing='3'>
                            <Flex direction="column" alignItems="center">
                                <Heading><a href={bookDetail.url}>{bookDetail.title}</a></Heading>
                                <Text color='grey.600' fontSize='2xl' >
                                    {bookDetail.authors} / {bookDetail.publisher}
                                </Text>
                                </Flex>
                            </Stack>
                    </CardBody>
                    <CardFooter>/
                        <Text color='grey.600' fontSize='md' maxW="1000%">
                            {bookDetail.contents}
                        </Text>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};

export default BookDetail;