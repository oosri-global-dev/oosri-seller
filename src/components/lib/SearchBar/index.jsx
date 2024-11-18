import React, { useState } from 'react'
import { SearchBarWrapper, SearchItemWrapper } from './index.styles'
import Input from 'antd/es/input/Input'
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

export const CustomSearchBar = ({placeholder}) => {
  const [searchValue, setSearchValue] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  const SearchItem=()=>{
    return(
        <SearchItemWrapper flexWrap="noWrap" gap="6px" padding="4px 6px">
           <img src="https://placehold.co/400" alt="" />
           <p>Iphone</p>
           <IoMdClose onClick={()=>{console.log("afjks")}} />
        </SearchItemWrapper>
    )
  }
  // Check if the 'Enter' key was pressed and the input is focused
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isFocused) {
      console.log('Enter key pressed while input is focused');
    }
  };
  return (
    <SearchBarWrapper>
        {/* <Input addonBefore={<FiSearch/>} placeholder={placeholder} /> */}
        <Input addonBefore={<SearchItem />} 
          placeholder={placeholder} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
    </SearchBarWrapper>
  )
}
