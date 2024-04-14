import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/dbConnector";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Role, Status } from "@prisma/client";

type Args = {
  action: "add-person" | "remove-person" | "change-status";
  personId: string;
  status: Status;
  role: Role;
};

export default async function level_report_action(
  req: NextApiRequest & { url: string },
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const args: Args = req?.body;

    const work = await dbClient.work.findUnique({
      where: {
        id: req.query?.workId as string,
      },
      select: {
        id: true,
        typeOfWork: true,
        People: {
          where: {
            AND: [{ status: "ACTIVE" }, { role: "COORDINATOR" }],
          },
          select: {
            personId: true,
            role: true,
            status: true,
          },
        },
      },
    });

    const person = await dbClient.people.findUnique({
      where: {
        id: args?.personId,
      },
      select: {
        slug: true,
      },
    });

    const condition =
      //work is project and session user is one of the coordinators
      (work?.typeOfWork === "PROJECT" &&
        work?.People.map((p) => p?.personId).includes(
          session?.user?.id as string
        )) ||
      //work is coursework and session user is a coordinator
      (work?.typeOfWork === "COURSE" &&
        session?.user?.scope?.map((s) => s.scope).includes("CRDN")) ||
      //session user is an admin
      session?.user?.scope?.map((s) => s.scope)?.includes("ADMIN");
    if (!condition) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (args?.action === "add-person") {
      await dbClient.work.update({
        where: {
          id: work?.id,
        },
        data: {
          People: {
            create: {
              person: {
                connect: {
                  id: args?.personId,
                },
              },
              role: args?.role,
            },
          },
        },
      });
    } else if (args?.action === "remove-person") {
      await dbClient.work.update({
        where: {
          id: work?.id,
        },
        data: {
          People: {
            delete: {
              personId_workId: {
                personId: args?.personId,
                workId: work?.id as string,
              },
            },
          },
        },
      });
    } else if (args?.action === "change-status") {
      await dbClient.work.update({
        where: {
          id: work?.id,
        },
        data: {
          People: {
            update: {
              where: {
                personId_workId: {
                  personId: args?.personId,
                  workId: work?.id as string,
                },
              },
              data: {
                status: args?.status,
              },
            },
          },
        },
      });
    }
    //revalidate the page
    await res.revalidate(`/work/${work?.id}`);
    if (args?.action === "add-person" || args?.action === "remove-person") {
      await res.revalidate(`/u/${person?.slug}/works`);
    }

    return res.status(201).json({
      message: `updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Couldn't update`,
      error: error?.message,
    });
  }
}
