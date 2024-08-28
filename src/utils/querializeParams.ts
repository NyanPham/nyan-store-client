export default function querializeParams(params : { [key in string]: any }) {
    const fields = Object.keys(params).filter((field) => field != null)
    
    // const queryStr = fields.reduce((queryStr, field) => {
    //     if (Array.isArray(params[field])) {
    //         if (params[field].length > 0) {
    //             return (queryStr += params[field].map((value) => `${field}=${value}`).join('&') + '&')
    //         }
    //         return queryStr
    //     }
    //     return (queryStr += `${field}=${params[field]}&`)
    // }, '?')
    // return queryStr
}
