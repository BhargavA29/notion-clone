"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModel = () => {
    const params = useParams();
    const update = useMutation(api.documents.update);
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            let res;

            if (coverImage.url) {
                res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url,
                    }
                });
            } else {
                res = await edgestore.publicFiles.upload({
                    file
                });
            }

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });

            onClose();
        }
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <div>
                    <SingleImageDropzone
                        className="w-full outline-none"
                        disabled={isSubmitting}
                        value={file}
                        onChange={onChange}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
