import { Heading } from "./_components/Heading";
import HeroImage from "./_components/HeroImage";
import LandingPageLayout from "./_components/Layout";


const LandingPage = () => {
    return (
        <LandingPageLayout>
            <div className=" flex flex-col">
                <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-8 flex-1 px-6 pb-1">
                    <Heading />
                    <HeroImage />
                </div>
            </div>
        </LandingPageLayout>
    );
}

export default LandingPage;