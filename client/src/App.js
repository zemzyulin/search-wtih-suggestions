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
  
  // setup debounce
  const debounceFn = useCallback(debounce(fetchSuggestions, 300), []);

  // handle input change
  async function onChange(e) {
    setInput(e.target.value);
    setOpen(true);
    debounceFn(e.target.value);
  }

  // call to api to get suggestions
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

  // handle option choosing
  function chooseOption(option) {
    setInput(option);
    setOpen(false);
  }

  // handle Enter pressed on input
  function handleEnter(e) {
    if (e.key === 'Enter') {
      handleSearch(input);
    }
  }

  // call to api to get full search results
  function handleSearch(input) {
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

  return (
    <div className="container-sm">
      <div className="container-sm top-container"><h3>Search with suggestions</h3></div>
      <div className="container-sm">
        
        <div className="d-flex flex-row mb-3">
          <input type="text" value={input} onChange={onChange} onKeyDown={handleEnter} className="form-control"/>
          <button onClick={() => handleSearch(input)} className="btn btn-primary">
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