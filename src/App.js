import {
  Container,
  createTheme,
  Switch,
  ThemeProvider,
  withStyles
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import axios from './core/utils/axios';
import { useEffect, useState } from 'react';


import Header from './components/header/Header';
import Result from './components/result/Result';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [word, setWord] = useState('');
  const [selectedLanguage, setSelectedLanguge] = useState('en');
  const [lightMode, setLightMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const ThemeToggler = withStyles({
    switchBase: {
      color: grey[100],
      '&$checked': {
        color: grey[500]
      },
      '&$checked + $track': {
        backgroundColor: grey[500]
      }
    },
    checked: {},
    track: {}
  })(Switch);

  const theme = createTheme({
    palette: {
      primary: {
        main: lightMode ? 'rgb(2, 1, 1)' : '#fff'
      },
      type: lightMode ? 'light' : 'dark'
    }
  });

  async function fetchAPIResponse(wordToSearch) {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${selectedLanguage}/${wordToSearch}`
      );
      if (response.status === 200) {
        setSearchResults(response.data);
        setErrorMessage(undefined);
      } else {
        setSearchResults([]);
        setErrorMessage(undefined);
      }

    } catch (error) {
      if (error.status === 404) {
        setErrorMessage(error.data);
        setSearchResults([]);
      } else {
        setErrorMessage(undefined);
        setSearchResults([]);
      }
    }
  }

  useEffect(() => {
  }, [word, selectedLanguage]);

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        backgroundColor: lightMode ? 'rgb(233, 232, 232)' : 'rgb(2, 1, 1)',
        color: lightMode ? 'rgb(2, 1, 1)' : 'rgb(233, 232, 232)',
        transition: 'all 0.6s linear'
      }}
    >
      <ThemeProvider theme={theme}>
        <Container className="app-container" maxwidth="md">
          <div className="theme-toggler-container">
            <span>{!lightMode ? 'Light' : 'Dark'} Mode</span>
            <ThemeToggler
              checked={lightMode}
              onChange={() => setLightMode((prevState) => !prevState)}
            />
          </div>
          <Header
            selectedLanguage={selectedLanguage}
            setSelectedLanguge={setSelectedLanguge}
            word={word}
            setWord={setWord}
            lightMode={lightMode}
            fetchAPIResponse={fetchAPIResponse}
          />
          {/* {searchResults.length >= 1 && ( */}
          <Result
            word={word}
            selectedLanguage={selectedLanguage}
            searchResults={searchResults}
            lightMode={lightMode}
            errorMessage={errorMessage}
          />
          {/* )} */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
