import React, { useState } from 'react';

const InputCustom = (props) => {
const {handleInputChange,value, ...otherProps} = props;
  return (
          <input
          type="text"
          className={'p-2 border-gray-800 border-solid border-2 rounded-lg text-base flex w-full'}
          value={value}
          onChange={handleInputChange}
          placeholder="Enter your search query"
          {...otherProps}
        />
  );
};

export default InputCustom;