import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <div className={styles.menu}>
        <a href="/">
          <img src="/ystv_colour.png" alt="YSTV logo" className={styles.logo} />
        </a>
        <div>
          <form action="/results" className={styles.searchform} method="get">
            <input
              type="text"
              placeholder="Search our videos..."
              name="search"
            />
          </form>
        </div>
        <div className={styles.spacer} />
        <a href="/watch" className={styles.watch}>
          <div>Watch</div>
        </a>
        <a href="/get-involved" className={styles.freshers}>
          <div>Get Involved</div>
        </a>
        <a href="/about" className={styles.about}>
          <div>About</div>
        </a>
        <a href="/hires" className={styles.hires}>
          <div>Hires</div>
        </a>
        <a href="/login" className={styles.login}>
          <div>Login</div>
        </a>
      </div>
    </header>
  );
}
