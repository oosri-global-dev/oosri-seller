import { Space } from "antd";
import { FaEllipsis } from "react-icons/fa6";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import Link from "next/link";

const SortSVG=()=>(
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 4.125L4.625 0.75M4.625 0.75L8 4.125M4.625 0.75V10.875M14.75 10.875L11.375 14.25M11.375 14.25L8 10.875M11.375 14.25L11.375 4.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const orderTableColumns = [
    {
      title: ()=>(
        <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
            <p>Order Id</p>
            <SortSVG />
        </FlexibleDiv>
      ),
      dataIndex: "orderId",
      key: "orderId",
      render: (_,obj) => (
          <Space direction="vertical" size={1}>
            <p>{_}</p>
            <p className="item__number">{obj.itemNum} item</p>
          </Space>
      ),
      sorter: (a, b) => a.orderId - b.orderId,
      sortIcon: ({sortOrder})=>(
        <FlexibleDiv className="sort__icons">

        </FlexibleDiv>
        ),
    },
    {
        title: ()=>(
            <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
                <p>Customer</p>
                <SortSVG />
            </FlexibleDiv>
          ),
      dataIndex: "customer",
      key: "customer",
      render: (_) => (
        <Space direction="column">
         <p>{_}</p>
        </Space>
      ),
    },
    {
      title: ()=>(
        <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
            <p>Amount</p>
            <SortSVG />
        </FlexibleDiv>
      ),
      dataIndex: "amount",
      key: "amount",
      sortIcon: ({sortOrder})=>(
        <FlexibleDiv className="sort__icons">

        </FlexibleDiv>
        ),
      render:(_)=>(
        <p>
            ₦{_.toLocaleString()}
        </p>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: ()=>(
            <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
                <p>Date</p>
                <SortSVG />
            </FlexibleDiv>
       ),
      dataIndex: "date",
      key: "date",
      render: (_) => (
        <Space>
          <p>{_}</p>
        </Space>
      ),
    },
    {
    title: ()=>(
        <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
            <p>Status</p>
            <SortSVG />
        </FlexibleDiv>
        ),
      dataIndex: "status",
      key: "status",
      render:(_,obj)=>(
        <Space size="middle">
          {_?.toLowerCase() === "sent for pickup" && (
            <p className="sent__pickup">{_}</p>
          )}
          {_?.toLowerCase() === "delivered" && (
            <p className="delivered__pickup">{_}</p>
          )}
        </Space>
      )
    },
    {
     title: ()=>(
        <FlexibleDiv flexWrap="noWrap" gap="5px" className="sort__icons" justifyContent="start">
            <p>Payment Status</p>
            <SortSVG />
        </FlexibleDiv>
      ),
      dataIndex: "paymentStatus",
      render: (_, obj) => {

        const togglePopup = () => {
            const element =document.getElementById(obj.orderId)
            if(element){
                console.log(element.classList)
                if(element.classList.length>1){
                    element.classList.remove("invinsible")
                }else{
                    element.classList.add("invinsible")
                }
            }
         };
    
        return(
            <FlexibleDiv justifyContent="space-between" padding="0px 6px 0px 0px"  >
                <p className={_.toLowerCase()==="paid"?"paid":"delivery_pay"}>{_}</p>
                <div className="details__container">
                <FaEllipsis onClick={togglePopup} />
                <Link href={`/order/${obj.orderId.slice(1)}`} className="details__popup invinsible" id={obj.orderId}>
                    <div>
                     <p>View Details</p>    
                    </div>
                </Link>

                </div>
            </FlexibleDiv>
        )
      },
    }
];
  
  export const orderTableData = [
    {
      orderId: "#77778",
      itemNum:2,
      customer: "Ajayi Opeyemi",
      amount: 7000,
      date:"2023-10-15 09:30:00",
      status: "Sent for pickup",
      paymentStatus: "paid",
    },
    {
      orderId: "#00907",
      itemNum:2,
      customer: "James Murray",
      amount: 7000,
      date:"2023-10-15 09:30:00",
      status: "delivered",
      paymentStatus: "Pay on delivery",
    },
  ];
  