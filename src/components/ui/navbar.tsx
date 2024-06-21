"use client"

import React, { Fragment } from "react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { BsChevronDown, BsHouseFill, BsGithub, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs"
import Typist from "react-typist"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menus = [
    {
        "label": "About me",
        "path": "/about"
    },
    {
        "label": "Home",
        "path": "/"
    },
    {
        "label": "Contact",
        "path": "/contact"
    },
    {
        "label": "Blog",
        "path": "/blog"
    }
]
function Navbar() {
    let currentPage = usePathname()
    for(let menu of menus){
        if (currentPage.includes(menu.path) && menu.path != "/"){
            currentPage = menu.path
        }
    }

    return (
        <div className="mb-11">
            <nav
                className="z-20 sticky top-0 px-2 grid grid-cols-2 md:grid-cols-3 items-center bg-gray-300 mb-3">
                <div className="flex">
                    <div
                        className="rounded-t-md relative bg-white mt-1 pl-3 pr-14">
                        <div
                            className={"group flex rounded-md items-center text-sm leading-relaxed py-1 text-black"}
                            style={{ fontFamily: "Arial" }}>
                            <BsHouseFill className="mr-2" />
                            {currentPage}
                        </div>
                    </div>
                    <Menu as="div" className="relative text-left mx-2 hover:bg-gray-200 rounded-tl-md mt-1 px-2">
                        <div className="inline-flex ">
                            <MenuButton
                                className="relative group flex rounded-md items-center text-sm py-1 text-black">
                                <BsChevronDown
                                    className="w-4 h-5 mx-1 text-dark"
                                    aria-hidden="true"
                                />
                            </MenuButton>

                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition-all duration-300 ease-out -z-10"
                            enterFrom="-translate-y-full"
                            enterTo="translate-y-px"
                            leave="transition-opacity duration-100"
                            leaveFrom="opacity-1"
                            leaveTo="opacity-0"
                        >
                            <MenuItems className="absolute bg-white w-28 rounded-md mt-2">
                                {
                                    menus.map((menu, index) => {
                                        return menu.path !== currentPage && <MenuItem key={index}>
                                            <a href={menu.path} className="data-[focus]:bg-gray-300 block w-full px-2 pt-1 my-1">
                                                {menu.label}
                                            </a>
                                        </MenuItem>
                                    }
                                    )
                                }
                            </MenuItems>

                        </Transition>
                    </Menu>

                </div>
                <div className="hidden md:block">
                    <Link href="/">Software Engineer</Link>
                </div>
                <div className="flex flex-row-reverse">
                    <a className="self-center mr-2" href="https://github.com/jeffepok" rel="noreferrer" target="_blank"><BsGithub /></a>
                    <a className="self-center mr-2" href="https://twitter.com/Tee4Jey" rel="noreferrer" target="_blank"><BsTwitter /></a>
                    <a className="self-center mr-2" href="https://www.linkedin.com/in/jefferson-tuffour-addai-poku-a49081193/" rel="noreferrer" target="_blank"><BsLinkedin /></a>
                </div>
            </nav>
            <div className="text-white">
                <div className="mt-5 text-gray-300">
                    JEFFERSON TUFFOUR
                </div>
            </div>
        </div>
    )
}

export default Navbar
