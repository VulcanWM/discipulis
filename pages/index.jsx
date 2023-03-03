import Layout from '../components/layout'

export default function HomePage() {
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
    </Layout>
  );
}