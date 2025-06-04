// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { b } from "../../baml_client";
import type { Tour } from "../../baml_client/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tour & { error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      tourName: "",
      tourDate: "",
      expectedAttendees: 0,
      actualAttendees: 0,
      walkups: 0,
      waitlist: 0,
      donations: 0,
      error: "Method not allowed",
    });
  }

  try {
    const { plain } = req.body;

    if (!plain) {
      return res.status(400).json({
        tourName: "",
        tourDate: "",
        expectedAttendees: 0,
        actualAttendees: 0,
        walkups: 0,
        waitlist: 0,
        donations: 0,
        error: "Tour information is required",
      });
    }

    const tour = await b.ExtractTourInfo(plain);

    res.status(200).json(tour);
  } catch (error) {
    console.error("Error processing tour information:", error);
    return res.status(500).json({
      tourName: "",
      tourDate: "",
      expectedAttendees: 0,
      actualAttendees: 0,
      walkups: 0,
      waitlist: 0,
      donations: 0,
      error: "An error occurred while processing the tour information",
    });
  }
}
