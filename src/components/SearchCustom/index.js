import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../../actions';
import { isEmpty } from 'lodash';
import InputCustom from '../InputCustom';
import CardCustom from '../CardCustom';
import { IconLogo, IconSearch } from '../../assets/icons';
import SkeletonCustom from '../SkeletonCustom';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchBookingCare = (props) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const apiKey = process.env.REACT_APP_API_KEY;
  const cxId = process.env.REACT_APP_CX_ID;

  const { listData, isLoadMore, isSuccess, totalCount } = useSelector((state) => state.search);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);

  useEffect(() => {
    if ( isSuccess || isLoadMore) {
      setLoading(false);
      setLoadMore(false);
    }

  }, [isSuccess, isLoadMore, listData]);

  const search = async () => {
    const newQuery = {
      key: apiKey,
      cx: cxId,
      q: query,
      num_results: 20,
    };
    await dispatch(SearchActions.GetList(newQuery));
    await handleLoadMore(10);
    setLoading(true);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!isEmpty(query.trim())) {
      search();
      setShowEndMessage(true)
    }
  };

  const handleLoadMore = (numberStart) => {
    const startAt = listData?.length || numberStart;
    const newQuery = {
      key: apiKey,
      cx: cxId,
      q: query,
      start_at: startAt,
    };
    dispatch(SearchActions.LoadMore(newQuery));
    setLoadMore(true);
  };

  return (
    <div className='w-full flex flex-col justify-center'>

      <form onSubmit={handleFormSubmit} className='flex justify-center items-center mb-3 fixed top-0 left-0 right-0 w-screen py-3 bg-white'>
        <div className='w-[170px]'>
          <IconLogo />
        </div>
        <div className='w-[500px] ml-3'>
          <InputCustom value={query} handleInputChange={handleInputChange} />
        </div>
        <button type='submit' className='bg-cyan-400 py-2 px-4 rounded-xl ml-2'>
          <div className='flex items-center font-semibold text-lg'>
            Search
            <IconSearch className='text-zinc-950 ml-1' />
          </div>
        </button>
      </form>

      <div className='flex justify-center pb-8 mt-24'>
        <div className='px-[120px]' id='list'>
          <InfiniteScroll
            dataLength={listData?.length || 0}
            next={handleLoadMore}
            hasMore={listData?.length || 0 < totalCount}
            loader={<SkeletonCustom />}
            endMessage={showEndMessage && (<div className='mt-28 text-base font-medium'>Không có kết quả nào!</div>)}
          >
            {!isEmpty(listData) && (
              listData.map((item) => <CardCustom key={item.id} item={item} />)
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default SearchBookingCare;
