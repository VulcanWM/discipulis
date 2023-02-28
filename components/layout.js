import Head from 'next/head';
import styles from './layout.module.css';
import { Analytics } from '@vercel/analytics/react';

export const siteTitle = "Discipulis";

export default function Layout({ pageTitle, children }) {
  const title = `${siteTitle} - ${pageTitle}`;
  function changeMode(){
    console.log("cool")
    
  }
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Discipulis"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://discipulis.vercel.app" />
        <meta property="og:site_name" content="Discipulis" />
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="Website" />
        <title>{title}</title>
      </Head>
      <nav className={styles.mobilenav} id="navbar">
        <a href="/" className={styles.navlink}>Home</a>
        <a href="/all_nouns" className={styles.navlink}>Nouns</a>
        <a href="/all_verbs" className={styles.navlink}>Verbs</a>
        <a href="/convert_noun" className={styles.navlink}>Convert Noun</a>
        <a href="convert_verb" className={styles.navlink}>Convert Verb</a>
        <a href="/browse_sets" className={styles.navlink}>Browse Sets</a>
      </nav>
      <div className={styles.content}>
        <button className={styles.modebutton} onClick={changeMode()}>change mode</button>
        <main>{children}</main>
      </div>
      <Analytics />
    </div>
  );
}