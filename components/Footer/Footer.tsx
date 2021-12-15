import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

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
        <div className={styles.topPaddingDiv} />

        <div>
          <h3>Legal Stuff</h3>
          <div className={styles.legalContainer}>
            <Link href="/disclaimer">
              <a>
                <p>Disclaimer</p>
              </a>
            </Link>
            <Link href="/license">
              <a>
                <p>License</p>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <h3>Other Sites</h3>
          <div className={styles.sitesContainer}>
            <a href={process.env.NEXT_PUBLIC_INTERNAL_SITE}>
              <p>MyTV</p>
            </a>
            <a href="https://wiki.ystv.co.uk">
              <p>History Wiki</p>
            </a>
            <a href="https://docs.ystv.co.uk">
              <p>Docs Wiki</p>
            </a>
            <a href="https://medium.com/ystv">
              <p>Tech Blog</p>
            </a>
            <a href="https://status.ystv.co.uk">
              <p>Status</p>
            </a>
          </div>
        </div>
        <div>
          <h3>Contact Us</h3>
          <a href="mailto:info@ystv.co.uk">info@ystv.co.uk</a>
          <br />
          <div className={styles.addressContainer}>
            <sub>James College,&nbsp;</sub>
            <br />
            <sub>Newton Way,&nbsp;</sub>
            <br />
            <sub>Heslington,&nbsp;</sub>
            <br />
            <sub>York&nbsp;</sub>
            <br />
            <sub>YO10 5DD</sub>
          </div>
        </div>
        <div />
      </div>

      <div className={styles.copyright}>
        <div className={styles.platformsContainer}>
          <a href="https://facebook.com/YorkStudentTelevision">
            <Image
              src="/socials/facebook.svg"
              alt="YSTV Facebook Page"
              width="32px"
              height="32px"
              unoptimized
            />
          </a>
          <a href="https://instagram.com/YorkStudentTelevision">
            <Image
              src="/socials/instagram.svg"
              alt="YSTV Instagrm Page"
              width="32px"
              height="32px"
              unoptimized
            />
          </a>
          <a href="https://twitter.com/ystv">
            <Image
              src="/socials/twitter.svg"
              alt="YSTV Twitter Page"
              width="32px"
              height="32px"
              unoptimized
            />
          </a>
          <a href="https://www.youtube.com/user/YorkStudentTV">
            <Image
              src="/socials/youtube.svg"
              alt="YSTV Youtube Page"
              width="32px"
              height="32px"
              unoptimized
            />
          </a>
          <a href="https://github.com/ystv">
            <Image
              src="/socials/github.svg"
              alt="YSTV Github Page"
              width="32px"
              height="32px"
              unoptimized
            />
          </a>
        </div>
        <small>Website ©2020{year} York Student Television.</small>
        <br />
        <small>All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
