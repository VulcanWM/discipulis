import Layout from '../../components/layout'
import clientPromise from "../../lib/mongodb";
import styles from '../../styles/[quiz_id].module.css';
import Link from 'next/link'
import {noun_questions, verb_questions} from '../../grammar/all'
import { useForm } from "react-hook-form";

export default function StartQuizPage( {posts}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const answer_type = data.answer_type
    var question_types = []
    console.log(answer_type)
    for (const [key, value] of Object.entries(data)) {
      if (key.includes("question")){
        if (value != false){
            question_types.push(key.replace("question_", ""))
        }
      }
    }
    console.log(question_types)
    alert("The start quiz function hasn't been fully implemented yet")
  }
  const quiz_set = posts[0]
  var questions = {}
  if (quiz_set['Type'].includes("noun")){
    Object.assign(questions, noun_questions);
  }
  if (quiz_set['Type'].includes("verb")){
    Object.assign(questions, verb_questions);
  }
  return (
    <Layout pageTitle={quiz_set.Name} wordtype="start_quiz">
      <h2><Link href={"/set/" + quiz_set._id}>{quiz_set['Name']}</Link></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="answer_type">Answer Type:</label>
        <select defaultValue="both" {...register("answer_type", { required: true })} name="answer_type" id="answer_type">
            <option value="multiple">Multiple Choice Only</option>
            <option value="written">Written Only</option>
            <option value="both">Written and Multiple Choice</option>
        </select><br/>
        <h3>Question Types:</h3>
        {
          Object.keys(questions).map((question_id, index) => (
            <label className={styles.container}>{questions[question_id]}
              <input type="checkbox" id={"question_" + question_id} {...register("question_" + question_id)} name={"question_" + question_id} value={questions[question_id]}/>
              <span className={styles.checkmark}></span>
            </label>
          ))
        }
        <br/><button>start quiz</button>
      </form>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db("Quiz");
  const path_ids = await db.collection("Sets").distinct('_id', {}, {});
  var paths = []
  for await (const post of path_ids) {
    await paths.push("/start_quiz/" + post)
  }
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db("Quiz");
  const posts = await db.collection("Sets").find({"_id": params.quiz_id}).toArray()
  return {
    props: {posts},
  }
}