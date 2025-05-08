import YstvHead from "../components/YstvHead";
import Image from "next/image";
import Licence1 from "../public/site-images/license/by-nc-sa.png";
import Licence2 from "../public/site-images/license/by-nc-nd.png";

export default function License() {
  return (
    <div className="center thin">
      <YstvHead />
      <h1>License</h1>
      <div>
        <Image
          src={Licence1}
          alt=""
          unoptimized
          layout={"responsive"}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <ul>
        <li>
          Any content produced <strong>on or after 1 June 2014</strong> by YSTV
          is made available under the Creative Commons
          &quot;Attribution-NonCommercial-ShareAlike Works&quot; licence,
          version 4.0 (
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
            summary
          </a>
          ,{" "}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode">
            full details
          </a>
          ). This page <strong>must</strong> be read before embarking on any
          re-use of our work.
        </li>
        <li>
          This licence requires that you attribute YSTV as the source of the
          work. Attribution of our work must be as follows:
          <br /> <em>[Show Name]</em> produced by York Student Television
          [https://ystv.co.uk/] released under a Creative Commons BY-NC-SA 4.0
          licence.
        </li>
      </ul>
      <p>&nbsp;</p>
      <p>
        <Image
          src={Licence2}
          alt=""
          unoptimized
          layout={"responsive"}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </p>
      <ul>
        <li>
          Any content produced <strong>prior to 1 June 2014</strong> by YSTV is
          made available under&nbsp;the Creative Commons
          &quot;Attribution-NonCommercial-NoDerivative Works&quot; licence,
          version 2.5 (
          <a href="https://creativecommons.org/licenses/by-nc-nd/2.5/">
            summary
          </a>
          ,&nbsp;
          <a href="https://creativecommons.org/licenses/by-nc-nd/2.5/legalcode">
            full details
          </a>
          ).&nbsp;
        </li>
        <li>
          This licence requires that you re-broadcast our work in full (without
          alteration) and that you attribute YSTV as the source of the work.
          Attribution of our work must be as follows:
          <br />
          <em>[Show Name]</em>&nbsp;produced by York Student Television
          [https://ystv.co.uk/] released under a Creative Commons BY-NC-ND 2.5
          licence.
        </li>
        <li>
          Permission to create derivative works (modifying our original work) is
          not allowed through this licence. Please contact&nbsp;
          <a href="mailto:reuse@ystv.co.uk">reuse at YSTV</a>&nbsp;if you wish
          to use footage licensed under BY-NC-ND in any other way.
        </li>
      </ul>
      <p>&nbsp;</p>
      <p>
        <strong>Applicable to all content:</strong>
      </p>
      <ul>
        <li>
          All works produced by members of York Student Television using the
          station&apos;s equipment remains the property of YSTV. Persons
          involved in producing these works are free to re-use them under the
          applicable licence specified above, however further permissions can be
          granted at the discretion of a station meeting.
        </li>
        <li>
          The easiest way to share our content on a website is to use the embed
          code available on individual video pages.
        </li>
      </ul>
    </div>
  );
}
