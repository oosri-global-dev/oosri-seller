"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { OrderDetailsWrapper } from './index.styles'
import { useOrderDetails } from '@/hooks/useOrders'
import { useRouter } from 'next/router'
import { getOptimizedCloudinaryUrl } from '@/utils/cloudinary-helper'
import dayjs from 'dayjs'
import {
  MdOutlineLocationOn as LocationIcon,
  MdOutlinePhone as PhoneIcon,
  MdOutlineEmail as EmailIcon,
  MdOutlineLocalShipping as ShippingIcon,
  MdOutlinePayments as PaymentIcon,
  MdOutlineTrackChanges as TrackingIcon,
  MdOutlinePublic as InternationalIcon,
} from 'react-icons/md'
import { HiOutlineCurrencyDollar as PayoutIcon } from 'react-icons/hi2'

const getStatusClass = (status = '') => {
  const s = status.toLowerCase()
  if (s === 'pending')        return 'pending'
  if (s === 'processing')     return 'processing'
  if (s.includes('pickup'))   return 'pickup'
  if (s === 'delivered')      return 'delivered'
  if (s === 'cancelled')      return 'cancelled'
  return 'default'
}

const getPaymentClass = (status = '') => {
  const s = status?.toLowerCase() || ''
  if (s === 'paid')           return 'paid'
  if (s.includes('delivery')) return 'pod'
  return 'pending'
}

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="info__item">
    <span className="info__label">
      {Icon && <Icon size={13} />}
      {label}
    </span>
    <span className="info__value">{value || '—'}</span>
  </div>
)

