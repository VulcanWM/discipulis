import Layout from "../components/layout";
import { nouns } from "../grammar/vocab";
import Link from "next/link";
import styles from "../styles/all_nouns.module.css";

export default function AllNouns() {
  return (
    <Layout pageTitle="All Nouns">
      <h1>All Latin Nouns</h1>
      {Object.keys(nouns).map((noun, index) => (
        <Link href={"/noun/" + nouns[noun].split(",")[0]} key={index}>
          <div className={styles.word}>
            <p>
              {noun.split("-")[0]}: {nouns[noun]}
            </p>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
