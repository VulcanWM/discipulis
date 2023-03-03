import Layout from '../../components/layout'
import {get_verb_table} from '../../grammar/verbs'
import {verbs} from '../../grammar/vocab'

export default function HomePage( {verb}) {
  const output = get_verb_table(verb)
  const table = output.table
  if (output.word.includes("-")){
    var clean_word = output.word.split("-")[0]
  } else {
    var clean_word = output.word
  }
  return (
    <Layout pageTitle={verb}>
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
  Object.values(verbs).forEach(form => {
    paths.push("/verb/" + form.split(", ")[0])
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const verb = params.verb
  return {
    props: {
      verb,
    },
  };
}