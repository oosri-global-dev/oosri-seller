import DashboardLayout from "@/components/layouts/DashboardLayout/dashboard-layout";
import { AllProductsWrapper, TopMenuWrapper } from "./all-products.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Table, Space, Avatar, Popover, Switch, Tabs } from "antd";
import Button from "@/components/lib/Button";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import TextField from "@/components/lib/TextField";
import { LuArrowUpDown as FilterArrow } from "react-icons/lu";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { isBusinessActive } from "@/utils/business-checker";
import { NO_BUSINESS_MODAL } from "@/context/types";
import { deleteProduct, toggleProductVisibility } from "@/network/product";
import { StyledModal } from "@/components/lib/NoBusinessModal/index.styles";
import { HiOutlineEllipsisHorizontal as EllipsisIcon } from "react-icons/hi2";
import { useProducts } from "@/hooks/useProducts";
import { useToggleVisibility } from "@/hooks/useToggleVisibility";

const normalizeProducts = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item, index) => {
    // Determine if it's from Algolia search or regular API
    const isSearch = !!item.objectID;
    return {
      key: item._id || item.objectID || index,
      _id: item._id || item.objectID,
      productName: item.productName,
      images: item.images || [],
      brandArtist: item.brandArtist || item.artist || "",
      productId: item.productId || item.product || "",
      regularPrice: item.regularPrice || item.price || 0,
      inStock: Boolean(item.inStock ?? item.quantity),
      isVisible: item.isVisible ?? item.isApproved ?? false,
    };
  });
};

