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
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/56881629?s=40&v=4" alt="" />
                            </div>
                            <div className="">
                                <p className="ml-5 text-left font-medium dark:text-white">
                                    Maatech Systems • 2020 - 2021
                                </p>
                                <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                    This is a very long description about Jefferson Tuffour Addai - Poku
                                </p>
                            </div>
                            
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/56881629?s=40&v=4" alt="" />
                            </div>
                            <div className="">
                                <p className="ml-5 text-xl text-left font-medium dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                    This is a very long description about Jefferson Tuffour Addai - Poku
                                </p>
                            </div>
                            
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/56881629?s=40&v=4" alt="" />
                            </div>
                            <div className="">
                                <p className="ml-5 text-xl text-left font-medium dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm ml-5 text-left text-gray-400 dark:text-gray-400">
                                    This is a very long description about Jefferson Tuffour Addai - Poku
                                </p>
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}