import Layout from "../../components/layout";
import {generate_question} from '../../lib/generate_question'

export default function Question( {question_lists, quiz_id, answer_type, question_type} ) {
  var count = 0
  function new_question(){
    if (count == 9){
        document.getElementById("form").innerText = "Quiz ended!"
    } else {
        count++
        let question_dict = question_lists[count]
        document.getElementById("question").innerText = question_dict.question
        document.getElementById("question_number").innerText = `Question: ${count + 1}`
    }
  }
  return (
    <Layout pageTitle={quiz_id} wordtype="quiz">
      <h1>Question</h1>
      <div id="form">
        <p id="question_number">Question: {count + 1}</p>
        <p id="question">{question_lists[0].question}</p>
        <button onClick={new_question}>New Question</button>
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
    var question_lists = []
    for (let i=0;i<10;i++){
        let question_dict = await generate_question(quiz_id, answer_type, question_type)
        question_lists.push(question_dict)
    }
    // let question_dict = await generate_question(quiz_id, answer_type, question_type)
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