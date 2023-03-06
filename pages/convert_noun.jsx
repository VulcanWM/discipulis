import { useForm } from "react-hook-form";
import Layout from '../components/layout';
import {noun_english_to_latin} from '../grammar/nouns'

export default function ConvertNoun() {
  var msg = null
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const word = data.word
    const the_case = data.case
    const number = data.number
    var result = noun_english_to_latin(word, the_case, number)
    console.log(result)
    if (result.nominative == false){
      msg = result.latin_word
      document.getElementById("msg").innerText = msg
    } else {
      msg = result.latin_word + " is the " + number + " " + the_case + " word for " + word
      document.getElementById("msg").innerText = msg
    }
  };
  return (
    <Layout pageTitle="Convert Noun">
      <h2>Convert Noun</h2>
      <p id="msg" className="light">{msg}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="word">English Word:</label>
        <input {...register("word", { required: true })} placeholder="english word" type="text"/><br/>
        <label htmlFor="case">Case: </label>
        <select
          defaultValue="nominative" id="case"
          name="case"
          {...register("case", { required: true })}
        >
          <option value="nominative">Nominative</option>
          <option value="vocative">Vocative</option>
          <option value="accusative">Accusative</option>
          <option value="genitive">Genitive</option>
          <option value="dative">Dative</option>
          <option value="ablative">Ablative</option>
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