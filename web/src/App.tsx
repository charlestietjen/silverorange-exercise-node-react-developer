import React from 'react';

import { Repolist } from './components/Repolist';

import './App.css';

/* eslint-disable @typescript-eslint/naming-convention */
interface Repo {
  name: string;
  description: string;
  language: string;
  forks: number;
  created_at: Date;
}

export function App() {
  const [fullRepoList, setFullRepoList] = React.useState<Repo[]>();
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
        {!fullRepoList ? '' : <Repolist repos={fullRepoList} />}
      </div>
    </div>
  );
}
