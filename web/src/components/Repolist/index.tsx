import { useEffect, useState } from 'react';
import { Repolistitem } from '../Repolistitem';

// disabling naming conventions for the created_at we get back from github
/* eslint-disable @typescript-eslint/naming-convention */

export function Repolist({ repos }: { repos: any }) {
  // declare two arrays, sortedList to hold a sorted background array
  // filteredList is used to define what repos are viewable on page by clicking the filter buttons
  // filterButtons state declared because we dynamically create buttons for each language present in the list
  const [sortedList, setSortedList] = useState(repos);
  const [filteredList, setFilteredList] = useState([]);
  const [filterButtons, setFilterButtons] = useState<string[]>([]);
  useEffect(() => {
    const descSort = repos.sort(
      (
        a: { created_at: string | number | Date },
        b: { created_at: string | number | Date }
      ) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    );
    setSortedList(descSort);
    setFilteredList(descSort);
  }, [repos]);
  useEffect(() => {
    const newFilterButtons: string[] = [];
    repos.forEach((element: { language: any }) => {
      if (!newFilterButtons.includes(element.language)) {
        newFilterButtons.push(element.language);
      }
    });
    setFilterButtons(newFilterButtons);
  }, [repos]);

  //   function for filtering by language
  function handleFilterButton(language: string) {
    if (language === '') {
      setFilteredList(sortedList);
    } else {
      const newFilteredList = sortedList.filter(
        (element: { language: string }) => {
          return element.language === language;
        }
      );
      setFilteredList(newFilteredList);
    }
  }
  const styles = {
    listContainer: {
      width: '80vw',
    },
    button: {
      margin: '1vmax',
    },
  };
  return (
    <div style={styles.listContainer}>
      <button style={styles.button} onClick={() => handleFilterButton('')}>
        No Filter
      </button>
      {filterButtons.map((button, i) => (
        <button
          onClick={() => handleFilterButton(button)}
          style={styles.button}
          key={i}
        >
          {button}
        </button>
      ))}
      {filteredList.map(
        (element: {
          name: string;
          forks: number;
          description: string;
          language: string;
          id: string;
        }) => (
          <Repolistitem key={element.id} repo={element} />
        )
      )}
    </div>
  );
}
