import { useEffect, useMemo, useState } from "react";
import querystring from 'query-string';
import { omitNull } from "common/shares";

const useFilters = (props) => {
  const {
    initial = {},
  } = props;
  const currentParams = querystring.parse(window.location.search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'bracket'
  });

  const [filters, setFilters] = useState({
    ...initial,
    ...currentParams,
  });

  const paramsURL = useMemo(() => {
    const currentFilters = {...filters};
    const currentPathName = window.location.pathname;
    return {currentFilters, currentPathName};
  }, [window.location, filters]);

  const {currentFilters, currentPathName} = paramsURL;

  const handlePushState = (newObjParams) => {
    const newStrParams = '?' + querystring.stringify(omitNull(newObjParams), {
      arrayFormat: 'bracket',
    });
    window.history.pushState(currentPathName, '', newStrParams);
  }

  useEffect(() => {
    const newObjParams = {...currentFilters};
    handlePushState(newObjParams);
  }, [filters]);

  return [filters, setFilters];
};

export default useFilters;