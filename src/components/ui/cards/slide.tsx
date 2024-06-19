import Image from "next/image"
import projectImage from "@/app/assets/images/project1.png"
import { Project } from "@/app/lib/interfaces"

export default function Slide({ project }: { project: Project }) {
    return (
        <div className="max-w-sm h-full flex flex-col space-y-5 max-h-full rounded overflow-hidden shadow-lg w-full bg-[#182533]">
            <img className="w-full" src={project.imageUrl || ""} />
            <div className="">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{project.title}</div>
                    <p className="text-[#94afc7]  text-base">
                        {project.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {
                        project.stack?.map(stack => (<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{stack}</span>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}