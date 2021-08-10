import { TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import debounce from 'lodash/debounce';

import availableLanguages from '../../data/language';
import './Header.css';

export default function Header({
  selectedLanguage,
  setSelectedLanguge,
  word,
  setWord,
  fetchAPIResponse
}) {
  const debouncedSave = useRef(
    debounce((nextValue) => fetchAPIResponse(nextValue), 1000)
  ).current;

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setWord(nextValue);
    debouncedSave(nextValue);
  };
  return (
    <div className="header">
      <span className="title">{word ? word : 'Dictionary'}</span>
      <div className="inputs">
        <TextField
          id="standard-basic"
          label="Search a word"
          value={word}
          onChange={handleChange}
          className="word-search"
          autoComplete="off"
        />

        <FormControl className="language-select">
          <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedLanguage}
            onChange={(event) => setSelectedLanguge(event.target.value)}
          >
            {availableLanguages.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
