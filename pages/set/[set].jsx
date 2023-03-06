import Layout from '../../components/layout'
import clientPromise from "../../lib/mongodb";
import styles from '../../styles/[set].module.css';
import Link from 'next/link'
import {word_nominative} from '../../grammar/all'

export default function SetPage( {posts}) {
  const quiz_set = posts[0]
  console.log(quiz_set)
  var contains = quiz_set['Type'].split("-")
  contains = contains.map(i => i + "s");
  contains = contains.join(' and ')
  return (
    <Layout pageTitle={quiz_set.Name}>
      <h2>{quiz_set['Name']}</h2>
      <span>{quiz_set['Plays']} &#9654;&#65039; </span>
      <span><span className="red">!!!</span> {quiz_set['Priority']}</span>
      <p>This set contains <strong>{contains}</strong></p>
      <Link href={"/start_quiz/" + quiz_set['_id']}>
        <button>start quiz settings</button>
      </Link>
      <h3>All Vocab:</h3>
      {
        Object.keys(quiz_set['Words']).map((word, index) => (
          <a target="_blank" href={"/" + quiz_set['Words'][word] + "/" + word_nominative(quiz_set['Words'][word], word).nominative}>
            <div className={styles.word}>
              <p>{word.split("-")[0]}: {quiz_set['Words'][word]}</p>
            </div> 
          </a>
        ))
      }
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db("Quiz");
  const path_ids = await db.collection("Sets").distinct('_id', {}, {});
  var paths = []
  for await (const post of path_ids) {
    await paths.push("/set/" + post)
  }
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db("Quiz");
  const posts = await db.collection("Sets").find({"_id": params.set}).toArray()
  return {
    props: {posts},
  }
}