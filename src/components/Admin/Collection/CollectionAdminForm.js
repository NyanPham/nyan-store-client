import axios from 'axios'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ROOT_URL } from '../../../config'
import Overlay from '../../Overlay'
import CollectionEditor from './CollectionEditor'

export default function CollectionAdminForm({ closeModal }) {
    const [collections, setCollections] = useState([])
    const [collectionId, setCollectionId] = useState(false)
    const [showCollection, setShowCollection] = useState(false)
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

    const handleItemClick = (collection) => {
        setCollectionId(collection._id)
        setShowCollection(true)
    }

    useEffect(() => {
        const fetchAllCollections = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `${ROOT_URL}/api/v1/collections`,
                    withCredentials: true,
                })

                if (res.data.status === 'success') {
                    setCollections(res.data.data.docs)
                }
            } catch (err) {
                alert(err.response.data.message)
            }
        }

        fetchAllCollections()
    }, [])

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
                        config={config}
                    />
                )}
                {showAddForm && (
                    <CollectionEditor
                        collectionId={collectionId}
                        collections={collections}
                        isAddForm={true}
                        closeModal={() => setShowAddForm(false)}
                        config={config}
                    />
                )}
            </form>
        </Overlay>
    )
}
