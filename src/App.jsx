import React, { useState } from "react";
import axios from "axios";

function RhymeFinder() {
  const [word, setWord] = useState("");
  const [rhymingWords, setRhymingWords] = useState(null);

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://api.datamuse.com/words?rel_rhy=${word}`)
      .then((response) => {
        const words = response.data.map((result) => result.word);
        setRhymingWords(words.length ? words : []);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="main">
      <h2>Find Rhyming Words</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter a word to find rhymes:
          <input type="text" value={word} onChange={handleInputChange} />
        </label>
        <button type="submit">Find Rhymes</button>
      </form>
      {rhymingWords === null ? (
        ""
      ) : rhymingWords.length > 0 ? (
        <div>
          <h3>Words that rhyme with "{word}":</h3>
          <ul>
            {rhymingWords.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No rhyming words found for "{word}"</p>
      )}
    </div>
  );
}

export default RhymeFinder;
