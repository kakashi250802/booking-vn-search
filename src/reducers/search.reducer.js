import { createSlice } from "@reduxjs/toolkit";
import { SearchActions } from "../actions";
import { isEmpty } from "lodash";

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    listData: [],
    isSuccess: false,
    isLoadMore: false,
    totalCount: 0,
    message: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SearchActions.GetList.pending, (state, action) => {
      state.message = '';
      state.isSuccess = false;
      state.totalCount = 0;
    });
    builder.addCase(SearchActions.LoadMore.pending, (state, action) => {
      state.isLoadMore = false;
    });
    builder.addCase(SearchActions.GetList.fulfilled, (state, action) => {
      const { data, isSuccess } = action.payload;
      const {items: listData} = data;
      const totalCount = data?.queries?.request[0]?.totalResults;
      state.listData = listData;
      state.totalCount = totalCount;
      state.isSuccess = isSuccess;
    });
    builder.addCase(SearchActions.LoadMore.fulfilled, (state, action) => {
      const { data, isSuccess } = action.payload;
      const {items: listData} = data;
      if(!isEmpty(listData)){
        state.listData = state.listData.concat(listData);
      }
      state.isLoadMore = isSuccess;
    });
  }
});

export default searchSlice.reducer;
