import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <title>Tweet Tools</title>
      <meta name='description' content='Created by Joao Lima (Bokomoko)' />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to TweetTools V1</h1>
      </main>
      ,
    </div>
  );
};

export default Home;
