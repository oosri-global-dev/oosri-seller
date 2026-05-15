"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { OrderDetailsWrapper } from './index.styles'
import { useOrderDetails } from '@/hooks/useOrders'
import { useRouter } from 'next/router'
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary-helper'
import dayjs from 'dayjs'

const getStatusClass = (status = '') => {
  const s = status.toLowerCase()
  if (s === 'pending')       return 'pending'
  if (s === 'processing')    return 'processing'
  if (s.includes('pickup'))  return 'pickup'
  if (s === 'delivered')     return 'delivered'
  if (s === 'cancelled')     return 'cancelled'
  return 'default'
}

const getPaymentClass = (status = '') => {
  const s = status.toLowerCase()
  if (s === 'paid')             return 'paid'
  if (s.includes('delivery'))   return 'pod'
  return 'pending'
}

export default function OrderDetails() {
  const router = useRouter()
  const { orderid } = router.query
  const { data, isLoading } = useOrderDetails(orderid)
  const order = data?.data?.data

  const customerInitial = order?.userId?.fullName?.[0]?.toUpperCase() || '?'
  const statusClass     = getStatusClass(order?.orderStatus)
  const paymentClass    = getPaymentClass(order?.paymentStatus)

  const productTotal = order?.products?.reduce(
    (sum, p) => sum + (p.totalPrice || 0), 0
  ) || order?.totalForSeller || 0
  const deliveryFee = order?.deliveryFee || 0
  const grandTotal  = productTotal + deliveryFee

  return (
    <DashboardLayout title="Order Details" showBackBtn>
      {isLoading ? (
        <OrderDetailsWrapper>
          <div className="loading__state">Loading order…</div>
        </OrderDetailsWrapper>
      ) : !order ? (
        <OrderDetailsWrapper>
          <div className="error__state">Order not found.</div>
        </OrderDetailsWrapper>
      ) : (
        <OrderDetailsWrapper>

          {/* ── Header card ── */}
          <div className="order__header__card">
            <div className="header__left">
              <span className="order__num">
                #{order.id?.slice(-8).toUpperCase() || 'N/A'}
              </span>
              <div className="order__meta">
                <span>{dayjs(order.orderDate).format('MMMM D, YYYY [at] h:mm A')}</span>
                <div className="meta__dot" />
                <span>{order.products?.length || 0} item{order.products?.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="header__right">
              <span className={`payment__badge ${paymentClass}`}>
                {order.paymentStatus || 'N/A'}
              </span>
              <span className={`status__badge ${statusClass}`}>
                {order.orderStatus || 'N/A'}
              </span>
            </div>
          </div>

          {/* ── Customer card ── */}
          <div className="detail__card">
            <div className="card__header">
              <h3>Customer</h3>
            </div>
            <div className="card__body">
              <div className="customer__section">
                <div className="avatar">{customerInitial}</div>
                <div className="customer__info">
                  <h4>{order.userId?.fullName || 'N/A'}</h4>
                  <p>Order #{order.id?.slice(-8).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Order items card ── */}
          <div className="detail__card">
            <div className="card__header">
              <h3>Order Items</h3>
              <span style={{ fontSize: '0.78rem', color: '#aaa' }}>
                {order.products?.length || 0} product{order.products?.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="card__body">
              <div className="product__list">
                {order.products?.map((product, index) => (
                  <div key={index} className="product__row">
                    <div className="product__left">
                      <div className="product__thumb">
                        {product.images?.[0] ? (
                          <img
                            src={getOptimizedCloudinaryUrl(product.images[0], 120)}
                            alt={product.productName}
                          />
                        ) : (
                          <span className="thumb__placeholder">
                            {product.productName?.[0]?.toUpperCase() || 'P'}
                          </span>
                        )}
                      </div>
                      <div className="product__info">
                        <p className="product__name">{product.productName}</p>
                        <p className="product__id">
                          ID: #{product.productId?._id?.slice(-6) || 'N/A'}
                        </p>
                      </div>
                    </div>
                    {product.price !== product.totalPrice && (
                      <span className="product__price">
                        ₦{Number(product.price || 0).toLocaleString()}
                      </span>
                    )}
                    <span className="product__total">
                      ₦{Number(product.totalPrice || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Delivery + Payment grid ── */}
          <div className="info__grid">

            {/* Delivery info */}
            <div className="detail__card">
              <div className="card__header">
                <h3>Delivery Information</h3>
              </div>
              <div className="card__body">
                <div className="info__row">
                  <div className="info__item">
                    <span className="info__label">Delivery Address</span>
                    <span className="info__value">{order.deliveryAddress || 'N/A'}</span>
                  </div>
                  <div className="info__item">
                    <span className="info__label">Contact Number</span>
                    <span className="info__value">{order.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="info__item">
                    <span className="info__label">Order Date</span>
                    <span className="info__value">
                      {dayjs(order.orderDate).format('MMMM D, YYYY')}
                    </span>
                  </div>
                  <div className="info__item">
                    <span className="info__label">Status</span>
                    <span className={`status__badge ${statusClass}`}>
                      {order.orderStatus || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment summary */}
            <div className="detail__card">
              <div className="card__header">
                <h3>Payment Summary</h3>
              </div>
              <div className="card__body">
                <div className="payment__summary">
                  <div className="pay__row">
                    <span className="pay__label">Product total</span>
                    <span className="pay__value">₦{Number(productTotal).toLocaleString()}</span>
                  </div>
                  <div className="pay__row">
                    <span className="pay__label">Delivery fee</span>
                    <span className="pay__value">₦{Number(deliveryFee).toLocaleString()}</span>
                  </div>
                  <div className="pay__row total">
                    <span className="pay__label">Total</span>
                    <span className="pay__value">₦{Number(grandTotal).toLocaleString()}</span>
                  </div>
                  <div className="pay__row" style={{ marginTop: 4 }}>
                    <span className="pay__label">Payment method</span>
                    <span className={`payment__badge ${paymentClass}`}>
                      {order.paymentStatus || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </OrderDetailsWrapper>
      )}
    </DashboardLayout>
  )
}