export default function AllProductsScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [editModal, setEditModal] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const allProducts = data?.data?.data || data?.data || [];
  const pagination = data?.data?.pagination || data?.pagination || {};
  const [toggleLoading, setToggleLoading] = useState({});

  const structuredProducts = useMemo(() => normalizeProducts(allProducts), [allProducts]);

  // Handle visibility toggle
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

  console.log("All Products Data:", allProducts);

  const { push } = useRouter();
  const {
    dispatch,
    state: { user },
  } = useMainContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        // keyword: searchTerm,
        page: 1,
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      sortBy: filters.sortBy,
      page: 1,
    }));
  }, [filters.sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page, pageSize) => {
    setFilters((prev) => ({
      ...prev,
      page: page,
      limit: pageSize,
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortValue,
      page: 1,
    }));
  };

  const handleDelete = async (param) => {
    try {
      await deleteProduct(param);
      setModalError(false);
      setEditModal(false);
      refetch();
    } catch (errors) {
      console.log(errors);
      setModalError(true);
    }
  };

  const openDeleteModal = (params) => {
    setOpenModal(true);
    setDeleteId(params);
  };

  const content = (obj) => (
    <div className="popover__custom">
      <Button
        height="30px"
        radius="5px"
        onClick={() => {
          window.location = `product/${obj._id}`;
        }}
      >
        View More Details
      </Button>
      <Button
        height="30px"
        radius="5px"
        onClick={() => {
          openDeleteModal(obj);
        }}
      >
        Unpublish Details
      </Button>
    </div>
  );

  const filterContent = useMemo(() => (
    <div className="popover__custom">
      {[
        { label: "Newest First", value: "newest" },
        { label: "Oldest First", value: "oldest" },
        { label: "Ascending Price", value: "price_asc" },
        { label: "Descending Price", value: "price_desc" },
      ].map((item) => (
        <Button
          key={item.value}
          height="30px"
          width="100%"
          radius="5px"
          onClick={() => handleSortChange(item.value)}
          hoverColor="var(--oosriBlack)"
          style={{
            backgroundColor:
              filters.sortBy === item.value ? "var(--oosriPrimary)" : "transparent",
            color:
              filters.sortBy === item.value
                ? "var(--oosriWhite) !important"
                : "var(--oosriBlack)",
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  ), [filters.sortBy]);

  const productsTableColumns = useMemo(() => [
    {
      title: (
        <FlexibleDiv justifyContent="start" padding="0 0 0 40px">
          <p>Product Name</p>
        </FlexibleDiv>
      ),
      dataIndex: "productName",
      key: "productName",
      render: (_, obj) => (
        <Space>
          <Avatar size={45} src={obj?.images[0]} />
          <Space direction="vertical" size={1}>
            <p>{_}</p>
          </Space>
        </Space>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "brandArtist",
      key: "brandArtist",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Price",
      dataIndex: "regularPrice",
      key: "regularPrice",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      align: "center",
      render: (inStock) => (inStock ? "Yes" : "No"),
    },
    {
      title: "Visibility",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (isVisible, obj) => (
        <Switch
          checked={isVisible}
          loading={!!toggleLoading[obj._id]}
          onChange={(checked) => handleToggle(checked, obj)}
        />
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, obj) => (
        <Popover content={content(obj)} trigger="click">
          <EllipsisIcon style={{ cursor: "pointer" }} />
        </Popover>
      ),
    },
  ], [toggleLoading, handleToggle]);

  const closeModal = () => {
    setEditModal(true);
    setOpenModal(false);
    setModalError(false);
  };

  return (
    <DashboardLayout title={"Products"}>
      <FlexibleDiv
        width="100%"
        justifyContent="flex-end"
        margin="0px 0px 20px 0"
      >
        <Button
          backgroundColor="var(--oosriPrimary)"
          color="#fff"
          onClick={() => {
            if (isBusinessActive(user)) {
              push("/product/create");
            } else {
              dispatch({
                type: NO_BUSINESS_MODAL,
                payload: true,
              });
            }
          }}
        >
          + Add New Product
        </Button>
      </FlexibleDiv>

      <AllProductsWrapper>
        <FlexibleDiv
          flexDir="column"
          alignItems="space-between"
          className="products__table__section"
        >
          <FlexibleDiv
            flexDir="row"
            justifyContent="space-between"
            flexWrap="nowrap"
            className="search__body__section"
          >
            <FlexibleDiv
              className="search__section"
              flexDir="row"
              flexWrap="nowrap"
            >
              <SearchIcon size={18} className="search__icon" />
              <TextField
                id="search"
                className="text__field__custom"
                placeholder="Search by products name"
                autoComplete="new-password"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </FlexibleDiv>
            <Popover content={filterContent}>
              <Button
                border="1px solid #E0E0E0"
                height="38px"
                className="filter__btn__custom"
                hoverBg="transparent"
                radius="8px"
                hoverBorderColor="var(--oosriPrimary) !important"
                hoverColor="var(--oosriBlack)"
              >
                <FilterArrow size={16} color="black" />
                Filter
              </Button>
            </Popover>
          </FlexibleDiv>

          <FlexibleDiv className="products__table__wrapper">
            <Table
              columns={productsTableColumns}
              dataSource={structuredProducts}
              loading={isLoading}
              pagination={{
                current: pagination?.currentPage || filters.page,
                pageSize: filters.limit,
                total: pagination?.total || 0,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onChange: handlePageChange,
              }}
              className="table__class"
            />
          </FlexibleDiv>
        </FlexibleDiv>

        <StyledModal
          maskClosable={true}
          open={openModal}
          centered
          closeIcon={null}
          className="modal"
          footer={null}
        >
          {editModal ? (
            <>
              <h2 style={{ textAlign: "center" }}>Delete Product</h2>
              <p
                style={{
                  textAlign: "center",
                  margin: "16px 0px",
                  color: "#777777",
                }}
              >
                Are you sure you want to delete this product{" "}
                {deleteId.productName}?
              </p>
              <FlexibleDiv flexWrap="nowrap" gap="24px">
                <Button
                  border="1px solid #FC5353"
                  color="#FC5353"
                  hoverBg="white"
                  hoverColor="var(--oosriPrimary)"
                  width="100%"
                  onClick={() => setOpenModal(false)}
                >
                  No
                </Button>
                <Button
                  onClick={() => handleDelete(deleteId?._id)}
                  border="1px solid #FC5353"
                  color="white"
                  backgroundColor="var(--oosriPrimary)"
                  width="100%"
                >
                  Yes
                </Button>
              </FlexibleDiv>
            </>
          ) : modalError ? (
            <>
              <h2 style={{ textAlign: "center" }}>Product Update Failed</h2>
              <p
                style={{
                  textAlign: "center",
                  margin: "16px 0px",
                  color: "#777777",
                }}
              >
                We ran into a problem while trying to delete this product please
                try again
              </p>
              <Button
                onClick={closeModal}
                border="1px solid #FC5353"
                color="white"
                backgroundColor="var(--oosriPrimary)"
                width="100%"
              >
                Close
              </Button>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>
                Product Deleted Successfully
              </h2>
              <p
                style={{
                  textAlign: "center",
                  margin: "16px 0px",
                  color: "#777777",
                }}
              >
                Your Product has been deleted successfully
              </p>
              <Button
                onClick={closeModal}
                border="1px solid #FC5353"
                color="white"
                backgroundColor="var(--oosriPrimary)"
                width="100%"
              >
                Close
              </Button>
            </>
          )}
        </StyledModal>
      </AllProductsWrapper>
    </DashboardLayout>
  );
}