import headPhoneImage from '../imgs/headphone.jpg'
import laptopImage from '../imgs/laptop.jpg'
import phoneImage from '../imgs/phone.jpg'
import slideImage1 from '../imgs/man-street-style.png'

export const COLOR_MAP = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    black: 'bg-gray-900',
    white: 'bg-white',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
}

export const OPTION_TYPES_MAP = {
    color: [
        'green',
        'red',
        'black',
        'white',
        'purple',
        'blue',
        'cyan',
        'yellow',
        'gray',
        'slate',
        'pink',
        'orange',
        'sky',
    ],
    size: ['XXS', 'XS', 'SM', 'M', 'L', 'XXL', 'XXXl'],
    material: ['rubber', 'fabric', 'fiber'],
}

export const heroSlides = [
    {
        image: slideImage1,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-5xl text-slate-700 font-semibold w-96',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-700 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-700 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: slideImage1,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-5xl text-slate-700 font-semibold w-96',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-700 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-700 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const slidesWPreview = [
    {
        image: headPhoneImage,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Beats Auto Dr.Dre',
            styles: 'text-4xl text-slate-700 font-semibold w-72',
        },
        comparePrice: {
            text: '$398',
            styles: 'relative text-lg font-medium text-amber-400 inline-block mr-2 after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:bg-amber-400 after:w-full after:h-0.5 after:rotate-30',
        },
        price: {
            text: '$176',
            styles: 'text-2xl font-bold text-slate-700 inline-block',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'block bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: phoneImage,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-4xl text-slate-300 font-semibold w-72',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-300 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-300 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: laptopImage,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Beats Auto Dr.Dre',
            styles: 'text-4xl text-slate-200 font-semibold w-72',
        },
        comparePrice: {
            text: '$398',
            styles: 'relative text-lg font-medium text-amber-400 inline-block mr-2 after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0 after:bg-amber-400 after:w-full after:h-0.5 after:rotate-30',
        },
        price: {
            text: '$176',
            styles: 'text-2xl font-bold text-slate-200 inline-block',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'block bg-cyan-400 uppercase font-normal text-white text-lg py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]
