import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <a href="/">
        <h1 className="title">YSTV</h1>
      </a>
      <ul className={styles.menu}>
        <li>
          <form action="/results" className={styles.searchform} method="get">
            <input type="text" placeholder="Search our videos" name="search" />
          </form>
        </li>
        <a href="/watch">
          <li>Watch</li>
        </a>
        <a href="/get-involved">
          <li>Get Involved</li>
        </a>
        <a href="/committee">
          <li>Committee</li>
        </a>
        <a href="/about">
          <li>About</li>
        </a>
        <a href="/hires">
          <li>Hires</li>
        </a>
        <a href="/contact">
          <li>Contact</li>
        </a>
      </ul>
    </header>
  );
}
