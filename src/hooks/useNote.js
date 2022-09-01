// import axios from 'axios'
// import { useEffect, useState } from 'react'

// export default function updateMyNote(orderNote) {
//     const [note, setNote] = useState()

//     useEffect(() => {
//         const getNote = async () => {
//             try {
//                 const res = await axios({
//                     method: 'GET',
//                     url: '/api/v1/users/myNote',
//                 })
//                 if (res.data.status('success')) {
//                     setNote(res.data.data.orderNote)
//                 }
//             } catch (err) {
//                 console.error(err.response.data.message)
//             }
//         }

//         getNote()
//     }, [])

//     return note
// }
