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
  var test_mode_on = false;
  const onClick = (e) => {
    if (test_mode_on == false){
      const hidden = e.currentTarget.getAttribute("data-hidden")
      if (e.currentTarget.innerText == "Click to reveal"){
        e.currentTarget.innerText = hidden
        e.currentTarget.classList.add(styles.tablevalue)
      } else {
        e.currentTarget.innerText = "Click to reveal"
        e.currentTarget.classList.remove(styles.tablevalue)
      }
    }
  }

  const onClickTest = (e) => {
    const answer = e.currentTarget.parentElement.getAttribute("data-hidden")
    const guess = e.currentTarget.parentElement.getElementsByTagName('input')[0].value
    if (answer.toUpperCase() == guess.toUpperCase()){
      e.currentTarget.parentElement.classList.remove(styles.wronganswer)
      e.currentTarget.parentElement.classList.add(styles.tablevalue)
    } else {
      e.currentTarget.parentElement.classList.add(styles.tablevalue, styles.wronganswer)
    }
    e.currentTarget.parentElement.innerText = answer;
  }

  function hide_all_cells(){
    test_mode_on = false;
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
    test_mode_on = false;
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
  function test_mode_on_func(){
    test_mode_on = true;
    var elements = document.querySelectorAll("td");
    for (var i = 0, len = elements.length; i < len; i++) {
      var element = elements[i]
      if (element.innerText != element.innerText.toUpperCase()) {
        element.classList.remove(styles.tablevalue)
        element.innerText = ""
        const input = document.createElement("input");
        element.append(input);
        const button = document.createElement("button");
        button.textContent = "enter";
        button.onclick = onClickTest;
        element.append(button);
      }
    }
  }
  return (
    <Layout pageTitle={verb} wordtype="verb">
      <h2>{clean_word}: {output.latin_form}</h2>
      <p>Click the cells to show/hide the latin words</p>
      <button onClick={hide_all_cells}>Hide all cells</button>
      <button onClick={show_all_cells}>Show all cells</button>
      <button onClick={test_mode_on_func}>Test Mode On</button>
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