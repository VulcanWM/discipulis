import Layout from '../components/layout'
import styles from '../styles/changelog.module.css';

const changelog_dict = {"2023-03-08": "- Added a changelog", "2023-03-05": "- Added the `convert_verb` and `convert_noun` pages", "2023-03-04": "- Added the ability to browse sets\n- Added set pages to see each set's vocab", "2023-03-03": "- Added table pages for both nouns and verbs with all tenses and cases"}
var changelog = {}
for (const [key, value] of Object.entries(changelog_dict)) {
  var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = value,
    html      = converter.makeHtml(text);
  changelog[key] = html
}

export default function ChangeLog() {
  return (
    <Layout pageTitle="ChangeLog">
      <h1>Changelog</h1>
      {
        Object.keys(changelog).map((date, index) => (
          
          <div id={date} className={styles.day}>
            <p className="light">{date}</p>
            <div dangerouslySetInnerHTML={{ __html: changelog[date] }} />
            <br/>
          </div>
        ))
      }
    </Layout>
  );
}