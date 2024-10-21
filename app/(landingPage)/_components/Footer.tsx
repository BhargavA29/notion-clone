"use client"

import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <div className="flex w-full p-6  z-50 dark:bg-[#1F1F1F] ">

            <div className="md:ml-auto w-full justify-between flex items-center ">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
}

export default Footer;
