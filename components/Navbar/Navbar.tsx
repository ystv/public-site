import styles from "./Navbar.module.css";
import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import ystv_colour from "../../public/ystv_colour.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <div
        className={`${styles.menuFixedBar} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.menuWidthLimiter}>
          <div className={styles.menuContents}>
            <Logo setMenuOpen={setMenuOpen} />
            <SearchBar />
            <div className={styles.spacer} />
            <MenuIconButton
              onClick={(e) => {
                setMenuOpen(!menuOpen);
              }}
            />
          </div>
          <div className={styles.spacer} />
          <MenuList setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}

const MenuIconButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className={`${styles.hamburgerToggleArea} ${styles.toggle}`}
  >
    <Image
      className={`${styles.iconOpacity}`}
      src="/icons/menu-24px.svg"
      alt="Menu Toggle"
      draggable="false"
      unoptimized
      width={25}
      height={25}
    />
  </div>
);

const NextLinkMenuCloser = ({ setMenuOpen, link, text }) => (
  (<Link
    href={link}
    onClick={(event) => {
      setMenuOpen(false);
    }}>

    {text}

  </Link>)
);

const MenuList = ({ setMenuOpen }) => (
  <>
    <ul className={styles.menuList}>
      <NextLinkMenuCloser
        setMenuOpen={setMenuOpen}
        link="/watch"
        text="Watch"
      />
      <NextLinkMenuCloser
        setMenuOpen={setMenuOpen}
        link="/get-involved"
        text="Get Involved"
      />
      <NextLinkMenuCloser
        setMenuOpen={setMenuOpen}
        link="/about"
        text="About"
      />
      <NextLinkMenuCloser
        setMenuOpen={setMenuOpen}
        link="/hires"
        text="Hires"
      />
      <a href={process.env.NEXT_PUBLIC_INTERNAL_SITE}>Login</a>
    </ul>
  </>
);

const Logo = ({ setMenuOpen }) => (
  <div className={styles.noShrink}>
    <Link href="/" passHref>

      <Image
        width="104"
        height="52"
        priority
        placeholder="blur"
        src={ystv_colour}
        alt="YSTV Logo"
        className={styles.logo}
        layout="fixed"
        onClick={(event) => {
          setMenuOpen(false);
        }}
      />

    </Link>
  </div>
);

const SearchBar = () => (
  <form action="/results" className={`${styles.searchForm}`} method="get">
    <input type="text" placeholder="Search our videos..." name="search" />
    <button type="submit">
      <Image
        className={`${styles.iconOpacity} ${styles.toggle}`}
        src="/icons/search-24px.svg"
        alt=""
        unoptimized
        style={{padding:0}}
        height={25}
        width={25}
        draggable="false"
      />
    </button>
  </form>
);
