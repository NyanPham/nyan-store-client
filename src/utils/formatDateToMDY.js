export default function formatDateToMDY(date) {
    let day = date.getDate()
    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let year = date.getFullYear()

    return `${month}/${day}/${year}`
}
