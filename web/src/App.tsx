import React from 'react';

import { Repolist } from './components/Repolist';

import './App.css';

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
      <h1>Repo Viewer</h1>
      <div>
        {fullRepoList.length === 0 ? '' : <Repolist repos={fullRepoList} />}
      </div>
    </div>
  );
}
