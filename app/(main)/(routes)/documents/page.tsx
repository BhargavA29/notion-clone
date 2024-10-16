"use client"

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
const DocumentsPage = () => {
    const { user } = useUser();

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                alt="Empty"
                width={300}
                height={300}
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                alt="Empty"
                width={300}
                height={300}
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName ? `${user.firstName}'s` : 'your'} Notion
            </h2>
            <Button>
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    );
}

export default DocumentsPage;
