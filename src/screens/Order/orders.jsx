"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { OrderWrapper } from './orders.styles'
import { Table } from 'antd'
import { IoSearchOutline as SearchIcon } from 'react-icons/io5'
import { FiEye } from 'react-icons/fi'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useOrderTableData } from '@/utils/order-helpers'
import dayjs from 'dayjs'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Sent for Pickup', 'Delivered', 'Cancelled']

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

export default function OrderScreen() {
  const [searchTerm, setSearchTerm]     = useState('')
  const [activeStatus, setActiveStatus] = useState('All')
  const { dataSource, isLoading }       = useOrderTableData()
  const { push }                        = useRouter()

  const filtered = useMemo(() => {
    let rows = dataSource
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      rows = rows.filter(r =>
        r.customer?.toLowerCase().includes(q) ||
        r.orderId?.toLowerCase().includes(q)
      )
    }
    if (activeStatus !== 'All') {
      rows = rows.filter(r =>
        r.status?.toLowerCase() === activeStatus.toLowerCase()
      )
    }
    return rows
  }, [dataSource, searchTerm, activeStatus])

  const columns = useMemo(() => [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (_, obj) => (
        <div className="order__id__cell">
          <p className="order__code">{obj.orderId}</p>
          <p className="item__count">{obj.itemNum} item{obj.itemNum !== 1 ? 's' : ''}</p>
        </div>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (_) => <span className="customer__cell">{_ || '—'}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_) => <span className="amount__cell">₦{Number(_ || 0).toLocaleString()}</span>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_) => (
        <span className="date__cell">
          {_ ? dayjs(_).format('MMM D, YYYY') : '—'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_) => (
        <span className={`status__badge ${getStatusClass(_)}`}>{_ || '—'}</span>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (_) => (
        <span className={`payment__badge ${getPaymentClass(_)}`}>{_ || '—'}</span>
      ),
    },
    {
      title: '',
      key: 'actions',
      render: (_, obj) => (
        <button
          className="view__btn"
          onClick={(e) => { e.stopPropagation(); push(`/order/${obj.id}`) }}
        >
          <FiEye size={13} />
          View
        </button>
      ),
    },
  ], [push])

  return (
    <DashboardLayout title="Orders">
      <OrderWrapper>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="search__wrap">
            <SearchIcon size={15} className="search__icon" />
            <input
              className="search__input"
              placeholder="Search by customer or order ID…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status__tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                className={`tab__pill${activeStatus === tab ? ' active' : ''}`}
                onClick={() => setActiveStatus(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="table__wrap">
          <Table
            columns={columns}
            dataSource={filtered}
            loading={isLoading}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => push(`/order/${record.id}`),
              style: { cursor: 'pointer' },
            })}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `${range[0]}–${range[1]} of ${total} orders`,
            }}
            locale={{
              emptyText: (
                <div className="empty__state">
                  <p className="empty__title">No orders found</p>
                  <p className="empty__sub">
                    {activeStatus !== 'All'
                      ? `No ${activeStatus.toLowerCase()} orders yet.`
                      : 'Orders placed by buyers will appear here.'}
                  </p>
                </div>
              ),
            }}
          />
        </div>

      </OrderWrapper>
    </DashboardLayout>
  )
}
