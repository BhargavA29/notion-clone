import { Navbar } from "./Navbar";
import Footer from "./Footer";

const LandingPageLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col min-h-screen h-screen dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="flex-1 flex items-center pt-40 justify-center overflow-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default LandingPageLayout;
