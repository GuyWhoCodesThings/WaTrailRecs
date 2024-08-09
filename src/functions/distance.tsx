import { Hike, HikeComparable } from "../types.tsx/hike"

export const cosineSimilarity = (a: Array<number>, b: Array<number>): number => {

    if (a.length !== b.length) {
        throw new Error('vectors must have same length')
    }
    let total= 0
    let lengthA = 0
    let lengthB = 0

    for(let i = 0; i < a.length; i++) {
        total += a[i] * b[i]
        lengthA += a[i] * a[i]
        lengthB += b[i] * b[i]
    }
    return 1 - total / Math.max(Math.sqrt(lengthA) * Math.sqrt(lengthB), 1e-9)
}

export const l1Distance = (a: Array<number>, b: Array<number>): number => {

    if (a.length !== b.length) {
        throw new Error('vectors must have same length')
    }
    let total= 0

    for(let i = 0; i < a.length; i++) {
        total += Math.abs(a[i] - b[i])
    }
    return total
}

export const l2Distance = (a: Array<number>, b: Array<number>): number => {

    if (a.length !== b.length) {
        throw new Error('vectors must have same length')
    }
    let total= 0

    for(let i = 0; i < a.length; i++) {
        total += (a[i] - b[i]) * (a[i] - b[i])
    }
    return Math.sqrt(total)
}

export const getDistance = (a: Hike, b: Hike, mask: Array<number>): number => {

    if (mask.length !== 4) {
        throw new Error('mask length must be 4')
    }

    const statsDist = l1Distance(a['stats'], b['stats'])
    const imageDist = cosineSimilarity(a['image'], b['image'])
    const featuresDist = l2Distance(a['features'], b['features']) / Math.sqrt(12)
    const descDist = cosineSimilarity(a['description'], b['description'])

    return mask[0] * statsDist + mask[1] * featuresDist + mask[2] * imageDist + mask[3] * descDist

}

export const topK = (a: Hike, results: Array<Hike>, numRes: number, mask: Array<number>, location: string, cb: (res: Array<HikeComparable>) => void): void => {


    const b = location === '' ? results : results.filter((hike) => hike.location.startsWith(location))
    
    let k = numRes
    if (k > results.length - 1) {
        k = results.length
    }

    const topK: Array<HikeComparable> = []

    for (let i = 0; i < k; i++) {
        topK.push({hike: b[i], distance: getDistance(b[i], a, mask)})
    }

    topK.sort((h1: HikeComparable, h2: HikeComparable) => h1.distance - h2.distance)

    for (let i = k; i < b.length; i++) {

        const last: HikeComparable | undefined = topK.pop()
        if (last === undefined) {
            cb(topK)
            return;
        }
        const newDist = getDistance(b[i], a, mask)
        if (newDist < last.distance) {
            topK.push({hike: b[i], distance: newDist})
            topK.sort((h1: HikeComparable, h2: HikeComparable) => h1.distance - h2.distance)
        } else {
            topK.push(last)
        }
    }

    cb(topK)
    
}