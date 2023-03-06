import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

export const siteTitle = "Discipulis";

export default function Layout({ pageTitle, children }) {
  const title = `${siteTitle} - ${pageTitle}`;
  function changeMode(){
    // console.log("cool")
    
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
        <Link href="/">Home</Link>
        <Link href="/all_nouns">Nouns</Link>
        <Link href="/all_verbs">Verbs</Link>
        <Link href="/convert_noun">Convert Noun</Link>
        <Link href="convert_verb">Convert Verb</Link>
        <Link href="/browse_sets">Browse Sets</Link>
      </nav>
      <div className={styles.content}>
        <button className={styles.modebutton} onClick={changeMode()}>change mode</button>
        <main>{children}</main>
      </div>
      <Analytics />
    </div>
  );
}