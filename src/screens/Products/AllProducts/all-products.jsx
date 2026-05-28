import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper, PopoverMenu } from "./all-products.styles";
import { Table, Switch, Popover } from "antd";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";
import { MdOutlineEdit as EditIcon } from "react-icons/md";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { HiOutlineEye as ViewIcon } from "react-icons/hi2";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { deleteProduct, toggleProductVisibility } from "@/network/product";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { useProducts } from "@/hooks/useProducts";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary-helper";
import { FlexibleDiv } from "@/components/lib/Box/styles";

const normalizeProducts = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item, index) => ({
    key: item._id || item.objectID || index,
    _id: item._id || item.objectID,
    productName: item.productName,
    brandArtist: item.brandArtist || item.artist || "",
    images: item.images || [],
    productId: item.productId || item.product || "",
    regularPrice: item.regularPrice || item.price || 0,
    inStock: Boolean(item.inStock ?? item.quantity),
    isVisible: item.isVisible ?? item.isApproved ?? false,
  }));
};

const formatNGN = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

const SORT_OPTIONS = [
  { label: "Newest First",       value: "newest" },
  { label: "Oldest First",       value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function AllProductsScreen() {
  const { push } = useRouter();
  const { dispatch, state: { user } } = useMainContext();

  const [openModal, setOpenModal]   = useState(false);
  const [modalError, setModalError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteId, setDeleteId]     = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleLoading, setToggleLoading] = useState({});

  const [filters, setFilters] = useState({
    keyword: "",
    limit: 10,
    sortBy: "newest",
    page: 1,
  });

  const { data, isLoading, refetch } = useProducts(filters, searchTerm);
  const allProducts = data?.data?.data || data?.data || [];
  const pagination  = data?.data?.pagination || data?.pagination || {};
  const structuredProducts = useMemo(() => normalizeProducts(allProducts), [allProducts]);

  useEffect(() => {
    const t = setTimeout(() => setFilters((f) => ({ ...f, page: 1 })), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const handleToggle = useCallback(async (checked, record) => {
    setToggleLoading((prev) => ({ ...prev, [record._id]: true }));
    try {
      await toggleProductVisibility(record._id, { isVisible: checked });
      refetch();
    } catch (e) {
      console.error("Failed to toggle visibility:", e);
    } finally {
      setToggleLoading((prev) => ({ ...prev, [record._id]: false }));
    }
  }, [refetch]);

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId?._id);
      setModalError(false);
      setDeleteSuccess(true);
      refetch();
    } catch {
      setModalError(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalError(false);
    setDeleteSuccess(false);
    setDeleteId(null);
  };

  const sortPopover = (
    <PopoverMenu>
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={filters.sortBy === opt.value ? "active" : ""}
          onClick={() => setFilters((f) => ({ ...f, sortBy: opt.value, page: 1 }))}
        >
          {opt.label}
        </button>
      ))}
    </PopoverMenu>
  );

  const rowActions = (record) => (
    <PopoverMenu>
      <button onClick={() => push(`/product/${record._id}`)}>
        View details
      </button>
      <button
        className="danger"
        onClick={() => { setDeleteId(record); setDeleteSuccess(false); setModalError(false); setOpenModal(true); }}
      >
        Delete product
      </button>
    </PopoverMenu>
  );

  const columns = useMemo(() => [
    {
      title: "Product",
      key: "product",
      render: (_, r) => (
        <div className="product__cell">
          <div className="product__thumb">
            {r.images[0] ? (
              <img src={getOptimizedCloudinaryUrl(r.images[0], 100)} alt={r.productName} />
            ) : (
              <span className="thumb__placeholder">{(r.productName || "?")[0].toUpperCase()}</span>
            )}
          </div>
          <div className="product__info">
            <p className="product__name">{r.productName}</p>
            {r.brandArtist && <p className="product__brand">{r.brandArtist}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (_, r) => (
        <div className="price__cell">
          <p className="price__main">{formatNGN(r.regularPrice)}</p>
        </div>
      ),
    },
    {
      title: "Stock",
      key: "inStock",
      align: "center",
      render: (_, r) => (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: "0.76rem", fontWeight: 700,
          padding: "3px 10px", borderRadius: 20,
          background: r.inStock ? "#f0fdf4" : "#fef2f2",
          color: r.inStock ? "#15803d" : "#b91c1c",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
            background: r.inStock ? "#16a34a" : "#dc2626",
          }} />
          {r.inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      title: "Visibility",
      key: "visibility",
      render: (_, r) => (
        <div className="visibility__cell">
          <Switch
            checked={r.isVisible}
            loading={!!toggleLoading[r._id]}
            onChange={(checked) => handleToggle(checked, r)}
          />
          <span className={`vis__label${r.isVisible ? " on" : ""}`}>
            {r.isVisible ? "Visible" : "Hidden"}
          </span>
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 48,
      render: (_, r) => (
        <Popover trigger="click" placement="bottomRight" content={rowActions(r)}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisIcon size={18} color="#999" />
          </button>
        </Popover>
      ),
    },
  ], [toggleLoading, handleToggle]);

  return (
    <DashboardLayout title="Products">
      <FlexibleDiv justifyContent="flex-end" margin="0 0 20px">
        <Button
          backgroundColor="var(--oosriPrimary)"
          color="#fff"
          onClick={() => {
            if (isBusinessActive(user)) {
              push("/product/create");
            } else {
              dispatch({ type: NO_BUSINESS_MODAL, payload: true });
            }
          }}
        >
          + Add New Product
        </Button>
      </FlexibleDiv>

      <AllProductsWrapper>
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search__wrap">
            <SearchIcon size={15} className="search__icon" />
            <input
              className="search__input"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Popover trigger="click" placement="bottomRight" content={sortPopover}>
            <button className="sort__btn">
              <FilterArrow size={14} />
              Sort
            </button>
          </Popover>
        </div>

        {/* Table */}
        <div className="table__wrap">
          <Table
            columns={columns}
            dataSource={structuredProducts}
            loading={isLoading}
            pagination={{
              current: pagination?.currentPage || filters.page,
              pageSize: filters.limit,
              total: pagination?.total || 0,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => setFilters((f) => ({ ...f, page, limit: pageSize })),
            }}
          />
        </div>
      </AllProductsWrapper>

      {/* Delete modal */}
      <StyledModal
        maskClosable
        open={openModal}
        centered
        closeIcon={null}
        footer={null}
      >
        {!deleteSuccess && !modalError && (
          <>
            <h2 style={{ textAlign: "center" }}>Delete Product</h2>
            <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
              Are you sure you want to delete <strong>{deleteId?.productName}</strong>? This cannot be undone.
            </p>
            <FlexibleDiv flexWrap="nowrap" gap="16px">
              <Button border="1px solid #E0E0E0" color="#555" hoverBg="white" width="100%" onClick={closeModal}>
                Cancel
              </Button>
              <Button backgroundColor="var(--oosriPrimary)" color="white" border="1px solid var(--oosriPrimary)" width="100%" onClick={handleDelete}>
                Delete
              </Button>
            </FlexibleDiv>
          </>
        )}

        {deleteSuccess && (
          <>
            <h2 style={{ textAlign: "center" }}>Deleted</h2>
            <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
              Product deleted successfully.
            </p>
            <Button backgroundColor="var(--oosriPrimary)" color="white" width="100%" onClick={closeModal}>
              Close
            </Button>
          </>
        )}

        {modalError && (
          <>
            <h2 style={{ textAlign: "center" }}>Delete Failed</h2>
            <p style={{ textAlign: "center", margin: "16px 0", color: "#777" }}>
              Something went wrong. Please try again.
            </p>
            <Button backgroundColor="var(--oosriPrimary)" color="white" width="100%" onClick={closeModal}>
              Close
            </Button>
          </>
        )}
      </StyledModal>
    </DashboardLayout>
  );
}
