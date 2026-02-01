"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { TextField } from "../../../ui/Inputs/TextField";
import { IconButton } from "../../../ui/Buttons";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams?.get("q")?.toString() || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams?.toString());
        if (params.has("page")) {
            params.set("page", "1");
        }
        if (searchTerm) {
            params.set("q", searchTerm);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center">
            <TextField
                fullWidth
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
                aria-label="Search projects"
            />
            <IconButton
                size="large"
                type="submit"
                variant="outlined"
                aria-label="Submit Search"
            >
                <BiSearch />
            </IconButton>
        </form>
    );
}
