import React from 'react';
import logo from './logo.svg';

import './App.css';

// function fetchRepoData() {
//   return fetch('/repos').then((res) => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       return res.status;
//     }
//   });
// }

export function App() {
  const [fullRepoList, setFullRepoList] = React.useState([]);
  React.useEffect(() => {
    fetch('/repos').then(async (res) => {
      if (res.status === 200) {
        const data = res.json();
        setFullRepoList(await data);
      } else {
        console.log(res.status);
      }
      console.log(fullRepoList);
    });
  }, [fullRepoList]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
