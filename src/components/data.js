import headPhoneImage from '../imgs/headphone.jpg'
import laptopImage from '../imgs/laptop.jpg'
import phoneImage from '../imgs/phone.jpg'
// import slideImage1 from '../imgs/man-street-style.png'
import jewelry1 from '../imgs/jw1.jpg'
import jewelry2 from '../imgs/jw2.jpg'
import jewelry3 from '../imgs/jw3.jpg'
import sneaker1 from '../imgs/sneaker1.jpg'
import smartWatch from '../imgs/smart-watch.jpg'
import furniture1 from '../imgs/furniture1.jpg'
import furniture2 from '../imgs/furniture2.jpg'
import beauty1 from '../imgs/beauty1.jpg'
import beauty2 from '../imgs/beauty2.jpg'
import men1 from '../imgs/men1.jpg'
import men2 from '../imgs/men2.jpg'
import men3 from '../imgs/men3.jpg'
import canon1 from '../imgs/canon1.jpg'
import canon2 from '../imgs/canon2.jpg'
import canon3 from '../imgs/canon3.jpg'
import handsome from '../imgs/handsome.jpg'
import shoes from '../imgs/shoes.jpg'
import look from '../imgs/look.jpg'

export const cart_configures = {
    freeShippingThreshold: 850,
}

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
        image: handsome,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-3xl lg:text-5xl text-slate-700 font-semibold w-2/3 lg:w-96',
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
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide  text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: shoes,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-3xl lg:text-5xl text-slate-200 font-semibold w-2/3 lg:w-96',
        },
        subtitle: {
            text: 'Hoodie',
            styles: 'text-xl text-slate-200 font-medium uppercase mt-3',
        },
        text1: {
            text: 'Best',
            styles: 'text-lg text-slate-200 font-medium block mt-1',
        },
        text2: {
            text: 'Deal',
            styles: 'text-lg text-cyan-400 font-medium uppercase block leading-4',
        },
        button: {
            text: 'Learn More',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-medium tracking-wide text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: look,
        imageStyles: 'mx-auto',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-3xl lg:text-5xl text-slate-700 font-semibold w-2/3 lg:w-96',
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
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide  text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
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
            styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold w-72',
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
            styles: 'block bg-cyan-400 uppercase font-semibold tracking-wider text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: phoneImage,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Express Yourself Instyle',
            styles: 'text-3xl lg:text-4xl text-slate-300 font-semibold w-72',
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
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wider text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: laptopImage,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-20',
        title: {
            text: 'Beats Auto Dr.Dre',
            styles: 'text-3xl lg:text-4xl text-slate-200 font-semibold w-72',
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
            styles: 'block bg-cyan-400 uppercase font-semibold tracking-wider text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const auctionSlides = [
    {
        image: jewelry1,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Pearl Pendant',
            styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold w-72',
        },

        expiresTime: {
            label: {
                text: 'Time left:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            timeLeft: {
                date: new Date('2022-08-31'),
                styles: 'text-lg text-amber-400 font-semibold',
            },
        },
        currentBid: {
            label: {
                text: 'Current Bid:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            value: {
                text: '$3600',
                styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold',
            },
        },
        button: {
            text: 'Bid Now',
            link: '/',
            styles: 'block bg-cyan-400 uppercase font-medium tracking-wider text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: jewelry2,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Necklace Saphire',
            styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold w-72',
        },

        expiresTime: {
            label: {
                text: 'Time left:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            timeLeft: {
                date: new Date('2022-08-31'),
                styles: 'text-lg text-amber-400 font-semibold',
            },
        },
        currentBid: {
            label: {
                text: 'Current Bid:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            value: {
                text: '$3550',
                styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold',
            },
        },
        button: {
            text: 'Bid Now',
            link: '/',
            styles: 'block bg-cyan-400 uppercase font-medium tracking-wider text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: jewelry3,
        imageStyles: 'mx-auto object-cover object-center h-full w-full',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Necklace Saphire',
            styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold w-72',
        },

        expiresTime: {
            label: {
                text: 'Time left:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            timeLeft: {
                date: new Date('2022-08-31'),
                styles: 'text-lg text-amber-400 font-semibold',
            },
        },
        currentBid: {
            label: {
                text: 'Current Bid:',
                styles: 'text-sm text-slate-700 font-semibold',
            },
            value: {
                text: '$3550',
                styles: 'text-3xl lg:text-4xl text-slate-700 font-semibold',
            },
        },
        button: {
            text: 'Bid Now',
            link: '/',
            styles: 'block bg-cyan-400 uppercase font-medium text-white text-base py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const sportSlides = [
    {
        image: sneaker1,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 right-5 md:top-10 md:right-12',
        title: {
            text: 'Nike Running \n Just do it',
            styles: 'text-4xl lg:text-5xl text-slate-700 font-semibold w-2/3 ml-auto lg:w-96 text-right',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block text-right w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'flex max-w-max ml-auto mr-unset bg-cyan-400 uppercase font-semibold text-white tracking-wide text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: smartWatch,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 right-5 md:top-10 md:right-12',
        title: {
            text: 'Nike Running \n Just do it',
            styles: 'text-4xl lg:text-5xl text-slate-700 font-semibold w-2/3 lg:w-96 ml-auto text-right',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block text-right w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'flex max-w-max ml-auto mr-unset bg-cyan-400 uppercase font-semibold text-white tracking-wide text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const furnitureSlides = [
    {
        image: furniture1,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Living Room \n The Single Sofa',
            styles: 'text-4xl lg:text-5xl text-slate-900 font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-slate-800 inline-block w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide  text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: furniture2,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 right-5 md:top-10 md:right-12',
        title: {
            text: 'Living Room \n The Single Sofa',
            styles: 'text-4xl lg:text-5xl text-slate-100 font-semibold w-2/3 lg:w-96 lg-auto text-right',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block text-right w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'flex max-w-max ml-auto mr-unset bg-cyan-400 uppercase font-semibold tracking-wide  text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const womenSlides = [
    {
        image: beauty1,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: '2019 Summer\nWomen Collection',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: beauty2,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 right-5 md:top-10 md:right-12',
        title: {
            text: '2019 Summer\nWomen Collection',
            styles: 'text-4xl lg:text-5xl text-slate-100 font-semibold w-2/3 lg:w-96 ml-auto text-right',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block text-right w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'flex max-w-max ml-auto mr-unset bg-cyan-400 uppercase font-semibold tracking-wide  text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const menSlides = [
    {
        image: men1,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Jeans Men \nCollection',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: men2,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Jeans Men \nCollection',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
    {
        image: men3,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-10 md:left-12',
        title: {
            text: 'Jeans Men \nCollection',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
        button: {
            text: 'Buy Now',
            link: '/',
            styles: 'bg-cyan-400 uppercase font-semibold tracking-wide text-white text-md py-1 px-5 rounded-lg block mt-5 hover:bg-slate-700 hover:text-cyan-400 duration-200 transition',
        },
    },
]

export const photographySlides = [
    {
        image: canon1,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-7 md:left-7',
        title: {
            text: 'DSRL Nikon 5RX',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
    },
    {
        image: canon2,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-7 md:left-7',
        title: {
            text: 'DSRL Nikon III',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
    },
    {
        image: canon3,
        imageStyles: 'mx-auto h-full w-full object-cover object-center',
        contentStyles: 'top-5 left-5 md:top-7 md:left-7',
        title: {
            text: 'Nikon 7D',
            styles: 'text-4xl lg:text-5xl text-white font-semibold w-2/3 lg:w-96',
        },
        price: {
            text: '$178',
            styles: 'text-2xl font-bold text-cyan-400 inline-block w-full',
        },
    },
]
