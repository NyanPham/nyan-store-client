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
    gray: 'bg-gray-500',
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

export const productConfig = {
    name: {
        type: 'text',
        required: true,
    },
    vendor: {
        type: 'text',
        required: true,
    },
    price: {
        type: 'number',
        required: false,
    },
    images: {
        type: 'textarea',
        isArray: true,
        required: false,
    },
    description: {
        type: 'textarea',
        required: false,
    },
    summary: {
        type: 'textarea',
        required: true,
    },
    variants: {
        type: 'textarea',
        isArray: true,
        required: true,
    },
    minPrice: {
        type: 'number',
        required: false,
    },
    maxPrice: {
        type: 'number',
        required: false,
    },
    SKU: {
        type: 'text',
        required: true,
    },
    category: {
        type: 'text',
        required: false,
    },
    collections: {
        type: 'textarea',
        required: false,
        isArray: true,
    },
    tags: {
        type: 'textarea',
        isArray: true,
        required: false,
    },
    isAuctioned: {
        type: 'boolean',
        required: false,
    },
    auctionExpiresIn: {
        type: 'date',
        required: false,
    },
    reviews: {
        type: 'text',
        isArray: true,
        required: false,
    },
    ratingsAverage: {
        type: 'number',
        required: false,
    },
    ratingsQuantity: {
        type: 'number',
        required: false,
    },
}

export const variantConfig = {
    name: {
        type: 'text',
        required: true,
    },
    option1: {
        type: 'text',
        required: false,
    },
    option2: {
        type: 'text',
        required: false,
    },
    option3: {
        type: 'text',
        required: false,
    },
    price: {
        type: 'number',
        required: true,
    },
    comparePrice: {
        type: 'number',
        required: false,
    },
    images: {
        type: 'file',
        // isArray: true,
        isMultiple: true,
        required: false,
    },
    inventory: {
        type: 'number',
        required: true,
    },
}

export const orderConfig = {
    total: {
        type: 'number',
        required: true,
    },
    items: {
        type: 'textarea',
        required: false,
        isArray: true,
    },
    user: {
        type: 'text',
        required: false,
    },
    createdAt: {
        type: 'date',
        required: false,
    },
}

export const couponConfig = {
    code: {
        type: 'text',
        required: true,
    },
    percentOff: {
        type: 'number',
        required: false,
    },
    amountOff: {
        type: 'number',
        required: false,
    },
    products: {
        type: 'text',
        required: false,
        isArray: true,
    },
    collections: {
        type: 'text',
        required: false,
        isArray: true,
    },
    expiresIn: {
        type: 'date',
        required: true,
    },
}

export const biddingConfig = {
    product: {
        type: 'text',
        required: true,
    },
    variant: {
        type: 'text',
        required: true,
    },
    user: {
        type: 'text',
        required: true,
    },
    duesIn: {
        type: 'text',
        required: true,
    },
    price: {
        type: 'number',
        required: true,
    },
}

export const categoryConfig = {
    name: {
        type: 'text',
        required: true,
    },
    summary: {
        type: 'text',
        required: true,
    },
}

export const collectionConfig = {
    name: {
        type: 'text',
        required: true,
    },
    summary: {
        type: 'text',
        required: true,
    },
}
