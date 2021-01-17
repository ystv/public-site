import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ status: "ok!" });
};
