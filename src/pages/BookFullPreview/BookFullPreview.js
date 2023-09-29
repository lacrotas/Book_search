import './BookFullPreview.scss';
import { useParams } from 'react-router';
import { store } from '../../store/index.js';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link, useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import {ROUTES} from "../../constants/Routes"

function BookFullPreview(props) {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const book = getBookInformation();

  function getBookInformation() {
    if (bookId < store.getState().book.books.length) {
      return store.getState().book.books[bookId];
    } else {
      navigate(ROUTES.HOME_PAGE);
      return false;
    }
  }

  return (
    <div className='BookPreview'>
      <Link className='link' to={ROUTES.HOME_PAGE}>
        <Button className='BookFullPreview_button' variant="outlined" startIcon={<ReplyIcon />}>
          Back
        </Button>
      </Link>
      {(book)?<div className="BookFullPreview">
        <div className='BookFullPreview_container--image'>
          <img className="container_image" src={book.imageSrc} alt={'No book image'} />
        </div>
        <div className='BookFullPreview_information'>
          <div className='information_container'>
            <p className='container_paragraph--label'>Kategory: </p>
            <p className='container_paragraph'>{book.category}</p>
          </div>
          <div className='information_container'>
            <h3 className='container_paragraph--label'>Book name: </h3>
            <h3 className='container_paragraph'>{book.name}</h3>
          </div>
          <div className='information_container'>
            <p className='container_paragraph--label'>Author: </p>
            <p className='container_paragraph'>{book.author}</p>
          </div>
          <div className='information_container'>
            <p className='container_paragraph--label'>Description: </p>
            <p className='container_paragraph--description'>{book.description || "None"}</p>
          </div>
        </div>
      </div>:<p className='errorMessage'>Cant load book information<br/> press <strong>back</strong> to return to main page</p>}
    </div>
  );
}

export default withErrorBoundary(BookFullPreview,{
  Fallback:<div>Something went wrong with loading full book information</div>
});

