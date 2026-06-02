"use client"

import DashboardLayout from '@/components/layouts/DashboardLayout/dashboard-layout'
import { OrderWrapper } from './orders.styles'
import { Table } from 'antd'
import { useOrderTableData } from '@/utils/order-helpers'
import { useRouter } from 'next/router'
import { useState, useMemo } from 'react'
import { MdOutlineSearch as SearchIcon } from 'react-icons/md'
import dayjs from 'dayjs'

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled']

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

export default function OrderScreen() {
  const { dataSource, isLoading } = useOrderTableData()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')

  const filtered = useMemo(() => {
    let rows = dataSource
    if (activeTab !== 'All') {
      rows = rows.filter((r) =>
        r.status?.toLowerCase().includes(activeTab.toLowerCase())
      )
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        (r) =>
          r.orderId?.toLowerCase().includes(q) ||
          r.customer?.toLowerCase().includes(q)
      )
    }
    return rows
  }, [dataSource, activeTab, search])

  const columns = [
    {
      title: 'Order',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (_, row) => (
        <div className="order__id__cell">
          <span className="order__code">{row.orderId}</span>
          <span className="item__count">{row.itemNum} item{row.itemNum !== 1 ? 's' : ''}</span>
        </div>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (val) => <span className="customer__cell">{val}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (val) => (
        <span className="date__cell">
          {val ? dayjs(val).format('MMM D, YYYY') : '—'}
          <br />
          <span style={{ fontSize: '0.72rem', color: '#ccc' }}>
            {val ? dayjs(val).format('h:mm A') : ''}
          </span>
        </span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => (
        <span className="amount__cell">₦{Number(val || 0).toLocaleString()}</span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (val) => (
        <span className={`payment__badge ${getPaymentClass(val)}`}>
          {val || 'Pending'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val) => (
        <span className={`status__badge ${getStatusClass(val)}`}>
          {val || 'Pending'}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      render: (_, row) => (
        <button
          className="view__btn"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/order/${row.id}`)
          }}
        >
          View
        </button>
      ),
    },
  ]

  return (
    <DashboardLayout title="Orders">
      <OrderWrapper>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="search__wrap">
            <span className="search__icon"><SearchIcon size={15} /></span>
            <input
              className="search__input"
              placeholder="Search order ID or customer…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="status__tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                className={`tab__pill${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop table ── */}
        <div className="table__wrap">
          <Table
            columns={columns}
            dataSource={filtered}
            loading={isLoading}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => router.push(`/order/${record.id}`),
              style: { cursor: 'pointer' },
            })}
            pagination={{
              pageSize: 20,
              showSizeChanger: false,
              showTotal: (total) => `${total} order${total !== 1 ? 's' : ''}`,
            }}
            locale={{
              emptyText: (
                <div className="empty__state">
                  <p className="empty__title">No orders found</p>
                  <p className="empty__sub">
                    {search || activeTab !== 'All'
                      ? 'Try adjusting your search or filter'
                      : 'Orders will appear here once buyers purchase your products'}
                  </p>
                </div>
              ),
            }}
          />
        </div>

        {/* ── Mobile cards (≤640px) ── */}
        <div className="mobile__order__list">
          {filtered.length === 0 ? (
            <div className="empty__state" style={{ background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0' }}>
              <p className="empty__title">No orders found</p>
              <p className="empty__sub">
                {search || activeTab !== 'All'
                  ? 'Try adjusting your search or filter'
                  : 'Orders will appear here once buyers purchase your products'}
              </p>
            </div>
          ) : filtered.map((row) => (
            <div
              key={row.id}
              className="mobile__order__card"
              onClick={() => router.push(`/order/${row.id}`)}
            >
              <div className="moc__top">
                <div className="moc__id__block">
                  <span className="moc__code">{row.orderId}</span>
                  <span className="moc__items">{row.itemNum} item{row.itemNum !== 1 ? 's' : ''}</span>
                </div>
                <div className="moc__badges">
                  <span className={`status__badge ${getStatusClass(row.status)}`}>{row.status || 'Pending'}</span>
                  <span className={`payment__badge ${getPaymentClass(row.paymentStatus)}`}>{row.paymentStatus || 'Pending'}</span>
                </div>
              </div>
              <div className="moc__body">
                <div className="moc__field">
                  <span className="moc__label">Customer</span>
                  <span className="moc__value">{row.customer}</span>
                </div>
                <div className="moc__field">
                  <span className="moc__label">Amount</span>
                  <span className="moc__value moc__value--amount">₦{Number(row.amount || 0).toLocaleString()}</span>
                </div>
                <div className="moc__field">
                  <span className="moc__label">Date</span>
                  <span className="moc__value">{row.date ? dayjs(row.date).format('MMM D, YYYY') : '—'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </OrderWrapper>
    </DashboardLayout>
  )
}
