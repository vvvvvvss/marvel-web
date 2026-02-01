import dbClient from "../../utils/dbConnector";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import ProjectCard from "./components/ProjectCard";

import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

const getProjectsListRaw = async (page = 1, query = "") => {
    console.log("get projects list raw query: ", query);
    const limit = 12; // Items per page
    const skip = (page - 1) * limit;

    const whereClause: any = {
        typeOfWork: "PROJECT",
    };

    if (query) {
        whereClause.OR = [
            { name: { contains: query, mode: "insensitive" } },
            { note: { contains: query, mode: "insensitive" } },
        ];
    }

    const [works, total] = await Promise.all([
        dbClient.work.findMany({
            where: whereClause,
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
                updatedAt: "desc",
            },
            skip,
            take: limit,
        }),
        dbClient.work.count({
            where: whereClause,
        })
    ]);

    return { works, total, totalPages: Math.ceil(total / limit) };
};

const getProjectsList = async (page: number, query: string) => {
    if (!query) {
        return await unstable_cache(
            async () => getProjectsListRaw(page, query),
            [`projects-list-${page}`],
            { revalidate: 86400, tags: ["projects"] }
        )();
    }
    return await getProjectsListRaw(page, query);
};

export default async function page({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
    const { page, q } = await searchParams;
    const currentPage = Number(page) || 1;
    const query = q || "";

    const { works: projects, totalPages } = await getProjectsList(currentPage, query);

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full px-5 flex justify-center md:justify-end">
                <SearchBar />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 z-10 mx-auto">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project as any}
                        hrefClassName="flex flex-col h-full"
                    />
                ))}
                {projects.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-p-4">
                        No projects found.
                    </div>
                )}
            </div>

            <div className="w-full flex justify-center mt-10 gap-4 text-sm font-medium">
                {currentPage > 1 && (
                    <Link
                        href={`/projects?page=${currentPage - 1}${query ? `&q=${query}` : ""}`}
                        className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-p-2 dark:border-p-6 transition-colors"
                    >
                        Previous
                    </Link>
                )}
                <span className="px-4 py-2 text-p-5">
                    Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                    <Link
                        href={`/projects?page=${currentPage + 1}${query ? `&q=${query}` : ""}`}
                        className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-p-2 dark:border-p-6 transition-colors"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
