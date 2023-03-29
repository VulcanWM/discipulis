import Layout from "../components/layout";
import {generate_question} from '../lib/generate_question'


export default function Question( {question_dict} ) {
  return (
    <Layout pageTitle="ChangeLog">
      <h1>Question</h1>
      <p>{question_dict.question}</p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
    let question_dict = await generate_question("all_nouns", "both", "c")
    return {
      props: { question_dict },
    };
  }
