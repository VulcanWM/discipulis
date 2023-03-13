import Layout from '../../components/layout'
import {get_noun_table} from '../../grammar/nouns'
import {nouns} from '../../grammar/vocab'
import styles from '../../styles/[noun].module.css'

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
  function hide_all_cells(){
    var elements = document.querySelectorAll("td");
    for (var i = 0, len = elements.length; i < len; i++) {
      var element = elements[i]
      if (element.innerText != element.innerText.toUpperCase()) {
        element.innerText = "Click to reveal"
        element.classList.remove(styles.tablevalue)
      }
    }
  }
  function show_all_cells(){
    var elements = document.querySelectorAll("td");
    for (var i = 0, len = elements.length; i < len; i++) {
      var element = elements[i]
      if (element.innerText != element.innerText.toUpperCase()) {
        var hidden = element.getAttribute("data-hidden")
        element.innerText = hidden
        element.classList.add(styles.tablevalue)
      }
    }
  }
  return (
    <Layout pageTitle={noun} wordtype="noun">
      <h2>{clean_word}: {output.latin_form}</h2>
      <p>Click the cells to show/hide the latin words</p>
      <button onClick={hide_all_cells}>Hide all cells</button>
      <button onClick={show_all_cells}>Show all cells</button>
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