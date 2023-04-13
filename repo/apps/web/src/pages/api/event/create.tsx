import { NextApiRequest, NextApiResponse } from "next";
import { SANITIZE_OPTIONS } from "shared-utils";
import sanitize from "sanitize-html";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v2 as cloudinary } from "cloudinary";
import { ScopeEnum } from "database";
import { EventFormData } from "../../../types";

export default async function create_event(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLDNRY_CLOUD_NAME,
      api_key: process.env.CLDNRY_API_KEY,
      api_secret: process.env.CLDNRY_API_SECRET,
      secure: true,
    });

    const session = await getServerSession(req, res, authOptions);
    const formData: EventFormData = req.body;

    const condition = ["ADMIN", "CRDN"].some((s) =>
      session?.user?.scope?.map((s) => s.scope)?.includes(s as ScopeEnum)
    );

    if (!condition) return res.status(403).json({ message: "Access denied" });

    const cleanContent = sanitize(formData.description, SANITIZE_OPTIONS);

    if (
      formData?.eventStartTime > formData?.eventEndTime ||
      formData?.registrationStartTime > formData?.registrationEndTime ||
      formData?.eventStartTime > new Date()
    ) {
      return res.status(400).json({
        message: "Timings aren't right.",
      });
    }

    const createdEvent = await dbClient.event.create({
      data: {
        typeOfEvent: formData?.typeOfEvent,
        title: formData?.title,
        caption: formData?.caption,
        coverPhoto: "",
        description: cleanContent,
        eventStartTime: formData?.eventStartTime,
        eventEndTime: formData?.eventEndTime,
        ...(formData?.requiresRegistration && {
          registrationStartTime: formData?.registrationStartTime,
          registrationEndTime: formData?.registrationEndTime,
        }),
        ...(formData?.requiresActionButton && {
          actionLink: formData?.actionLink,
          actionText: formData?.actionText,
        }),
      },
      select: {
        id: true,
      },
    });

    let coverPhoto: string;
    if (formData?.coverPhoto) {
      coverPhoto = (
        await cloudinary.uploader.upload(formData.coverPhoto as string, {
          public_id: createdEvent?.id,
          folder: "event_covers",
          resource_type: "image",
          overwrite: true,
          secure: true,
        })
      ).secure_url;
      await dbClient.event.update({
        where: {
          id: createdEvent?.id,
        },
        data: {
          coverPhoto: coverPhoto,
        },
      });
    }

    await res.revalidate(`/events`);
    return res.status(201).json({
      message: `event created successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't create event`,
      error: error?.message,
    });
  }
}
