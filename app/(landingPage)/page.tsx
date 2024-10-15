import { Heading } from "./_components/Heading";
import HeroImage from "./_components/HeroImage";
import Footer from "./_components/Footer";
import LandingPageLayout from "./_components/Layout";


const LandingPage = () => {
    return (
        <LandingPageLayout>
            <div className="min-h-full flex flex-col">
                <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-1">
                    <Heading />
                    <HeroImage />
                </div>
                <Footer />
            </div>
        </LandingPageLayout>
    );
}

export default LandingPage;