import BookGridPreview from '../BookGridPreview/BookGridPreview';
import './BookResultGrid.scss';
import { store } from '../../store/index.js';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

function BookResultGrid() {
  const [books, setBooks] = useState([]);
  const [isData, setData] = useState(false);

  store.subscribe(() => {
    setBooks(store.getState().book.books);
    if (books !== undefined) {
      setData(true);
    }
  })

  return (
    <div className="BookResultGrid">
      {(isData) ? <h3 className='BookResultGrid_label'>Found {books.length} books</h3> :
        <h3 className='BookResultGrid_label'>There is nothing found</h3>}
      <div className='BookResultGrid_container'>
        {(isData) && books.map(book => <BookGridPreview key={book.id} book={book} />)}
      </div>
    </div>
  );
}


export default withErrorBoundary(BookResultGrid,{
  Fallback:<div>Something went wrong loading books from server</div>
});;

