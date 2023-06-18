import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchConstants } from "../constants";
import { SearchServices } from "../services";

export const GetList = createAsyncThunk(SearchConstants.GetList, async (query) => {
  let result = {};
  await SearchServices.GetList(query).then((res) => {
    const { status } = res;
    const data = res;
    const isSuccess = status === 200;
    if (isSuccess) {
      result = { data, isSuccess };
    }
  });
  return result;
});