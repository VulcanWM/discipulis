import Layout from '../components/layout'
import styles from '../styles/changelog.module.css';

const changelog_dict = {"2023-03-07": "- Added a changelog"}
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
{/*             <p>{changelog[date]}</p> */}
            <div dangerouslySetInnerHTML={{ __html: changelog[date] }} />
            <br/>
          </div>
        ))
      }
    </Layout>
  );
}

