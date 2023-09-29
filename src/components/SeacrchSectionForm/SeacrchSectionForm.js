import './SeacrchSectionForm.scss';
import SeacrhComboBox from '../../parts/SearchComboBox/SeacrchComboBox.js';
import CustomSelect from '../../parts/CustomSelect/CustomSelect.js';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function SearchSection({ handleSubmit, setBookName, setBookSort, setBookKategory }) {

  function handleChange(event) {
    setBookName(event.target.value);
  }

  return (
    <div className="SearchSection">
      <h2 className='SearchSection_label'>Search for books</h2>
      <div className='SearchSection_container'>
        <form onSubmit={handleSubmit}>
          <TextField className='container_input---search' label="Book name" variant="outlined" onChange={handleChange} required />
          <button className='container_button---submit' type="submit"><SearchIcon /></button>
          <div className='container_select'>
            <SeacrhComboBox setKategory={setBookKategory} />
            <CustomSelect setSorting={setBookSort} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchSection;

