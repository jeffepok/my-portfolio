import BoyImage from "@/app/assets/images/boy.png"
// Import Swiper React components
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image"


import ListCard from "@/components/ui/cards/listCard"
import Slide from "@/components/ui/cards/slide"
import MultiItemCarousel from "@/components/ui/cards/slider";

// import required modules

export default function About() {
    // Create array with 1000 slides
    const slides = Array.from({ length: 10 }).map(
        (el, index) => `Slide ${index + 1}`
    )

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"> </span>'
        },
    };
    return (
        <>
            <main className="text-white container mx-auto px-16 xl:px-32 mt-28">
                <div className="grid grid-cols-1 gap-4">
                    <p className="text-4xl">Explore My Profile</p>
                    <p className="mt-2 text-green-400 text-xl">I live in Takoradi - Ghana and work for Amalitech</p>
                </div>
                <div className="mt-14 mb-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ListCard title="Work Experience" />
                    <ListCard title="Achievements" />
                    <ListCard title="Education" />
                </div>
                <div className="grid mt-32 mb-10 pb-6 grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-xl text-left">
                            <p className="text-green-400">Personal Life</p>
                            <p className="pt-3">Getting to know me</p>
                            <p className="text-sm pt-7">
                                I grew up in a little valley in the South of Switzerland—home of the
                                Matterhorn—with my grandparents. They unwillingly fostered my interest in technology by letting me break apart VCRs, TVs, computers and more. Ever since then, I wanted to become an IT-Specialist.
                            </p>
                            <p className="text-sm pt-7 text-gray-400">
                                This passion drove me to start a new life in Vancouver, master english and work in various IT related fields. Once back in Switzerland, my career as a web developer began.                        </p>
                        </div>
                    </div>
                    <div className="w-96 mr-0 ml-auto justify-end">
                        <Image src={BoyImage} alt="boy"></Image>
                    </div>
                </div>
            </main>
            <div className="grid pt-12 text-white relative pb-28 bg-[#131d27] grid-cols-1 gap-4">
                <p className="text-4xl">Projects I’ve worked on</p>
                <p className="mt-2 text-green-400 text-xl">I live in Takoradi - Ghana and work for Amalitech</p>
                <div className="lg:mx-32">
                    <MultiItemCarousel/>
                </div>

            </div>


        </>
    )
}