import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Tab,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import emptyImage from "../../../../../assets/image/sp/empty-order.png";
import anh1 from "../../../../../assets/image/sp/anh1.webp";

const mockOrders = [
  {
    id: "DH001",
    status: "Chờ thanh toán",
    date: "2025-07-10",
    items: [
      { name: "Sách Tâm lý học", quantity: 1, price: 125000, image: anh1 },
      { name: "Sách Giáo dục", quantity: 2, price: 98000, image: anh1 },
      { name: "Sách Lịch sử", quantity: 1, price: 119000, image: anh1 },
    ],
    total: 342000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH002",
    status: "Đã giao",
    date: "2025-07-05",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
    ],
    total: 178000,
  },
  {
    id: "DH003",
    status: "Đã giao",
    date: "2025-07-04",
    items: [
      { name: "Sách Kỹ năng sống", quantity: 2, price: 89000, image: anh1 },
      {
        name: "Sách Lịch sử Việt Nam",
        quantity: 1,
        price: 119000,
        image: anh1,
      },
    ],
    total: 297000,
  },
  {
    id: "DH004",
    status: "Đã huỷ",
    date: "2025-07-03",
    items: [{ name: "Sách Tự học", quantity: 1, price: 150000, image: anh1 }],
    total: 150000,
  },
  {
    id: "DH005",
    status: "Đang vận chuyển",
    date: "2025-07-02",
    items: [
      { name: "Sách Lập trình", quantity: 1, price: 200000, image: anh1 },
    ],
    total: 200000,
  },
];

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [visibleOrders, setVisibleOrders] = useState(3);
  const [loading, setLoading] = useState(false);

  const toggleExpand = (index) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeTab);

  const ordersToDisplay = filteredOrders.slice(0, visibleOrders);

  const loadMoreOrders = () => {
    if (visibleOrders >= filteredOrders.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleOrders((prev) => prev + 3);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 400 && !loading) {
        loadMoreOrders();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleOrders, filteredOrders]);

  useEffect(() => {
    setVisibleOrders(3); // reset khi đổi tab
  }, [activeTab]);

  return (
    <Card className="p-3 border-0" style={{ borderRadius: "5px" }}>
      <h5 className="mb-3">Đơn hàng của tôi</h5>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="all" title="Tất cả đơn" />
        <Tab eventKey="Chờ thanh toán" title="Chờ thanh toán" />
        <Tab eventKey="Đang xử lý" title="Đang xử lý" />
        <Tab eventKey="Đang vận chuyển" title="Đang vận chuyển" />
        <Tab eventKey="Đã giao" title="Đã giao" />
        <Tab eventKey="Đã huỷ" title="Đã huỷ" />
      </Tabs>

      <InputGroup className="mb-3">
        <FormControl placeholder="Tìm đơn hàng theo mã, tên sản phẩm..." />
        <Button
          style={{
            backgroundColor: "#E35765",
            outline: "none",
            border: "none",
          }}
        >
          Tìm đơn hàng
        </Button>
      </InputGroup>

      {ordersToDisplay.length === 0 ? (
        <div className="text-center py-5">
          <Image src={emptyImage} height={150} className="mb-3" />
          <div>Chưa có đơn hàng</div>
        </div>
      ) : (
        ordersToDisplay.map((order, index) => {
          const isExpanded = expandedOrders[index];
          const itemsToShow = isExpanded
            ? order.items
            : order.items.slice(0, 1);

          return (
            <Card key={index} className="mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Mã đơn:</strong> {order.id} &nbsp;|&nbsp;
                  <strong>Ngày:</strong> {order.date}
                </div>
                <span className="text-primary fw-bold">{order.status}</span>
              </Card.Header>
              <Card.Body>
                {itemsToShow.map((item, idx) => (
                  <Row key={idx} className="align-items-center mb-2">
                    <Col xs="auto" className="d-flex justify-content-center">
                      <Image
                        src={item.image}
                        style={{ width: "80px" }}
                        rounded
                      />
                    </Col>
                    <Col md={6}>
                      <div style={{ fontSize: "16px", fontWeight: "600" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        Số lượng: {item.quantity}
                      </div>
                    </Col>
                    <Col md={4} className="text-end fw-semibold">
                      {item.price.toLocaleString("vi-VN")} ₫
                    </Col>
                  </Row>
                ))}

                {order.items.length > 1 && (
                  <div className="text-center">
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none"
                      onClick={() => toggleExpand(index)}
                    >
                      {isExpanded
                        ? "Ẩn bớt"
                        : `Xem thêm (${order.items.length - 1}) sản phẩm`}
                    </Button>
                  </div>
                )}

                <hr />
                <div className="text-end fw-bold">
                  Tổng cộng: {order.total.toLocaleString("vi-VN")} ₫
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}

      {/* Spinner khi đang tải thêm */}
      {loading && (
        <div className="text-center py-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderPage;
