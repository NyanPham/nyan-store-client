export default function getInputInitialValue(type) {
    switch (type) {
        case 'text':
            return ''
        case 'number':
            return 0
        case 'boolean':
            return false
        case 'date':
            return Date.now()
        default:
            return type
    }
}
