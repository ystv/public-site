import styles from "./Navbar.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ystv_colour from "../../public/ystv_colour.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header>
      <div className={styles.menu}>
        <div className={styles.menuContainer}>
          <a href="/" className={styles.menua}>
            <Image
              width="104"
              height="52"
              priority
              placeholder="blur"
              src={ystv_colour}
              alt="YSTV"
              className={styles.logo}
              layout="fixed"
            />
          </a>
          <div
            className={`${
              searchOpen ? styles.searchlayoutdiv : styles.searchNoPadding
            }`}
          >
            <form
              action="/results"
              className={`${searchOpen ? styles.searchMobile : null} ${
                styles.searchform
              }`}
              method="get"
            >
              <input
                type="text"
                placeholder="Search our videos..."
                name="search"
              />
              <button type="submit">
                <img
                  className={styles.searchIcon}
                  src="/icons/search-24px.svg"
                />
              </button>
            </form>
          </div>

          <div className={styles.spacer} />
          <div
            className={`${menuOpen ? styles.unhidden : ""} ${
              styles.buttonContainer
            }`}
          >
            <Link href="/watch">
              <a>
                <div>Watch</div>
              </a>
            </Link>
            <Link href="/get-involved">
              <a>
                <div>Get Involved</div>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <div>About</div>
              </a>
            </Link>
            <Link href="/hires">
              <a>
                <div>Hires</div>
              </a>
            </Link>
            <a href="https://my.ystv.co.uk">
              <div>Login</div>
            </a>
          </div>
          <img
            className={`${styles.searchToggle} ${styles.toggle}`}
            src="/icons/search-24px.svg"
            alt="Search Toggle"
            draggable="false"
            onClick={(e) => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
          />
          <img
            className={`${styles.menuToggle} ${styles.toggle}`}
            src="/icons/menu-24px.svg"
            alt="Menu Toggle"
            draggable="false"
            onClick={(e) => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
          />
        </div>
      </div>
    </header>
  );
}
