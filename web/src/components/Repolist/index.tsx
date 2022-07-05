import { Repolistitem } from '../Repolistitem';

export function Repolist({ repos }: { repos: never[] }) {
  const styles = {
    listContainer: {
      width: '80vw',
    },
  };
  return (
    <div style={styles.listContainer}>
      {repos.map((element, i) => (
        <Repolistitem key={i} repo={element} />
      ))}
    </div>
  );
}
