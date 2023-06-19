import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../../actions';
import { isEmpty } from 'lodash';
import InputCustom from '../InputCustom';
import CardCustom from '../CardCustom';
import { IconSearch } from '../../assets/icons';
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
  const [totalResut, setTotalResut] = useState(0);

  useEffect(() => {
    if (isSuccess || isLoadMore) {
      setLoading(false);
      setLoadMore(false);
      listData?.length && setTotalResut(listData?.length)
      if(totalResut<20){
        handleLoadMore()
      }
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
    if (!isEmpty(query.trim())) {
      search();
    }
  };

  const handleLoadMore = () => {
    const newQuery = {
      key: apiKey,
      cx: cxId,
      q: query,
      start_at: totalResut,
    };
    dispatch(SearchActions.LoadMore(newQuery));
    setLoadMore(true);
  };

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
        <div className='px-[120px]' id='list'>
          <InfiniteScroll
            dataLength={totalResut}
            next={handleLoadMore}
            hasMore={totalResut < totalCount}
            loader={<SkeletonCustom />}
            endMessage={<div className='mt-28 text-base font-medium'>Không có kết quả nào!</div>}
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
