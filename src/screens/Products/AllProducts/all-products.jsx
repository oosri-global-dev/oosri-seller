import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper } from "./all-products.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Table, Switch, Popover } from "antd";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { deleteProduct, toggleProductVisibility } from "@/network/product";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { useProducts } from "@/hooks/useProducts";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";

const normalizeProducts = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item, index) => ({
    key: item._id || item.objectID || index,
    _id: item._id || item.objectID,
    productName: item.productName,
    images: item.images || [],
    brandArtist: item.brandArtist || item.artist || "",
    regularPrice: item.regularPrice || item.price || 0,
    discountPrice: item.discountPrice || null,
    stockQty: Number(item.inStock ?? item.quantity ?? 0),
    inStock: Number(item.inStock ?? item.quantity ?? 0) > 0,
    isVisible: item.isVisible ?? item.isApproved ?? false,
  }));
};

const StockBadge = ({ qty }) => {
  const isOut  = qty === 0;
  const isLow  = qty > 0 && qty < 5;
  const label  = isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock";
  const colors = isOut
    ? { bg: "#fef2f2", color: "#dc2626", border: "#fca5a5" }
    : isLow
    ? { bg: "#fffbeb", color: "#d97706", border: "#fcd34d" }
    : { bg: "#f0fdf4", color: "#16a34a", border: "#86efac" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a1a" }}>{qty}</span>
      <span style={{
        background: colors.bg, color: colors.color,
        border: `1px solid ${colors.border}`,
        padding: "2px 8px", borderRadius: 20,
        fontSize: "0.7rem", fontWeight: 600, whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
};

export default function AllProductsScreen() {
  const [openModal, setOpenModal]   = useState(false);
  const [modalError, setModalError] = useState(false);
  const [editModal, setEditModal]   = useState(true);
  const [deleteId, setDeleteId]     = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleLoading, setToggleLoading] = useState({});

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    limit: 10,
    sortBy: "oldest",
    page: 1,
  });

  const { data, isLoading, refetch } = useProducts(filters, searchTerm);
  const { push } = useRouter();

  const allProducts       = data?.data?.data || data?.data || [];
  const pagination        = data?.data?.pagination || data?.pagination || {};
  const structuredProducts = useMemo(() => normalizeProducts(allProducts), [allProducts]);

  const handleToggle = useCallback(async (checked, obj) => {
    setToggleLoading((prev) => ({ ...prev, [obj._id]: true }));
    try {
      await toggleProductVisibility(obj._id, { isVisible: checked });
      refetch();
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
    } finally {
      setToggleLoading((prev) => ({ ...prev, [obj._id]: false }));
    }
  }, [refetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, page: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, sortBy: filters.sortBy, page: 1 }));
  }, [filters.sortBy]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handlePageChange = (page, pageSize) => {
    setFilters((prev) => ({ ...prev, page, limit: pageSize }));
  };

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({ ...prev, sortBy: sortValue, page: 1 }));
  };

  const handleDelete = async (param) => {
    try {
      await deleteProduct(param);
      setModalError(false);
      setEditModal(false);
      refetch();
    } catch (errors) {
      setModalError(true);
    }
  };

  const openDeleteModal = (params) => {
    setOpenModal(true);
    setDeleteId(params);
  };

  const closeModal = () => {
    setEditModal(true);
    setOpenModal(false);
    setModalError(false);
  };

  const filterContent = useMemo(() => (
    <div className="sort__popover">
      {[
        { label: "Newest First",     value: "newest"     },
        { label: "Oldest First",     value: "oldest"     },
        { label: "Price: Low → High", value: "price_asc"  },
        { label: "Price: High → Low", value: "price_desc" },
      ].map((item) => (
        <button
          key={item.value}
          className={`sort__option${filters.sortBy === item.value ? " active" : ""}`}
          onClick={() => handleSortChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  ), [filters.sortBy]);

  const columns = useMemo(() => [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (name, obj) => (
        <div className="product__cell">
          <div className="product__thumb">
            {obj.images[0]
              ? <img src={getOptimizedCloudinaryUrl(obj.images[0], 80)} alt={name} />
              : <span className="thumb__placeholder">{name?.[0]?.toUpperCase() || "P"}</span>
            }
          </div>
          <div className="product__info">
            <p className="product__name">{name}</p>
            {obj.brandArtist && <p className="product__brand">{obj.brandArtist}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "regularPrice",
      key: "regularPrice",
      render: (price, obj) => (
        <div className="price__cell">
          <p className="price__main">₦{Number(price).toLocaleString()}</p>
          {obj.discountPrice && (
            <p className="price__old">₦{Number(obj.discountPrice).toLocaleString()}</p>
          )}
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stockQty",
      key: "stockQty",
      render: (qty) => <StockBadge qty={qty} />,
    },
    {
      title: "Visibility",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (isVisible, obj) => (
        <div className="visibility__cell">
          <Switch
            checked={isVisible}
            loading={!!toggleLoading[obj._id]}
            onChange={(checked) => handleToggle(checked, obj)}
            size="small"
          />
          <span className={`vis__label${isVisible ? " on" : ""}`}>
            {isVisible ? "Active" : "Hidden"}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, obj) => (
        <div className="actions__cell">
          <button
            className="action__btn view"
            title="View product"
            onClick={() => push(`/product/${obj._id}`)}
          >
            <FiEye size={14} />
          </button>
          <button
            className="action__btn edit"
            title="Edit product"
            onClick={() => push(`/product/${obj._id}`)}
          >
            <FiEdit2 size={14} />
          </button>
          <button
            className="action__btn delete"
            title="Delete product"
            onClick={() => openDeleteModal(obj)}
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
    },
  ], [toggleLoading, handleToggle, push]);

  return (
    <DashboardLayout title="Products">
      <AllProductsWrapper>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="search__wrap">
            <SearchIcon size={16} className="search__icon" />
            <input
              className="search__input"
              placeholder="Search products…"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Popover
            content={filterContent}
            trigger="click"
            placement="bottomRight"
          >
            <button className="sort__btn">
              <FilterArrow size={14} />
              Sort
            </button>
          </Popover>
        </div>

        {/* ── Table ── */}
        <div className="table__wrap">
          <Table
            columns={columns}
            dataSource={structuredProducts}
            loading={isLoading}
            pagination={{
              current: pagination?.currentPage || filters.page,
              pageSize: filters.limit,
              total: pagination?.total || 0,
              showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} products`,
              onChange: handlePageChange,
            }}
            locale={{
              emptyText: (
                <div className="empty__state">
                  <p className="empty__title">No products yet</p>
                  <p className="empty__sub">
                    Click "+ Add Product" in the header to create your first listing.
                  </p>
                </div>
              ),
            }}
          />
        </div>

        {/* ── Delete modal ── */}
        <StyledModal
          maskClosable
          open={openModal}
          centered
          closeIcon={null}
          footer={null}
        >
          {editModal ? (
            <>
              <h2 style={{ textAlign: "center" }}>Delete Product</h2>
              <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
                Are you sure you want to delete{" "}
                <strong>{deleteId.productName}</strong>? This cannot be undone.
              </p>
              <FlexibleDiv flexWrap="nowrap" gap="12px">
                <Button
                  border="1px solid #e0e0e0"
                  color="#666"
                  hoverBg="rgba(0,0,0,0.04)"
                  width="100%"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(deleteId?._id)}
                  backgroundColor="var(--oosriPrimary)"
                  color="white"
                  width="100%"
                >
                  Delete
                </Button>
              </FlexibleDiv>
            </>
          ) : modalError ? (
            <>
              <h2 style={{ textAlign: "center" }}>Delete Failed</h2>
              <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
                We couldn't delete this product. Please try again.
              </p>
              <Button
                onClick={closeModal}
                backgroundColor="var(--oosriPrimary)"
                color="white"
                width="100%"
              >
                Close
              </Button>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>Product Deleted</h2>
              <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
                Your product has been deleted successfully.
              </p>
              <Button
                onClick={closeModal}
                backgroundColor="var(--oosriPrimary)"
                color="white"
                width="100%"
              >
                Done
              </Button>
            </>
          )}
        </StyledModal>

      </AllProductsWrapper>
    </DashboardLayout>
  );
}
