import './MainPage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import LoadingModalWindow from '../../components/LoadingModalWindow/LoadingModalWindow';
import SearchSection from '../../components/SeacrchSectionForm/SeacrchSectionForm.js';
import BookResultGrid from '../../components/BookResultGrid/BookResultGrid.js';
import { setBook, removeBook } from '../../store/slices/bookSlice';

function MainPage() {
    const [bookName, setBookName] = useState("");
    const [bookSorting, setBookSort] = useState("relevance");
    const [bookKategory, setBookKategory] = useState("");
    const [startingPosition, setStartingPosition] = useState(0);// index for load more
    const [isLoading, setIsLoading] = useState(false);//for play animation during data getting
    const [isAllBooksLoaded, setIsAllBooksLoaded] = useState(true);// if we load all books hide the button
    const dispatch = useDispatch(); // for using storege

    useEffect(() => {
        if (startingPosition !== 0) {
            setStartingPosition(0);
            axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookName + "+subject:" + bookKategory + "&orderBy=" + bookSorting + "&key=" + process.env.REACT_APP_API_KEY + "&maxResults=30")
                .then(data => {
                    setBookArray(data.data.items, false);
                })
        }
    }, [bookSorting, bookKategory])
    function handleSubmit(event) {
        setIsLoading(true);
        event.preventDefault();
        setStartingPosition(0);
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookName + "+subject:" + bookKategory + "&orderBy=" + bookSorting + "&key=" + process.env.REACT_APP_API_KEY + "&maxResults=30")
            .then(data => {
                setIsLoading(false);
                setBookArray(data.data.items, false);
                setIsAllBooksLoaded(false);
            })
    }
    function loadMore(event) {
        setIsLoading(true);
        event.preventDefault();                                //+ "subject:"+ bookKategory (filter by category break all search)
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookName + "+subject:" + bookKategory + "&orderBy=" + bookSorting + "&key=" + process.env.REACT_APP_API_KEY + "&maxResults=30" + "&startIndex=" + startingPosition)
            .then(data => {
                setIsLoading(false);
                setBookArray(data.data.items, true);
            })
    }
    function setBookArray(data, isLoadMore) {
        setStartingPosition(startingPosition + data.length);
        if (!isLoadMore) {
            dispatch(removeBook());
        }
        data.map((newbook, index) => {
            dispatch(setBook({
                id: index + startingPosition,
                author: newbook.volumeInfo.authors,
                description: newbook.volumeInfo.description,
                name: newbook.volumeInfo.title,
                imageSrc: newbook.volumeInfo.imageLinks?.smallThumbnail || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hot-motor.ru%2Fdefa%2Fportativnye-zaryadki%3Fact%3Dreg&psig=AOvVaw0vehJ2iQ67FjxUWbp591k2&ust=1690323761001000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCLD11_CwqIADFQAAAAAdAAAAABAD',
                category: newbook.volumeInfo.categories,
            }));
        });
    }

    return (
        <div className="MainPage">
            <SearchSection handleSubmit={handleSubmit} setBookName={setBookName} setBookSort={setBookSort} setBookKategory={setBookKategory} />
            <BookResultGrid />
            {(isLoading) ? <LoadingModalWindow /> : null}
            {(!isAllBooksLoaded) ? <Button className='loadMore_button' variant="outlined" onClick={loadMore}>Load more </Button> : null}
        </div>

    );
}

export default MainPage;
