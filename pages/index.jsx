import Layout from '../components/layout'
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout pageTitle="Home">
      <h1>Discipulis</h1>
      <p>Discipulis is a website whose ultimate aim is to help children around the world learn Latin in a fun way.</p>
      <h2>Its main features:</h2>
      <ul>
        <li>Shows all the tenses of a Latin verb in the form of a table</li>
        <li>Shows all the cases of a Latin noun in the form of a table</li>
        <li>Use test mode on the table pages to quiz yourself on cases and tenses</li>
        <li>Flip the cells on the tables so you can use them as flashcards</li>
        <li>Has converters to convert English nouns and verbs to Latin</li>
        <li>Easily quiz yourself on vocab with the different sets</li>
      </ul>
      <a href="https://discipulis.hashnode.dev/newsletter">Subscribe to Discipulis' newsletter</a><br/>
      <a href="https://discipulis.hashnode.dev">View Discipulis' blog</a><br/>
      <Link href="/changelog">View the full changelog</Link><br/>
    </Layout>
  );
}