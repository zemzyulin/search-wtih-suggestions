import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Mark from "mark.js";
import './App.css';

function App() {  
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchOutput, setSearchOutput] = useState([]);
  const [openOutput, setOpenOutput] = useState(false);
  const [searchType, setSearchType] = useState('fulltext');
  
  // setup debounce
  const debounceFn = useCallback(debounce(fetchSuggestions, 300), []);
  const debounceFnFullText = useCallback(debounce(fetchSuggestionsFullText, 300), []);
  const debounceFnFuzzy = useCallback(debounce(fetchSuggestionsFuzzyText, 300), []);

  // handle input change
  async function onChange(e) {
    setInput(e.target.value);
    setOpen(true);
    if (searchType === 'fulltext') {
      debounceFnFullText(e.target.value);
    } else if (searchType === 'fuzzy') {
      debounceFnFuzzy(e.target.value);
    } else {
      debounceFn(e.target.value);
    }
  }

  // call to api to get suggestions (SIMPLE SEARCH)
  function fetchSuggestions(input) {
    fetch(`/api/search/suggestions?search=${input}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setData([]);
          if (Object.keys(res).length !== 0) {
            res.forEach(el => {
              setData((prev) => [...prev, el])
            })
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // call to api to get suggestions (FULL TEXT SEARCH)
  function fetchSuggestionsFullText(input) {
    fetch(`/api/search/fulltext/suggestions?search=${input}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setData([]);
          if (Object.keys(res).length !== 0) {
            res.forEach(el => {
              setData((prev) => [...prev, el])
            })
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // call to api to get suggestions (FUZZY SEARCH)
  function fetchSuggestionsFuzzyText(input) {
    fetch(`/api/search/fuzzy/suggestions?search=${input}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setData([]);
          if (Object.keys(res).length !== 0) {
            res.forEach(el => {
              setData((prev) => [...prev, el])
            })
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // handle option choosing
  function chooseOption(option) {
    setInput(option);
    setOpen(false);
  }

  // handle Enter pressed on input
  function handleEnter(e) {
    if (e.key === 'Enter') {
      if (searchType === 'fulltext') {
        handleSearchFullText(input);
      } else if (searchType === 'fuzzy') {
        handleSearchFuzzy(input);
      } else {
        handleSearchSimple(input);
      }
    }
  }

  // handle Search button pressed
  function handleSearchButton(e) {
    if (searchType === 'fulltext') {
      handleSearchFullText(input);
    } else if (searchType === 'fuzzy') {
      handleSearchFuzzy(input);
    } else {
      handleSearchSimple(input);
    }
  }

  // call to api to get search results (SIMPLE SEARCH)
  function handleSearchSimple(input) {
    if (input) {
      fetch(`/api/search?search=${input}`)
          .then((res) => res.json())
          .then(
            (result) => {
              setSearchOutput(result);
              setOpenOutput(true);
            },
            (error) => {
              console.log(error);
            }
          )
    } else {
      setOpenOutput(false);
    }
    setInput('');
  }

  // call to api to get search results (FULL TEXT SEARCH)
  function handleSearchFullText(input) {
    if (input) {
      fetch(`/api/search/fulltext/?search=${input}`)
          .then((res) => res.json())
          .then(
            (result) => {
              setSearchOutput(result);
              setOpenOutput(true);
            },
            (error) => {
              console.log(error);
            }
          )
    } else {
      setOpenOutput(false);
    }
    setInput('');
  }

  // call to api to get search results (FUZZY SEARCH)
  function handleSearchFuzzy(input) {
    if (input) {
      fetch(`/api/search/fuzzy/?search=${input}`)
          .then((res) => res.json())
          .then(
            (result) => {
              setSearchOutput(result);
              setOpenOutput(true);
            },
            (error) => {
              console.log(error);
            }
          )
    } else {
      setOpenOutput(false);
    }
    setInput('');
  }

  // highlight search criteria
  useEffect(() => {
    if (data.length > 0) {
      highlightSearchTerms(input, document.getElementById("markable"))
    }
  }, [data])

  function highlightSearchTerms(term, node) {
    let instance = new Mark(node);
    term = term.trim();
    instance.mark(term);
  };

  function handleRadio(event) {
    setSearchType(event.target.value);
  }

  return (
    <div className="container-sm">
      <div className="container-sm top-container"><h3>Search with suggestions</h3></div>
      <div className="container-sm">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="fulltext"
            checked={searchType === 'fulltext'}
            onChange={handleRadio} />
          <label className="form-check-label" htmlFor="inlineRadio1">Fulltext SQL search</label>
        </div>
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="fuzzy"
            checked={searchType === 'fuzzy'}
            onChange={handleRadio} />
          <label className="form-check-label" htmlFor="inlineRadio2">Fuzzy Fulltext SQL Search</label>
        </div>
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="simple"
            checked={searchType === 'simple'}
            onChange={handleRadio} />
          <label className="form-check-label" htmlFor="inlineRadio3">Simple SQL search</label>
        </div>
      </div>
      <div className="container-sm">
        
        <div className="d-flex flex-row mb-3">
          <input type="text" value={input} onChange={onChange} onKeyDown={handleEnter} className="form-control"/>
          <button onClick={handleSearchButton} className="btn btn-primary">
              Search
          </button>
        </div>

        <div id="markable" className={`d-flex flex-column mb-3 dropdown ${!open ? 'invisible' : ''}`}>
          {data.filter(el => {
            const searchValue = input.toLowerCase();
            return searchValue
          })
          .map((el) => ( 
            <div
              onClick={() => chooseOption(el.name)}
              className="dropdown-row"
              key={el.id}
            >
              {el.name}
            </div>
          ))}
        </div>

      </div>
      <div className="container-sm"><h3>Search results</h3></div>
      <hr />
      <div className={`d-flex flex-column mb-3 searchResults ${!openOutput ? 'invisible' : ''}`}>
        <ul className="list-group list-group-flush">
          {searchOutput.map(el => {
            return <li key={el.id} className="list-group-item">{el.name}</li>
          })}
        </ul>
      </div>

    </div>
  )
}

export default App;