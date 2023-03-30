import Layout from "../../components/layout";
import {generate_question} from '../../lib/generate_question'

export default function Question( {question_dict, quiz_id} ) {
  return (
    <Layout pageTitle={quiz_id} wordtype="quiz">
      <h1>Question</h1>
      <p id="question">{question_dict.question}</p>
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
    let question_dict = await generate_question(quiz_id, answer_type, question_type)
    if (question_dict.question == false){
        return {
            redirect: {
                destination: '/browse_sets',
                permanent: false,
            },
        }
    }
    return {
        props: { question_dict, quiz_id },
    };
}