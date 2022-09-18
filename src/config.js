const ROOT_URL =
    process.env.NODE_ENV === 'production' ? 'https://enigmatic-harbor-26816.herokuapp.com' : 'http://127.0.0.1:3000'
export { ROOT_URL }

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

    ocean: 'bg-blue-400',
    lightgreen: 'bg-green-400',
    lightorange: 'bg-orange-400',
    jadeblue: 'bg-sky-300',
    brown: 'bg-amber-700',
    pink: 'bg-pink-500',
    lightbrown: 'bg-amber-400',
    lightred: 'bg-red-400',
    violet: 'bg-violet-500',
    slate: 'bg-slate-500',
    navy: 'bg-blue-800',
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
