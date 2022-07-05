import React from 'react';

import { Repolist } from './components/Repolist';

import './App.css';

export function App() {
  const [fullRepoList, setFullRepoList] = React.useState();
  // fetch the repos list, give useEffect an empty dependency array so we only check once, logging status on error temporarily
  React.useEffect(() => {
    fetch('/repos').then(async (res) => {
      if (res.status === 200) {
        const data = res.json();
        setFullRepoList(await data);
      } else {
        console.log(res.status);
      }
    });
  }, []);
  const styles = {
    listWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  };
  return (
    <div className="App">
      <h1>Repo Viewer</h1>
      <div style={styles.listWrapper}>
        {!fullRepoList ? (
          <div>Loading...</div>
        ) : (
          <Repolist repos={fullRepoList} />
        )}
      </div>
    </div>
  );
}
