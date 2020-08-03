function Footer() {
  const current_date = new Date();
  const current_year = current_date.getFullYear();
  let year = "";
  if (current_year > 2020) {
    year = year.concat("-", current_year.toString());
  }

  return (
    <footer>
      <br />
      <small>Website ©2020{year} York Student Television.</small>
      <small>All rights reserved.</small>
    </footer>
  );
}

export default Footer;
