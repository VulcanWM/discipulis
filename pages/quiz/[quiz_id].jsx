import Layout from "../../components/layout";
import {generate_question} from '../../lib/generate_question'
import {add_view} from '../../lib/database'
import { useState } from 'react';
import Link from "next/link";
import { useForm } from "react-hook-form";
import Router from "next/router";

export default function Question( {question_lists, quiz_id, answer_type, question_type} ) {
  const [end_quiz, setShowMe] = useState(false);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  function toggleEnd(){
    setShowMe(!end_quiz);
  }
  function new_question(){
    if (count == 9){
      toggleEnd()
    } else {
      setCount(count + 1)
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    document.getElementById("guess").value = "";
    if (question_lists[count].answers.split(",").includes(data.guess.toLowerCase()) == true){
        setScore(score + 1)
    } 
    new_question()
  };
  function handleClick(e){
    if (question_lists[count].answers.split(",").includes(e.target.value.toLowerCase()) == true){
      setScore(score + 1)
    } 
    new_question()
  }
  function reload(){
    Router.reload()
  }
  return (
    <Layout pageTitle={quiz_id} wordtype="quiz">
      <h1>{quiz_id} Quiz</h1>
      <div style={{
        display: end_quiz?"none":"block"
      }}>
        <p>Question <strong>{count + 1}</strong> out of 10</p>
        <p>Score: <strong>{score}</strong></p>
        <hr/>
        <p id="question">{question_lists[count].question}</p>
        {question_lists[count].choices == "input" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input id="guess" {...register("guess")} placeholder="answer" type="text"/><br/>
            <input type="submit" value="submit answer"/>
          </form>
        ) : (
            <>
              {question_lists[count].choices.map((choice, index) => (
                <>
                  <button value={choice} onClick={(e) => handleClick(e)}>{choice}</button>
                  <br/>
                </>
              ))}
            </>
        )}
      </div>
      <div id="endquiz" style={{
        display: end_quiz?"block":"none"
      }}>
        <p>You finished the quiz with the score of <strong>{score}</strong> out of 10!</p>
        <button onClick={reload}>same quiz - same question</button>
        <br/>
        <Link href={"/start_quiz/" + quiz_id}>
          <button>same quiz - different type questions</button>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
    const quiz_id = context.params.quiz_id
    const { answer_type } = context.query;
    const { question_type } = context.query;
    if (answer_type == undefined || answer_type == undefined){
        return {
            redirect: {
                destination: '/browse_sets',
                permanent: false,
            },
        }
    }
    await add_view(quiz_id)
    var question_lists = []
    for (let i=0;i<10;i++){
        let question_dict = await generate_question(quiz_id, answer_type, question_type)
        question_lists.push(question_dict)
    }
    if (question_lists[0].question == false){
        return {
            redirect: {
                destination: '/browse_sets',
                permanent: false,
            },
        }
    }
    return {
        props: { question_lists, quiz_id, answer_type, question_type },
    };
}