import Layout from '../../components/layout'
import { distinct_set_ids, get_set } from "../../lib/database"
import styles from '../../styles/[quiz_id].module.css';
import Link from 'next/link'
import {noun_questions, verb_questions} from '../../grammar/all'
import { useForm } from "react-hook-form";
import Router from 'next/router'

export default function StartQuizPage( {quiz_set}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const answer_type = data.answer_type
    var question_types = []
    for (const [key, value] of Object.entries(data)) {
      if (key.includes("question")){
        if (value != false){
            question_types.push(key.replace("question_", ""))
        }
      }
    }
    const question_types_str = question_types.join("")
    if (question_types_str == ""){
      document.getElementById("error_msg").innerHTML = "You have to check at least one question type"
    } else {
      Router.push(`/quiz/${quiz_set['_id']}?answer_type=${answer_type}&question_type=${question_types_str}`)
    }
  }
  var questions = {}
  if (quiz_set['Type'].includes("noun")){
    Object.assign(questions, noun_questions);
  }
  if (quiz_set['Type'].includes("verb")){
    Object.assign(questions, verb_questions);
  }
  return (
    <Layout pageTitle={quiz_set._id} wordtype="quiz">
      <h2><Link href={"/set/" + quiz_set._id}>{quiz_set['Name']}</Link></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p id="error_msg" className="red"></p>
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
  const path_ids = await distinct_set_ids()
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
  const quiz_set = await get_set(params.quiz_id)
  return {
    props: {quiz_set},
  }
}