export default function OrderDetails() {
  const router = useRouter()
  const { orderid } = router.query
  const { data, isLoading } = useOrderDetails(orderid)
  const order = data?.data?.data

  const customerInitial = order?.userId?.fullName?.[0]?.toUpperCase() || '?'
  const statusClass     = getStatusClass(order?.orderStatus)
  const paymentClass    = getPaymentClass(order?.paymentStatus)

  const productTotal = order?.products?.reduce((sum, p) => sum + (p.totalPrice || 0), 0) || 0
  const deliveryFee  = order?.deliveryFee || 0
  const grandTotal   = productTotal + deliveryFee
  const sellerPayout = Number((productTotal * 0.85).toFixed(2))
  const platformFee  = Number((productTotal * 0.15).toFixed(2))

  const isInternational = order?.isInternational || order?.shippingType === 'international' ||
    (order?.currencyCode && order?.currencyCode !== 'NGN')

  const trackingNumber = order?.trackingNumber || order?.tracking?.trackingNumber || null
  const courier        = order?.courier || order?.tracking?.courier || order?.shippingCarrier || null
  const trackingUrl    = order?.trackingUrl || order?.tracking?.trackingUrl || null

  const paymentMethod = order?.paymentMethod || order?.paymentGateway ||
    (order?.paymentStatus === 'paid' ? 'Online Payment' : null)

  return (
    <DashboardLayout title="Order Details" showBackBtn>
      {isLoading ? (
        <OrderDetailsWrapper>
          <div className="loading__state">
            <div className="skeleton__header" />
            <div className="skeleton__card" />
            <div className="skeleton__card" />
          </div>
        </OrderDetailsWrapper>
      ) : !order ? (
        <OrderDetailsWrapper>
          <div className="error__state">Order not found.</div>
        </OrderDetailsWrapper>
      ) : (
        <OrderDetailsWrapper>

          {/* ── Header ── */}
          <div className="order__header__card">
            <div className="header__left">
              <span className="order__num">
                #{order.id?.slice(-8).toUpperCase() || 'N/A'}
              </span>
              <div className="order__meta">
                <span>{dayjs(order.orderDate).format('MMMM D, YYYY [at] h:mm A')}</span>
                <div className="meta__dot" />
                <span>{order.products?.length || 0} item{order.products?.length !== 1 ? 's' : ''}</span>
                {isInternational && (
                  <>
                    <div className="meta__dot" />
                    <span className="intl__badge">
                      <InternationalIcon size={11} /> International
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="header__right">
              <span className={`payment__badge ${paymentClass}`}>
                {order.paymentStatus || 'Pending'}
              </span>
              <span className={`status__badge ${statusClass}`}>
                {order.orderStatus || 'N/A'}
              </span>
            </div>
          </div>

          {/* ── Customer + Delivery grid ── */}
          <div className="info__grid two__col">

            {/* Customer */}
            <div className="detail__card">
              <div className="card__header">
                <h3>Customer</h3>
              </div>
              <div className="card__body">
                <div className="customer__section">
                  <div className="avatar">{customerInitial}</div>
                  <div className="customer__info">
                    <h4>{order.userId?.fullName || 'N/A'}</h4>
                    <p>#{order.id?.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
                <div className="info__rows" style={{ marginTop: 16 }}>
                  {order.userId?.email && (
                    <InfoRow icon={EmailIcon} label="Email" value={order.userId.email} />
                  )}
                  <InfoRow icon={PhoneIcon} label="Phone" value={order.phoneNumber} />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="detail__card">
              <div className="card__header">
                <h3>
                  <LocationIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  Delivery Address
                </h3>
              </div>
              <div className="card__body">
                <div className="address__block">
                  {order.deliveryAddress ? (
                    <p className="address__full">{order.deliveryAddress}</p>
                  ) : (
                    <p className="address__empty">No delivery address provided</p>
                  )}
                  {order.city && (
                    <div className="address__chips">
                      {order.city && <span className="address__chip">{order.city}</span>}
                      {order.state && <span className="address__chip">{order.state}</span>}
                      {order.country && <span className="address__chip">{order.country}</span>}
                      {order.postalCode && <span className="address__chip">{order.postalCode}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* ── Order items ── */}
          <div className="detail__card">
            <div className="card__header">
              <h3>Order Items</h3>
              <span style={{ fontSize: '0.78rem', color: '#aaa' }}>
                {order.products?.length || 0} product{order.products?.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="card__body" style={{ padding: 0 }}>
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
                        {product.quantity && (
                          <p className="product__qty">Qty: {product.quantity}</p>
                        )}
                      </div>
                    </div>
                    <div className="product__right">
                      {product.quantity > 1 && product.price && (
                        <span className="unit__price">₦{Number(product.price).toLocaleString()} each</span>
                      )}
                      <span className="product__total">
                        ₦{Number(product.totalPrice || product.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Shipping + Payment + Payout ── */}
          <div className="info__grid three__col">

            {/* Shipping / Tracking */}
            <div className="detail__card">
              <div className="card__header">
                <h3>
                  <ShippingIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  Shipping
                </h3>
              </div>
              <div className="card__body">
                <div className="info__rows">
                  <InfoRow label="Type" value={isInternational ? 'International' : 'Domestic'} />
                  {courier && <InfoRow icon={ShippingIcon} label="Carrier" value={courier} />}
                  {order.estimatedDelivery && (
                    <InfoRow label="Est. Delivery" value={dayjs(order.estimatedDelivery).format('MMM D, YYYY')} />
                  )}
                  {trackingNumber ? (
                    <div className="info__item">
                      <span className="info__label">
                        <TrackingIcon size={13} /> Tracking
                      </span>
                      {trackingUrl ? (
                        <a
                          href={trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tracking__link"
                        >
                          {trackingNumber}
                        </a>
                      ) : (
                        <span className="info__value tracking__num">{trackingNumber}</span>
                      )}
                    </div>
                  ) : (
                    <InfoRow icon={TrackingIcon} label="Tracking" value="Not available yet" />
                  )}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="detail__card">
              <div className="card__header">
                <h3>
                  <PaymentIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  Payment
                </h3>
              </div>
              <div className="card__body">
                <div className="info__rows">
                  <InfoRow label="Method" value={paymentMethod} />
                  <InfoRow label="Status" value={
                    <span className={`payment__badge ${paymentClass}`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  } />
                  <InfoRow label="Currency" value={order.currencyCode || 'NGN'} />
                </div>
                <div className="summary__totals">
                  <div className="total__row">
                    <span>Products</span>
                    <span>₦{Number(productTotal).toLocaleString()}</span>
                  </div>
                  <div className="total__row">
                    <span>Delivery fee</span>
                    <span>₦{Number(deliveryFee).toLocaleString()}</span>
                  </div>
                  <div className="total__row grand">
                    <span>Grand Total</span>
                    <span>₦{Number(grandTotal).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Payout */}
            <div className="detail__card">
              <div className="card__header">
                <h3>
                  <PayoutIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  Your Payout
                </h3>
              </div>
              <div className="card__body">
                <div className="payout__card">
                  <div className="payout__amount">
                    ₦{Number(sellerPayout).toLocaleString()}
                  </div>
                  <div className="payout__breakdown">
                    <div className="pb__row">
                      <span>Product total</span>
                      <span>₦{Number(productTotal).toLocaleString()}</span>
                    </div>
                    <div className="pb__row deduct">
                      <span>Platform fee (15%)</span>
                      <span>−₦{Number(platformFee).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className={`payout__status ${order.paymentStatus === 'paid' ? 'ready' : 'pending'}`}>
                    {order.paymentStatus === 'paid'
                      ? 'Payout eligible after delivery'
                      : 'Awaiting payment clearance'}
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
