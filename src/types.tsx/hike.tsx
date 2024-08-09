export type Hike = {
    name: string, 
    location: string,
    url: string,
    imageSrc: string,
    image: Array<number>,
    stats: Array<number>,
    features: Array<number>,
    description: Array<number>
}

export type HikeComparable = {
    hike: Hike,
    distance: number
}