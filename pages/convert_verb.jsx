import { useForm } from "react-hook-form";
import Layout from '../components/layout';
import {verb_english_to_latin} from '../grammar/verbs'

export default function ConvertVerb() {
  var msg = null
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const word = data.word
    const tense = data.tense
    const person = data.person
    const number = data.number
    var result = verb_english_to_latin(word, person, number, tense)
    console.log(result)
    if (result.nominative == false){
      msg = result.latin_word
      document.getElementById("msg").innerText = msg
    } else {
      msg = result.latin_word + " is the " + tense + " " + person + " person " + number + " word for " + word
      document.getElementById("msg").innerText = msg
    }
  };
  return (
    <Layout pageTitle="Convert Verb">
      <h2>Convert Verb</h2>
      <p id="msg" className="light">{msg}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="word">English Word:</label>
        <input {...register("word", { required: true })} placeholder="english word" type="text"/><br/>
        <label htmlFor="tense">Tense: </label>
        <select
          defaultValue="present" id="tense"
          name="tense"
          {...register("tense", { required: true })}
        >
          <option value="present">Present</option>
          <option value="imperfect">Imperfect</option>
          <option value="perfect">Perfect</option>
          <option value="future">Future</option>
          <option value="pluperfect">Pluperfect</option>
          <option value="future perfect">Future Perfect</option>
        </select><br/>
        <label htmlFor="person">Person: </label>
        <select
          defaultValue="1st" id="person"
          name="person"
          {...register("person", { required: true })}
        >
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
        </select><br/>
        <label htmlFor="number">Number: </label>
        <select
          defaultValue="singular" id="number"
          name="number"
          {...register("number", { required: true })}
        >
          <option value="singular">Singular</option>
          <option value="plural">Plural</option>
        </select><br/>
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" value="convert noun"/>
      </form>
    </Layout>
  );
}