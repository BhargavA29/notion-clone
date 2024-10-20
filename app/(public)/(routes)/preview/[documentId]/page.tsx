// app/(public)/(routes)/preview/[documentId]/page.tsx

"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/app/error";


interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
};

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []); // Disable server-side rendering for the editor ( Recommended by BlockNote Documentation)

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content,
        });
    };

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="min-h-screen md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-14 w-[80%]" />
                        <Skeleton className="h-14 w-[40%]" />
                        <Skeleton className="h-14 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null || !document.isPublished) {
        return (
            <div className="min-h-screen items-center justify-center bg-[#1f1f1f]">
                <Error />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-40">
            <Cover preview url={document.coverImage} coverPosition={document.coverPosition} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor
                    editable={false}
                    initialContent={document.content}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default DocumentIdPage;
