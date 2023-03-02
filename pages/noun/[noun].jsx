import Layout from '../../components/layout'
import {get_noun_table} from '../../grammar/nouns'
import {nouns} from '../../grammar/vocab'

export default function HomePage( {noun}) {
  const output = get_noun_table(noun)
  const table = output.table
  if (output.word.includes("-")){
    var clean_word = output.word.split("-")[0]
  } else {
    var clean_word = output.word
  }
  return (
    <Layout pageTitle={noun}>
      <h2>{clean_word}: {output.latin_form}</h2>
      <div class="tables">
        {Object.keys(table).map(number => (
          <table id={number}>
          <caption class="upper">{number}</caption>
            {Object.keys(table[number]).map(the_case => (
            <tr>
              <td class="upper">{the_case}</td>
  {/*                 <td class="flip" id={number + ":" + the_case} data-hidden="{{table[number][case]}}">Click to reveal</td> */}
              <td>{table[number][the_case]}</td>
            </tr>
            ))}
          </table>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  var paths = []
  Object.values(nouns).forEach(form => {
    paths.push("/noun/" + form.split(", ")[0])
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const noun = params.noun
  return {
    props: {
      noun,
    },
  };
}