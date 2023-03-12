import Layout from '../../components/layout'
import {get_verb_table} from '../../grammar/verbs'
import {verbs} from '../../grammar/vocab'
import styles from '../../styles/[verb].module.css'

export default function VerbPage( {verb}) {
  const output = get_verb_table(verb)
  const table = output.table
  if (output.word.includes("-")){
    var clean_word = output.word.split("-")[0]
  } else {
    var clean_word = output.word
  }
  const onClick = (e) => {
    const hidden = e.currentTarget.getAttribute("data-hidden")
    if (e.currentTarget.innerText == "Click to reveal"){
      e.currentTarget.innerText = hidden
      e.currentTarget.classList.add(styles.tablevalue)
    } else {
      e.currentTarget.innerText = "Click to reveal"
      e.currentTarget.classList.remove(styles.tablevalue)
    }
  }
  return (
    <Layout pageTitle={verb} wordtype="verb">
      <h2>{clean_word}: {output.latin_form}</h2>
      <div className={styles.tables}>
        {Object.keys(table).map(number => (
          <table id={number} className={styles.table}>
          <caption className={styles.caption + " " + styles.upper}>{number}</caption>
            {Object.keys(table[number]).map(the_case => (
            <tr>
              <td className={styles.td + " " + styles.upper}>{the_case}</td>
  {/*                 <td class="flip" id={number + ":" + the_case} data-hidden="{{table[number][case]}}">Click to reveal</td> */}
              <td onClick={onClick} data-hidden={table[number][the_case]} className={styles.td + " " + styles.tablevalue}>{table[number][the_case]}</td>
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