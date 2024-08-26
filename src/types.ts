export type Collection = {
    createdAt: Date 
    name: string
    summary: string
    _id: string
}

export type Category = {
    createdAt: Date 
    name: string
    summary: string
    _id: string
}

export type Tag = string

export type ServerResponse = {
    status: number
    data: {
        status: string,
        data: any
    }
}

export type ServerError = {
    response: {
        data: {
            message: string
        }
    }
}

export type Variant = {
    _id: string
    name: string
    price: number
    comparePrice: number
    images: string[]
    inventory: number
    option1: string
    option2: string
    option3: string
}

export type Product = {
    _id: string
    id: string
    name: string
    slug: string
    summary: string
    description: string
    category: Category
    collections: string[]
    tags: Tag[]
    SKU: string
    createdAt: Date
    images: string[]
    maxPrice: number
    minPrice: number
    ratingsAverage: number
    ratingsQuantity: number
    variants: Variant[]
    vendor: string
    isAuctioned: boolean
    auctionExpiresIn?: Date
}

export type User = {
    email: string
    name: string
    photo: string
    role: 'user' | 'admin'
} | null
