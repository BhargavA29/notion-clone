"use client";

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
    coverPosition?: number;
}

export const Cover = ({ url, preview, coverPosition = 50 }: CoverImageProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(coverPosition);
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
    const updateCoverPosition = useMutation(api.documents.updateCoverPosition);

    useEffect(() => {
        setPosition(coverPosition);
    }, [coverPosition]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!preview) {
            e.preventDefault();
            setIsDragging(true);
        }
    }, [preview]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const container = e.currentTarget;
            const containerRect = container.getBoundingClientRect();
            const newPosition = 100 - ((e.clientY - containerRect.top) / containerRect.height) * 100;
            setPosition(Math.max(0, Math.min(100, newPosition)));
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            updateCoverPosition({
                id: params.documentId as Id<"documents">,
                position: position
            });
        }
    }, [isDragging, position, updateCoverPosition, params.documentId]);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({ url });
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        });
    }

    return (
        <div
            className={cn(
                "relative w-full h-[35vh] group",
                !url && "h-[12vh]",
                url && "bg-muted",
                isDragging && "cursor-row-resize"
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {!!url && (
                <Image
                    src={url}
                    alt="Cover"
                    fill
                    className="object-cover"
                    style={{ objectPosition: `center ${position}%` }}
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[20vh]" />
    )
}