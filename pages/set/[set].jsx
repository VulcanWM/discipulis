import Layout from '../../components/layout'
import { distinct_set_ids, get_set } from "../../lib/database"
import styles from '../../styles/[set].module.css';
import Link from 'next/link'
import {word_nominative} from '../../grammar/all'

export default function SetPage( {quiz_set}) {
  var contains = quiz_set['Type'].split("-")
  contains = contains.map(i => i + "s");
  contains = contains.join(' and ')
  return (
    <Layout pageTitle={quiz_set.Name} wordtype="set">
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
  const path_ids = await distinct_set_ids()
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
  const quiz_set = await get_set(params.set)
  return {
    props: {quiz_set},
  }
}