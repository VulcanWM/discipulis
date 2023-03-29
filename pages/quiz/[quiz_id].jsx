import Layout from "../../components/layout";
import {generate_question} from '../../lib/generate_question'


export default function Question( {question_dict} ) {
  return (
    <Layout pageTitle="ChangeLog">
      <h1>Question</h1>
      <p>{question_dict.question}</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
    const quiz_id = context.params.quiz_id
    const { answer_type } = context.query;
    const { question_type } = context.query;
    let question_dict = await generate_question(quiz_id, answer_type, question_type)
    return {
        props: { question_dict },
    };
}