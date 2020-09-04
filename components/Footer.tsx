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
        <div>
          <h4>Legal Stuff</h4>
          <a href="">
            <p>Disclaimer</p>
          </a>
          <a href="">
            <p>License</p>
          </a>
          <br />
          <br />
          <small>Website ©2020{year} York Student Television.</small>
          <br />
          <small>All rights reserved.</small>
        </div>
        <div>
          <h4>Other Platforms</h4>
          <a href="">
            <p>Facebook</p>
          </a>
          <a href="">
            <p>Instagram</p>
          </a>
          <a href="">
            <p>Twitter</p>
          </a>
          <a href="">
            <p>Youtube</p>
          </a>
          <a href="">
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
      </div>
    </footer>
  );
}

export default Footer;
