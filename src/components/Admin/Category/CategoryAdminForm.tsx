import React, { useState, useRef } from 'react'
import { categoryConfig } from '../../../config'
import Overlay from '../../Overlay'
import CategoryEditor from './CategoryEditor'
import useFetchDocs from '../../../hooks/useFetchDocs'

export default function CategoryAdminForm({ closeModal }) {
    const [categories] = useFetchDocs('categories')
    const [categoryId, setCategoryId] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    const handleItemClick = (category) => {
        setCategoryId(category._id)
        setShowCategory(true)
    }

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
                        config={categoryConfig}
                    />
                )}
                {showAddForm && (
                    <CategoryEditor
                        categoryId={categoryId}
                        categories={categories}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={categoryConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
