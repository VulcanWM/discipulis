import Layout from '../components/layout'
import {verbs} from '../grammar/vocab'
import Link from 'next/link';
import styles from '../styles/all_nouns.module.css';

export default function HomePage() {
  return (
    <Layout pageTitle="All Verbs">
      <h1>All Latin Verbs</h1>
      { 
        Object.keys(verbs).map((verb, index) => (
          <Link href={"/verb/" + verbs[verb].split(",")[0]}>
            <div className={styles.word}>
              <p>{verb}: {verbs[verb]}</p>
            </div>
          </Link>
        ))
      }
    </Layout>
  );
}