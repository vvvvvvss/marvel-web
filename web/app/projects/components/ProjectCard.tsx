"use client";

import { Avatar, Paper } from "@marvel/ui/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Person {
    role: string;
    person: {
        name: string;
        slug: string;
        profilePic: string;
    };
}

interface Project {
    id: string;
    name: string;
    note: string;
    People: Person[];
}

export default function ProjectCard({ project, hrefClassName = "" }: { project: Project, hrefClassName?: string }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/work/${project?.id}`)}
            className={hrefClassName}
        >
            <Paper
                border
                elevateOnHover
                className="w-full flex flex-col h-full dark:bg-p-1 cursor-pointer"
            >
                <div className="p-5">
                    <h1 className="text-2xl line-clamp-2">{project?.name}</h1>
                    <p className="text-p-2 dark:text-p-8 mt-2 line-clamp-3 text-sm">{project?.note}</p>
                </div>
                <div className="mt-auto border-t-[1.5px] border-p-0 dark:border-p-6">
                    {[...(project?.People || [])].sort((a, b) => {
                        if (a?.role === "AUTHOR" && b?.role !== "AUTHOR") return -1;
                        if (a?.role !== "AUTHOR" && b?.role === "AUTHOR") return 1;
                        return (a?.person?.name || "").localeCompare(b?.person?.name || "");
                    }).map((p, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-5 py-3 border-b-[1.5px] border-p-0 dark:border-p-6 last:border-b-0"
                        >
                            <Link
                                href={`/u/${p?.person?.slug}`}
                                className="flex gap-3 items-center text-sm shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Avatar
                                    size="small"
                                    className="shrink-0 min-w-[2rem]"
                                    alt={p?.person?.name}
                                    src={p?.person?.profilePic}
                                />
                                <span className="truncate max-w-[150px] mr-2">{p?.person?.name}</span>
                            </Link>
                            <span className="text-xs text-p-4 dark:text-p-5 uppercase tracking-wide shrink-0">
                                {p?.role}
                            </span>
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
}
