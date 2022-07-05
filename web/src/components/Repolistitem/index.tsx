import { useState } from 'react';
// import react-markdown to render our readme when present
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
// disabling naming conventions for the created_at we get back from github
/* eslint-disable @typescript-eslint/naming-convention */

export function Repolistitem({
  repo,
}: {
  repo: {
    name: string;
    forks: number;
    description: string;
    language: string;
    git_commits_url: string;
    full_name: string;
  };
}) {
  const [viewDetails, setViewDetails] = useState(false);
  const [commitDetails, setCommitDetails] = useState({
    name: 'Author unavailable',
    date: 'Date unavailable',
    message: 'Message unavailable',
  });
  const [readmeMarkdown, setReadmeMarkdown] = useState('');
  const styles = {
    repo: {
      border: 'solid thin gray',
      margin: '1vmax',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    label: {
      justifySelf: 'flex-end',
    },
    detailsWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    messageWrapper: {
      display: 'flex',
    },
    subheading: {
      fontWeight: 'bold',
      margin: '1vmax',
    },
  };
  async function clickHandler() {
    setViewDetails(!viewDetails);
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repo.full_name}/commits/master`
    ).then((response) => {
      return response.json();
    });
    const newCommitDetails = {
      name: commitResponse.commit.author.name,
      date: commitResponse.commit.author.date,
      message: commitResponse.commit.message,
    };
    const readmeData = await fetch(
      `https://api.github.com/repos/${repo.full_name}/readme`
    ).then((response) => {
      return response.json();
    });
    const readme = atob(readmeData.content);
    setReadmeMarkdown(readme);
    setCommitDetails(newCommitDetails);
  }
  return (
    <div onClick={() => clickHandler()} style={styles.repo}>
      <div style={styles.header}>
        <p style={styles.label}>Language: {repo.language}</p>
        <h2>{repo.name}</h2>
        <p style={styles.label}>Forks: {repo.forks}</p>
      </div>
      <p>{repo.description}</p>
      {viewDetails ? (
        <div>
          Most recent commit:
          <div style={styles.detailsWrapper}>
            <p>Author: {commitDetails.name}</p>
            <p>Date: {commitDetails.date}</p>
          </div>
          <div style={styles.messageWrapper}>
            <p style={styles.subheading}>Commit message:</p>
            <p> {commitDetails.message}</p>
          </div>
          <div>
            {readmeMarkdown === '' ? (
              ''
            ) : (
              <>
                <h3>Readme: </h3>
                <ReactMarkdown>{readmeMarkdown}</ReactMarkdown>
              </>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
