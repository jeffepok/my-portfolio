import Image from "next/image"
import projectImage from "@/app/assets/images/project1.png"
import { Project } from "@/app/lib/interfaces"

export default function Slide({ project }: { project: Project }) {
    return (
        <div className="max-w-sm mb-10 mx-auto rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className=" h-96 overflow-hidden">
                <img className="w-full h-full object-cover" src={project.imageUrl || ""} alt="Card Image" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="">
                    {project.title}
                </div>
                <div className="px-6 pt-4 pb-2">
                    {
                        project.stack?.map((stack, index) => (<span key={`stack_` + index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{stack}</span>
                        ))
                    }
                </div>


            </div>
        </div>
    )
}