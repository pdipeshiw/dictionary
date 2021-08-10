import React from 'react';

import './Result.css';

export default function Result({
  word,
  selectedLanguage,
  searchResults,
  lightMode,
  errorMessage
}) {
  const titleStyle = {
    color: lightMode ? '#fff' : 'rgb(37, 37, 37)',
    fontWeight: 'bold'
  };

  return (
    <div className="word-result">
      {word.length === 0 ? (
        <span className="initial-sub-title">
          Nothing to search, Please start by typing in the Search ...
        </span>
      ) : (
        <>
          {searchResults.length >= 1 &&
            searchResults[0] &&
            searchResults[0].phonetics[0] &&
            word &&
            selectedLanguage === 'en' && (
              <audio
                src={searchResults[0].phonetics[0].audio}
                style={{
                  backgroundColor: lightMode ? '#fff' : 'rgb(37, 37, 37)',
                  borderRadius: '10px',
                  height: '30px',
                  width: '100%'
                }}
                controls
              >
                Your browser doesn't support audio
              </audio>
            )}

          {searchResults.length === 0 &&
            errorMessage &&
            errorMessage.message === undefined && (
              <div>
                Sorry, something went wrong. Could not send your request to the
                server.
              </div>
            )}

          {searchResults.length === 0 && errorMessage && errorMessage.message && (
            <div className="error-container">
              {errorMessage.title && (
                <div className="error-title">{errorMessage.title}</div>
              )}
              {errorMessage.message && (
                <div className="error-message">{errorMessage.message}</div>
              )}
              {errorMessage.resolution && (
                <div className="error-resolution">
                  {errorMessage.resolution}
                </div>
              )}
            </div>
          )}

          {searchResults.length >= 1 &&
            searchResults.map((result) =>
              result.meanings.map((meaning) =>
                meaning.definitions.map((definition, index) => (
                  <div
                    className="single-meaning"
                    key={index}
                    style={{
                      backgroundColor: lightMode
                        ? 'rgb(53, 52, 52)'
                        : 'rgb(233, 232, 232)',
                      color: lightMode ? 'rgb(245, 228, 228)' : 'rgb(2, 1, 1)'
                    }}
                  >
                    <span className="definition" style={titleStyle}>
                      {definition.definition}
                    </span>
                    <hr className="definition-hr" />
                    {definition.example && (
                      <span>
                        <span className="example-title" style={titleStyle}>
                          Example:{' '}
                        </span>
                        {definition.example}
                      </span>
                    )}
                    {definition.synonyms && definition.synonyms.length >= 1 && (
                      <span>
                        <span className="synonym-title" style={titleStyle}>
                          {' '}
                          Synonyms:{' '}
                        </span>
                        {definition.synonyms.map((synonym) => `${synonym}, `)}
                      </span>
                    )}
                    {definition.antonyms && definition.antonyms.length >= 1 && (
                      <span>
                        <span className="antonym-title"> Antonyms: </span>
                        {definition.antonyms.map((antonym) => `${antonym}, `)}
                      </span>
                    )}
                  </div>
                ))
              )
            )}
        </>
      )}
    </div>
  );
}
