export function Repolistitem({
  repo,
}: {
  repo: { name: string; forks: number; description: string };
}) {
  const styles = {
    repo: {
      border: 'solid thin gray',
      margin: '1vmax',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
    },
    label: {
      justifySelf: 'flex-end',
    },
  };
  return (
    <div style={styles.repo}>
      <div style={styles.header}>
        <h2>{repo.name}</h2>
        <p style={styles.label}>Forks: {repo.forks}</p>
      </div>

      <p>{repo.description}</p>
    </div>
  );
}
