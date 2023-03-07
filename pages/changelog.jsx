import Layout from '../components/layout'
import styles from '../styles/changelog.module.css';

const changelog = {"2023-03-07": "Added a changelog"}

export default function ChangeLog() {
  return (
    <Layout pageTitle="ChangeLog">
      <h1>Changelog</h1>
      {
        Object.keys(changelog).map((date, index) => (
          <div id={date} className={styles.day}>
            <p class="light">{date}</p>
            <p>{changelog[date]}</p>
            <br/>
          </div>
        ))
      }
    </Layout>
  );
}