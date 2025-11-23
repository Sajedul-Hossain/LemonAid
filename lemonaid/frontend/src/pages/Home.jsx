import React from 'react'
import styles from './Home.module.css'
import logo from '../assets/lemonaid logo.png'
import Search from '../components/Search'

function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand}>
        <img src={logo} alt="LemonAid logo" className={styles.logo} />
        <span className={styles.siteName}>LemonAid</span>
      </a>

      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#get-started">Features</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default function Home() {
  return (
    <main className={styles.home}>
      <Header />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>LemonAid — Fresh ideas, Sweet results</h1>
          <p className={styles.tagline}>Fast, friendly tools to help you build and share better apps.</p>
          <a className={styles.cta} href="#get-started">Get Started</a>
        </div>
      </header>

      <section className={styles.features} id="get-started">
        <div className={styles.feature}>
          <h3>Lightning-fast</h3>
          <p>Built with Vite for fast development and instant reloads.</p>
        </div>
        <div className={styles.feature}>
          <h3>Easy to extend</h3>
          <p>Modular components and simple styling to customize quickly.</p>
        </div>
        <div className={styles.feature}>
          <h3>Open</h3>
          <p>Share contributions and improve together.</p>
        </div>
      </section>

  <Search />

      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactInner}>
          <h2>Contact us</h2>
          <p>Have questions or want to contribute? Send us a message.</p>
          <form className={styles.contactForm} onSubmit={(e) => { e.preventDefault(); alert('Thanks — message sent (demo).') }}>
            <label className={styles.formRow}>
              <span>Name</span>
              <input name="name" required />
            </label>
            <label className={styles.formRow}>
              <span>Email</span>
              <input name="email" type="email" required />
            </label>
            <label className={styles.formRow}>
              <span>Message</span>
              <textarea name="message" rows={4} required />
            </label>
            <div className={styles.formRow}>
              <button className={styles.cta} type="submit">Send message</button>
            </div>
          </form>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <p>© {new Date().getFullYear()} LemonAid</p>
      </footer>
    </main>
  )
}
