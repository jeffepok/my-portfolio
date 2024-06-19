import BoyImage from "@/app/assets/images/boy.png"
// Import Swiper React components
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image"


import ListCard from "@/components/ui/cards/listCard"
import Slide from "@/components/ui/cards/slide"
import MultiItemCarousel from "@/components/ui/cards/slider";
import { aboutMe } from "../lib/placeholder-data";

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
                    <p className="mt-2 text-green-400 text-xl">I live in Kumasi - Ghana and work for Overloop LTD.</p>
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
                                {aboutMe}
                            </p>
                            <p className="text-sm pt-7 text-gray-400">
                            This passion drove me to start self studies and bootcamps, after I graduated with first class and eventually established my career in Tech.
                            </p>
                        </div>
                    </div>
                    <div className="w-96 mr-0 ml-auto justify-end">
                        <img className="w-100 h-100" src="/images/boy_education.png"/>
                    </div>
                </div>
                <div className="grid mt-32 mb-10 pb-6 grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-96 justify-end">
                        <img className="w-100 h-100" src="/images/boy_professional.png" alt="boy"/>
                    </div>
                    <div>
                        <div className="text-xl text-left">
                            <p className="text-green-400">Professional Life</p>
                            <p className="pt-3">Building my tech stack</p>
                            <p className="text-sm pt-7">
                            My apprenticeship, the experience abroad and several side-jobs enabled me to have an in-depth understanding of how a business works. I’m known to possess a unique problem-solving abilities and work in a well structured manner. My mantra is `Every problem has a solution.`
                            </p>
                            <p className="text-sm pt-7 text-gray-400">
                            During my professional career I had the opportunity to work with Python, Nodejs, Java, Go lang, and various front-end technologies. These days I consider myself as a full-stack developer but my roots lie in the back-end.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <div className="grid pt-12 text-white relative pb-28 bg-[#131d27] grid-cols-1 gap-4">
                <p className="text-4xl">Projects I’ve worked on</p>
                <p className="mt-2 text-green-400 text-xl">I have been featured on diverse projects by different companies.</p>
                <div className="lg:mx-32">
                    <MultiItemCarousel/>
                </div>
            </div>


        </>
    )
}