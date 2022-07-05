import { Key, useEffect, useState } from 'react';
import { Repolistitem } from '../Repolistitem';

/* eslint-disable @typescript-eslint/naming-convention */

export function Repolist({ repos }: { repos: any }) {
  const [sortedList, setSortedList] = useState([]);
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
  }, [repos]);
  const styles = {
    listContainer: {
      width: '80vw',
    },
  };
  return (
    <div style={styles.listContainer}>
      {sortedList.map(
        (
          element: {
            name: string;
            forks: number;
            description: string;
            language: string;
          },
          i: Key | null | undefined
        ) => (
          <Repolistitem key={i} repo={element} />
        )
      )}
    </div>
  );
}
