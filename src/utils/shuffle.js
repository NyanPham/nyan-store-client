export default function shuffle(array) {
    const newArray = [...array]
    for (let i = array.length; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * i)
        const oldValue = array[randomIndex]
        array[randomIndex] = array[i]
        array[i] = oldValue
    }
    return newArray
}
