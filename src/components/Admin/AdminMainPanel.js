import React from 'react'
import AdminControlButton from './AdminControlButton'
import AuctionAdminForm from './AuctionAdminForm'
import CategoryAdminForm from './CategoryAdminForm'
import CollectionAdminForm from './CollectionAdminForm'
import CouponAdminForm from './CouponAdminForm'
import OrderAdminForm from './OrderAdminForm'
import ProductAdminForm from './ProductAdminForm'

export default function AdminMainPanel({ formShow, handleUserUpdate }) {
    return (
        <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 form w-3/4 p-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                formShow === 'admin' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            data-user-update="admin"
            onSubmit={handleUserUpdate}
        >
            <h2 className="text-xl text-cyan-400 font-semibold">Admin Panel</h2>
            <AdminControlButton buttonText={'Products'} form={ProductAdminForm} />
            <AdminControlButton buttonText={'Categories'} form={CategoryAdminForm} />
            <AdminControlButton buttonText={'Collections'} form={CollectionAdminForm} />
            <AdminControlButton buttonText={'Auction'} form={AuctionAdminForm} />
            <AdminControlButton buttonText={'Coupons'} form={CouponAdminForm} />
            <AdminControlButton buttonText={'Orders'} form={OrderAdminForm} />
        </div>
    )
}
