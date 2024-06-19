export interface WorkExperience {
    company: string
    fromDate: Date
    toDate?: Date
    title: string
    roleDescription: string
    isCurrent?: boolean
    logo?: string
}

export interface Education {
    institution: string
    fromDate: Date
    toDate: Date
    program: string
    image?: string
}

export interface Achiemement {
    description: string,
    thumbnail?: string
}

export interface Project {
    title: string
    description: string
    imageUrl: string
}

export interface Contact {
    phone: string
    email: string
    address: string
}


