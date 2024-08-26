export type InputType = 'text' | 'number' | 'boolean' | 'date';
export type OutputType = string | number | boolean | number

export default function getInputInitialValue(type: InputType): OutputType  {
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

