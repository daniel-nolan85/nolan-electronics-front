import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <SearchOutlined
        onClick={handleSubmit}
        style={{ cursor: 'pointer' }}
        className='ml-3'
      />
      <input
        onChange={handleChange}
        type='search'
        value={text}
        className='form-control mx-2'
        placeholder='Search'
      />
    </form>
  );
};

export default Search;
