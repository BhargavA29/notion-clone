"use client"

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Title } from "./Title";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });

    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-1.5 w-full flex items-center justify-between">
                <Title.Skeleton />
            </nav>
        );
    }
    if (document === null) {
        return (
            <p>Document not found</p>
        );
    }
    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        onClick={onResetWidth}
                        role="button"
                        className="w-6 h-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document} />


                </div>
            </nav>
        </>
    );
}

export default Navbar;