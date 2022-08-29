import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { faBriefcase, faHatCowboy, faGlasses, faClock, faShirt, faSocks } from '@fortawesome/free-solid-svg-icons'

const navObjArray = [
    {
        navName: 'Bags',
        icon: faBriefcase,
    },
    {
        navName: 'Hats',
        icon: faHatCowboy,
    },
    {
        navName: 'Sunglasses',
        icon: faGlasses,
    },
    {
        navName: 'Watches',
        icon: faClock,
    },
    {
        navName: 'Shirts',
        icon: faShirt,
    },
    {
        navName: 'Footwear',
        icon: faSocks,
    },
]

function SideNavigation({ title, isDrawer }) {
    return (
        <div
            className={`${
                isDrawer ? 'bg-white h-full' : 'hidden lg:block'
            }  w-64 border border-slate-200 rounded-lg py-2 px-4 shrink-0 self-start`}
        >
            <h2 className="font-semibold text-2xl text-cyan-400">{title}</h2>
            <div className="flex flex-col justify-center items-start gap-1 mt-3">
                {navObjArray.map((obj, index) => {
                    return (
                        <Link
                            to={`/categories/${obj.navName}`}
                            className={`p-3 flex justify-between items-center w-full group ${
                                index === navObjArray.length - 1 ? '' : ' border-b border-slate-900/10'
                            }`}
                            key={`navigation_${index}_${Date.now()}`}
                        >
                            <div className="flex items-center justify-start gap-3">
                                <FontAwesomeIcon
                                    className="w-4 h-4 inline-block text-cyan-400 group-hover:animate-shake"
                                    icon={obj.icon}
                                />
                                <h4 className="text-slate-700 font-medium text-base">{obj.navName}</h4>
                            </div>
                            <FontAwesomeIcon
                                className="text-xs text-slate-400 group-hover:translate-x-0.5 transform transition duration-200"
                                icon={faAngleRight}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default SideNavigation
