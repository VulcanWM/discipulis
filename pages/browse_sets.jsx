import { all_sets } from "../lib/database"
import Layout from '../components/layout'
import styles from '../styles/browse_sets.module.css';
import Link from 'next/link';

export async function getStaticProps() {
  const posts = await all_sets()
  return {
    props: {posts},
  }
}

export default function BrowseSets( {posts} ) {
  return (
    <Layout pageTitle="Browse Sets">
      <h1>Browse Sets</h1>
      <div className={styles.sets}>
        {
          posts.map((set, index) => (
            <div key={index} id={index}>
              
              <Link href={"/set/" + set['_id']}>
                <div className={styles.set}>
                  <h3>{set['Name']}</h3>
                  <p>{set['Plays']} &#9654;&#65039;</p>
                  <p><span className="red">!!!</span> {set['Priority']}</p>
                  <br/>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </Layout>
  );
}