import { achievements, educations, workExperiences } from "@/app/lib/placeholder-data"
import { ListInfo } from "./listInfo"

interface ListCardProps {
    infos?: ListInfo[]
    title: string
}

export default function ListCard(props: ListCardProps) {
    return (
        <div className="bg-gray-900 border-t-2 border-t-green-400 px-10 py-5">
            <div className="flow-root">
                <p className="text-left text-xl">{props.title}</p>
                <ul className=" dark:divide-gray-700">
                    {
                        props.title === "Work Experience" ? workExperiences.sort((a, b) => (a.fromDate > b.fromDate ? - 1 : 1)).map(we => (
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={we.logo || 'https://avatars.githubusercontent.com/u/56881629?s=40&v=4'} alt="" />
                                    </div>
                                    <div className="">
                                        <p className="ml-5 text-left font-medium dark:text-white">
                                            {we.company} • {we.fromDate.getFullYear()} - {we.toDate ? we.toDate.getFullYear() : 'now'}
                                        </p>
                                        <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                            {we.title}
                                        </p>
                                    </div>

                                </div>
                            </li>
                        )) : props.title === "Education" ?
                            educations.sort().map(e => (
                                <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={e.image || 'https://avatars.githubusercontent.com/u/56881629?s=40&v=4'} alt="" />
                                    </div>
                                    <div className="">
                                        <p className="ml-5 text-left font-medium dark:text-white">
                                            {e.institution} • {e.fromDate.getFullYear()} - {e.toDate.getFullYear()}
                                        </p>
                                        <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                            {e.program}
                                        </p>
                                    </div>

                                </div>
                            </li>
                            ))
                            : achievements.map(achievement => (
                                <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={achievement.thumbnail || 'https://avatars.githubusercontent.com/u/56881629?s=40&v=4'} alt="" />
                                    </div>
                                    <div className="">
                                        <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                            {achievement.description}
                                        </p>
                                    </div>

                                </div>
                            </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}