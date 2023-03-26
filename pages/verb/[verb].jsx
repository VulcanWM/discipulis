import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { get_verb_table } from "../../grammar/verbs";
import { verbs } from "../../grammar/vocab";
import styles from "../../styles/[verb].module.css";
import Test from "../../components/test";
import Hide from "../../components/hide";

export default function VerbPage({ verb }) {
  const [visibleTableEntries, setVisibleTableEntries] = useState({});
  const [testResultEntries, setTestResultEntries] = useState({});
  const [isTestMode, setIsTestMode] = useState(false);
  const output = get_verb_table(verb);
  const table = output.table;

  if (output.word.includes("-")) {
    var clean_word = output.word.split("-")[0];
  } else {
    var clean_word = output.word;
  }

  useEffect(() => {
    let tableKeys = Object.keys(table);
    let visibleTableEntriesSetter = {};
    let testResultEntriesSetter = {};
    tableKeys.forEach((key) => {
      visibleTableEntriesSetter[key] = Array(
        Object.keys(table[key]).length
      ).fill(false);
      testResultEntriesSetter[key] = Array(Object.keys(table[key]).length).fill(
        {
          completed: false,
          correct: true,
          userAnswer: "",
        }
      );
    });
    setTestResultEntries(testResultEntriesSetter);
    setVisibleTableEntries(visibleTableEntriesSetter);
  }, []);

  const onClick = (sector, index) => {
    const newVisibleTableEntries = { ...visibleTableEntries };
    newVisibleTableEntries[sector][index] =
      !newVisibleTableEntries[sector][index];
    setVisibleTableEntries(newVisibleTableEntries);
  };

  function hide_all_cells() {
    setIsTestMode(false);
    let tableKeys = Object.keys(table);
    let visibleTableEntriesSetter = {};
    tableKeys.forEach((key) => {
      visibleTableEntriesSetter[key] = Array(
        Object.keys(table[key]).length
      ).fill(false);
    });
    setVisibleTableEntries(visibleTableEntriesSetter);
  }

  function show_all_cells() {
    setIsTestMode(false);
    let tableKeys = Object.keys(table);
    let visibleTableEntriesSetter = {};
    tableKeys.forEach((key) => {
      visibleTableEntriesSetter[key] = Array(
        Object.keys(table[key]).length
      ).fill(true);
    });
    setVisibleTableEntries(visibleTableEntriesSetter);
  }

  function test_mode_on_func() {
    setIsTestMode(true);
    const newTestResultEntries = { ...testResultEntries };
    Object.keys(newTestResultEntries).forEach((sector) => {
      Object.keys(newTestResultEntries[sector]).forEach((index) => {
        newTestResultEntries[sector][index] = {
          completed: false,
          correct: testResultEntries[sector][index]["correct"],
          userAnswer: testResultEntries[sector][index]["userAnswer"],
        };
      });
    });
    setTestResultEntries(newTestResultEntries);
  }

  function clear_highlight() {
    const newTestResultEntries = { ...testResultEntries };
    Object.keys(newTestResultEntries).forEach((sector) => {
      Object.keys(newTestResultEntries[sector]).forEach((index) => {
        newTestResultEntries[sector][index] = {
          completed: testResultEntries[sector][index]["completed"],
          correct: true,
          userAnswer: "",
        };
      });
    });
    setTestResultEntries(newTestResultEntries);
  }

  const submitTest = (sector, index, userAnswer) => {
    const newTestResultEntries = { ...testResultEntries };
    newTestResultEntries[sector][index] = {
      completed: true,
      correct: userAnswer === table[sector][Object.keys(table[sector])[index]],
      userAnswer: userAnswer,
    };
    setTestResultEntries(newTestResultEntries);

    // Update visible table entries to make the submitted answer visible
    const newVisibleTableEntries = { ...visibleTableEntries };
    newVisibleTableEntries[sector][index] = true;
    setVisibleTableEntries(newVisibleTableEntries);
  };

  return (
    <Layout pageTitle={verb} wordtype="verb">
      <h2>
        {clean_word}: {output.latin_form}
      </h2>
      <p>Click the cells to show/hide the latin words</p>
      <button onClick={hide_all_cells}>Hide all cells</button>
      <button onClick={show_all_cells}>Show all cells</button>
      <button onClick={test_mode_on_func}>Test Mode On</button>
      <button onClick={clear_highlight}>Clear Highlight</button>
      <div className={styles.tables}>
        {Object.keys(table).map((number, i) => (
          <table id={number} className={styles.table} key={i}>
            <caption className={styles.caption + " " + styles.upper}>
              {number}
            </caption>
            <tbody>
              {Object.keys(table[number]).map((the_case, i) => (
                <tr key={i}>
                  <td className={styles.td + " " + styles.upper}>{the_case}</td>
                  {/*                 <td class="flip" id={number + ":" + the_case} data-hidden="{{table[number][case]}}">Click to reveal</td> */}
                  <td
                    onClick={() => onClick(number, i)}
                    className={styles.td + " " + styles.tablevalue}
                  >
                    {isTestMode &&
                    !testResultEntries[number][i]["completed"] ? (
                      <Test
                        answer={table[number][the_case]}
                        submitTest={submitTest}
                        sector={number}
                        index={i}
                      />
                    ) : (
                      <Hide
                        isVisible={
                          visibleTableEntries[number]
                            ? visibleTableEntries[number][i]
                            : false
                        }
                        content={table[number][the_case]}
                        failed={
                          testResultEntries[number] &&
                          !testResultEntries[number][i].correct
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  var paths = [];
  Object.values(verbs).forEach((form) => {
    paths.push("/verb/" + form.split(", ")[0]);
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const verb = params.verb;
  return {
    props: {
      verb,
    },
  };
}
