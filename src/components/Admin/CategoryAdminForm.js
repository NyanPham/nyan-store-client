import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ROOT_URL } from '../../config'
import Overlay from '../Overlay'
import CategoryEditor from './Category/CategoryEditor'

export default function CategoryAdminForm({ closeModal }) {
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()
    const config = {
        name: {
            type: 'text',
            required: true,
        },
        summary: {
            type: 'text',
            required: true,
        },
    }

    const handleItemClick = (category) => {
        setCategoryId(category._id)
        setShowCategory(true)
    }

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/categories`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setCategories(res.data.data.docs)
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllCategories()
    }, [])

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="admin-editor-form" ref={ref}>
                <h2 className="admin-editor-form-title">Categories</h2>
                <div className="max-h-96 overflow-y-auto mt-5">
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <div
                                key={`category_${category._id}`}
                                className="item-button"
                                onClick={() => handleItemClick(category)}
                            >
                                {category.name}
                            </div>
                        ))}
                </div>
                <button type="button" className="submit-button" onClick={() => setShowAddForm(true)}>
                    +
                </button>
                {showCategory && (
                    <CategoryEditor
                        categoryId={categoryId}
                        categories={categories}
                        isAddForm={false}
                        closeModal={() => setShowCategory(false)}
                        config={config}
                    />
                )}
                {showAddForm && (
                    <CategoryEditor
                        categoryId={categoryId}
                        categories={categories}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={config}
                    />
                )}
            </form>
        </Overlay>
    )
}
