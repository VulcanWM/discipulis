import Layout from '../../components/layout'
import {get_noun_table} from '../../grammar/nouns'
import {nouns} from '../../grammar/vocab'
import styles from '../../styles/[noun].module.css'

function cell_change(the_id){
  var cell = document.getElementById(the_id)
  console.log(cell.data-hidden)
}

export default function NounPage( {noun}) {
  const output = get_noun_table(noun)
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
    <Layout pageTitle={noun} wordtype="noun">
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