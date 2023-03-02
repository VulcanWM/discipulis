import Layout from '../components/layout'
import {verb_english_to_latin, get_verb_table} from '../grammar/verbs'
import {noun_english_to_latin} from '../grammar/nouns'

export default function HomePage() {
  // console.log(get_verb_table("amo"))
  return (
    <Layout pageTitle="Home">
      <h1>Discipulis</h1>
      <p>Welcome to Discipulis.</p>
      <p>Here you can be tested on latin nouns and verbs.</p>
      <p>You can also use the converters to convert nouns and verbs from english to latin</p>
      <a href="/all_nouns">All Nouns</a><br/>
      <a href="/all_verbs">All Verbs</a><br/>
      <a href="/convert_verb">Convert verb from english to latin</a><br/>
      <a href="/convert_noun">Convert noun from english to latin</a><br/>
      <p>{verb_english_to_latin("love", "2nd", "plural", "future").latin_word}</p>
      <p>{noun_english_to_latin("thing", "dative", "plural").latin_word}</p>
    </Layout>
  );
}