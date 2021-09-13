import { Serchbar } from './Searchbar.styled';

export const SearchBar = ({ onSearch }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.elements.imageName.value.trim().toLowerCase());
  };

  return (
    <Serchbar>
      <form onSubmit={handleSearch}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
        />
      </form>
    </Serchbar>
  );
};
