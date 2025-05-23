import YSTVHead from "../components/YstvHead";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="center thin">
      <YSTVHead />
      <h1>Disclaimer/Copyright</h1>
      <ul>
        <li>
          In addition to this disclaimer, this website is also covered by the
          University of York&apos;s&nbsp;
          <a href="https://www.york.ac.uk/docs/disclaimer/disclaimer.htm">
            standard disclaimer
          </a>
        </li>
        <li>
          The information supplied on this web page has been provided by York
          Student Television (YSTV). It is not information provided by the
          University of York.
        </li>
        <li>
          Neither YSTV or the University of York warrant the accuracy or
          completeness of the information, text, graphics, links or other items
          contained within these materials.
        </li>
        <li>
          YSTV and the University of York shall not be liable for any special,
          indirect, incidental, or consequential damages, including without
          limitation, lost revenues, which may result from the use of these
          materials.
        </li>
        <li>
          The information on this server is subject to change without notice and
          does not represent a commitment on the part of YSTV and/or the
          University of York in the future.
        </li>
        <li>
          All trademarks mentioned herein belong to their respective owners.
        </li>
        <li>
          The contents of this website, including but not limited to text,
          graphics, audio and visual material, as well as video streamed on the
          &apos;Watch&apos; section of this website, is subject to YSTV&apos;s
          standard licence, defined <Link href="/license">here</Link>.
        </li>
        <li>
          Where York Student Television (YSTV) hold personal data about
          individuals, in the form of the membership and authentication
          databases, the data is held securely in accordance with the Data
          Protection Act 1998, following the guidelines of the University of
          York&apos;s{" "}
          <a
            title="Data Protection Policy"
            href="https://www.york.ac.uk/recordsmanagement/dpa/dppolicy2002.htm"
            target="_blank"
            rel="noreferrer"
          >
            Data Protection Policy
          </a>{" "}
          and active York University Student&apos;s Union (York SU) Policy.
        </li>
        <li>
          If you are interested in using the contents of this website in any
          manner except as described above, please contact{" "}
          <a href="mailto:computing@ystv.co.uk">computing</a> for information on
          licensing.
        </li>
      </ul>{" "}
    </div>
  );
}
