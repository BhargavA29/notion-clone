"use client"

import { useConvexAuth } from "convex/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !hasRedirected.current) {
            hasRedirected.current = true;
            router.push("/");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return <div className="h-full flex items-center justify-center"><Spinner size="lg" /></div>;
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}

export default MainLayout;