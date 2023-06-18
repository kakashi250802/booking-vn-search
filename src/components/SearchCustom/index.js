import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../../actions';
import { isEmpty } from 'lodash';
import InputCustom from '../InputCustom';
import CardCustom from '../CardCustom';
import { IconSearch } from '../../assets/icons';
import SkeletonCustom from '../SkeletonCustom';

const SearchBookingCare = (props) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const apiKey = process.env.REACT_APP_API_KEY;
  const cxId = process.env.REACT_APP_CX_ID;

  const { listData, isLoadMore, isSuccess, totalCount } = useSelector((state) => state.search);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (isSuccess || isLoadMore) {
      setLoading(false);
      setLoadMore(false);
    }
  }, [isSuccess, isLoadMore]);

  const search = async () => {
    const newQuery = {
      key: apiKey,
      cx: cxId,
      q: query,
      num_results: 20,
    };
    dispatch(SearchActions.GetList(newQuery));
    setLoading(true);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && listData.length < totalCount) {
      const newQuery = {
        key: apiKey,
        cx: cxId,
        q: query,
        num_results: 20,
        start: listData.length
      };
      dispatch(SearchActions.LoadMore(newQuery));
      setLoading(true);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='w-full flex flex-col justify-center'>
      <h1 className='text-center w-full'>Search BookingCare.vn</h1>

      <form onSubmit={handleFormSubmit} className='flex justify-center items-center mb-3'>
        <div className='w-[500px]'>
          <InputCustom value={query} handleInputChange={handleInputChange} />
        </div>
        <button type='submit' className='bg-cyan-400 py-2 px-4 rounded-xl ml-2'>
          <div className='flex items-center font-semibold text-lg'>
            Search
            <IconSearch className='text-zinc-950 ml-1' />
          </div>
        </button>
      </form>

      <div className='flex justify-center pb-8'>
        <div className='px-[120px]'  id='list'>
          {!isEmpty(listData) ? (
            listData.map((item) => <CardCustom key={item.id} item={item} />)
          ) : !loading ? (
            <div className='mt-28 text-base font-medium'>Không có kết quả nào!</div>
          ) : (
            <SkeletonCustom />
          )}
          { !loading && loadMore && <SkeletonCustom />}
        </div>
      </div>
    </div>
  );
};

export default SearchBookingCare;
