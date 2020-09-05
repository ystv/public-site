import styles from "./Footer.module.css";

function Footer() {
  const current_date = new Date();
  const current_year = current_date.getFullYear();
  let year = "";
  if (current_year > 2020) {
    year = year.concat("-", current_year.toString());
  }

  return (
    <footer className={styles.container}>
      <div className={styles.gridContainer}>
        <div />
        <div>
          <h4>Legal Stuff</h4>
          <a href="/disclaimer">
            <p>Disclaimer</p>
          </a>
          <a href="/license">
            <p>License</p>
          </a>
        </div>
        <div>
          <h4>Other Platforms</h4>
          <a href="https://facebook.com/YorkStudentTelevision">
            <p>Facebook</p>
          </a>
          <a href="https://instagram.com/YorkStudentTelevision">
            <p>Instagram</p>
          </a>
          <a href="https://twitter.com/YSTV">
            <p>Twitter</p>
          </a>
          <a href="https://www.youtube.com/user/YorkStudentTV">
            <p>Youtube</p>
          </a>
          <a href="https://github.com/YSTV">
            <p>Github</p>
          </a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>info@ystv.co.uk</p>
          <sub>James College</sub>
          <br />
          <sub>Newton Way</sub>
          <br />
          <sub>Heslington,</sub>
          <br />
          <sub>York</sub>
          <br />
          <sub>YO10 5DD</sub>
        </div>
        <div />
      </div>
      <div className={styles.copyright}>
        <small>Website ©2020{year} York Student Television.</small>
        <br />
        <small>All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
