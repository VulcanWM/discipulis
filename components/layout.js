import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { useTheme } from "next-themes";

const metadata = {
  Home: {
    Description:
      "Discipulis is a website for students who are studying Latin and want to find fun resources to help them learn",
    Tags: "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm",
  },
  "All Nouns": {
    Description:
      "View all the nouns you need to learn to be proficient in Latin",
    Tags: "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,declension,1st,2nd,3rd,4th,5th,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,filius,deus,bellum,vir,gradus,genu",
  },
  "All Verbs": {
    Description:
      "View all the verbs you need to learn to be proficient in Latin",
    Tags: "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,declension,1st,2nd,3rd,4th,mixed,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,capio,ambulo,ago,cogo,clamo,bibo",
  },
  "Browse Sets": {
    Description:
      "View all the sets you can be tested in and how many plays they each have",
    Tags: "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,sets,quiz",
  },
  "Convert Noun": {
    Description:
      "Convert any english noun in the wordlist to a Latin case and number",
    Tags: "noun,convert,case,number,discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm",
  },
  "Convert Verb": {
    Description:
      "Convert any english verb in the wordlist to a Latin number, tense and person",
    Tags: "verb,convert,number,tense,person,discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm",
  },
  ChangeLog: {
    Description:
      "View the Discipulis ChangeLog to see when each feature was added",
    Tags: "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm",
  },
};

const siteTitle = "Discipulis";

export default function Layout({ pageTitle, wordtype, children }) {
  const title = `${siteTitle} - ${pageTitle}`;
  const { theme, setTheme } = useTheme();

  var description;
  var keywords;
  if (wordtype == null) {
    description = metadata[pageTitle]["Description"];
    keywords = metadata[pageTitle]["Tags"];
  } else {
    if (wordtype == "set") {
      description =
        "Check out all the vocab in the set " +
        pageTitle +
        " and then start testing yourself on them";
    } else if (wordtype == "start_quiz") {
      description =
        "Start the quiz for set: " +
        pageTitle +
        " by filling in the quiz settings";
    } else {
      description =
        "See the tables for the latin " + wordtype + " " + pageTitle;
    }
    keywords = metadata["Home"]["Tags"];
  }
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="description" content="Discipulis" />
        <meta property="og:image" content="/logo.png" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://discipulis.vercel.app" />
        <meta property="og:site_name" content="Discipulis" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="Website" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:description" content={description} />
        <title>{title}</title>
      </Head>
      <nav className={styles.mobilenav} id="navbar">
        <Link href="/">Home</Link>
        <Link href="/all_nouns">Nouns</Link>
        <Link href="/all_verbs">Verbs</Link>
        <Link href="/convert_noun">Convert Noun</Link>
        <Link href="convert_verb">Convert Verb</Link>
        <Link href="/browse_sets">Browse Sets</Link>
      </nav>
      <div className={styles.content}>
        <button
          className={styles.modebutton}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          change mode
        </button>
        <main>{children}</main>
      </div>
      <Analytics />
    </div>
  );
}
