import React from 'react'
import AdminControlButton from './AdminControlButton'
import AuctionAdminForm from './Auction/AuctionAdminForm'
import CategoryAdminForm from './Category/CategoryAdminForm'
import CollectionAdminForm from './Collection/CollectionAdminForm'
import CouponAdminForm from './Coupon/CouponAdminForm'
import OrderAdminForm from './Order/OrderAdminForm'
import ProductAdminForm from './Product/ProductAdminForm'

export default function AdminMainPanel({ formShow, handleUserUpdate, adminFormRef }) {
    return (
        <div
            className={`form w-3/4 p-7 mt-7 rounded-lg bg-white mx-auto transform transition duration-300 ${
                formShow === 'admin' ? 'block opacity-100 pointer-events-auto' : 'hidden opacity-0 pointer-events-none'
            }`}
            data-user-update="admin"
            onSubmit={handleUserUpdate}
            ref={adminFormRef}
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
