import dbClient from "../../utils/dbConnector";
import { Window } from "@marvel/ui/ui";
import { Metadata } from "next";
import ProjectCard from "./components/ProjectCard";

export const revalidate = 86400; // once a day

export const metadata: Metadata = {
    title: "Projects from Project Track | UVCE MARVEL",
    description: "UVCE MARVEL's Project Track projects.",
    openGraph: {
        type: "article",
        title: "Projects from Project Track | UVCE MARVEL",
        description: "UVCE MARVEL's Project Track projects.",
        images: [
            {
                url: "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
                secureUrl: "https://res.cloudinary.com/marvelweb/image/upload/v1678988482/Group_38_qrhqag.jpg",
                type: "image/jpeg",
                width: 800,
                height: 800,
            },
        ],
    },
};

const getFeaturedProjects = async () => {
    try {
        const works = await dbClient.work.findMany({
            where: {
                AND: {
                    typeOfWork: "PROJECT",
                }
            },
            select: {
                name: true,
                createdAt: true,
                updatedAt: true,
                note: true,
                id: true,
                totalLevels: true,
                People: {
                    select: {
                        role: true,
                        status: true,
                        person: {
                            select: {
                                name: true,
                                slug: true,
                                profilePic: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                rankingScore: "desc",
            },
            take: 12,
        });
        return works;
    } catch (e) {
        console.error("Failed to fetch featured projects (rankingScore might be missing), falling back to createdAt", e);
        // Fallback if rankingScore doesn't exist
        return await dbClient.work.findMany({
            where: { AND: { typeOfWork: "PROJECT" } },
            select: {
                name: true,
                note: true,
                id: true,
                People: {
                    select: {
                        role: true,
                        person: { select: { name: true, slug: true, profilePic: true } }
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: 12
        });
    }
};

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const featuredProjects = await getFeaturedProjects();

    return (
        <Window className={"pt-5 md:pt-12 pb-40"}>
            <div className="flex flex-col gap-5">
                <div className="w-full max-w-5xl flex flex-col p-5">
                    <h1 className="text-3xl md:text-5xl px-3">
                        <span className="text-p-4 dark:text-p-5">{"Project Track / "}</span>
                        <span className="text-p-0 dark:text-p-9">{"Projects"}</span>
                    </h1>
                    <p className="w-full text-lg py-5 text-p-0 dark:text-p-9 px-3">
                        {"Projects by Students at Marvel - Project Track"}
                    </p>
                </div>

                <div className="w-full mb-10 overflow-hidden">
                    <div className="w-full max-w-[100vw] md:max-w-2xl lg:max-w-6xl mx-auto">
                        <h1
                            id={"tracks"}
                            className="capitalize tracking-widest text-p-0 dark:text-p-5 pb-5 px-5"
                        >
                            {"FEATURED PROJECTS"}
                        </h1>
                        <div className="w-full overflow-x-auto py-4 px-5 scrollbar-hide">
                            <div className="flex gap-5 pb-4 snap-x w-max items-stretch">
                                {featuredProjects.map((project, i) => (
                                    <ProjectCard
                                        key={i}
                                        project={project as any}
                                        hrefClassName="flex flex-col h-auto min-w-[300px] max-w-[300px] snap-center"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <h1
                    id={"tracks"}
                    className="capitalize tracking-widest text-p-0 dark:text-p-5 pb-5 px-5"
                >
                    {"ALL PROJECTS"}
                </h1>
                {children}
            </div>
        </Window>
    );
}
