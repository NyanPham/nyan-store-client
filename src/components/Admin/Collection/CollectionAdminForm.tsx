import React, { useState, useRef } from 'react'
import { collectionConfig } from '../../../config'
import useFetchDocs from '../../../hooks/useFetchDocs'
import Overlay from '../../Overlay'
import CollectionEditor from './CollectionEditor'

export default function CollectionAdminForm({ closeModal }) {
    const [collections] = useFetchDocs('collections')
    const [collectionId, setCollectionId] = useState(false)
    const [showCollection, setShowCollection] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const ref = useRef()

    const handleItemClick = (collection) => {
        setCollectionId(collection._id)
        setShowCollection(true)
    }

    return (
        <Overlay closeModal={closeModal} childRef={ref}>
            <form className="admin-editor-form" ref={ref}>
                <h2 className="admin-editor-form-title">Collections</h2>
                <div className="max-h-96 overflow-y-auto mt-5">
                    {collections.length > 0 &&
                        collections.map((collection) => (
                            <div
                                key={`collection_${collection._id}`}
                                className="item-button"
                                onClick={() => handleItemClick(collection)}
                            >
                                {collection.name}
                            </div>
                        ))}
                </div>
                <button type="button" className="submit-button" onClick={() => setShowAddForm(true)}>
                    +
                </button>
                {showCollection && (
                    <CollectionEditor
                        collectionId={collectionId}
                        collections={collections}
                        isAddForm={false}
                        closeModal={() => setShowCollection(false)}
                        config={collectionConfig}
                    />
                )}
                {showAddForm && (
                    <CollectionEditor
                        collectionId={collectionId}
                        collections={collections}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={collectionConfig}
                    />
                )}
            </form>
        </Overlay>
    )
}
