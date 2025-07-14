import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import imgmomo from "../../../../assets/image/bangking/momo.jpg";
import imgmbbank from "../../../../assets/image/bangking/mbbank.jpg";
import bookImage from "../../../../assets/image/sp/anh1.webp"; // Giả sử ảnh mẫu
import "./PayPage.scss";
import ButtonCustom from "../../../../components/button/ButtonCustom";
import { Link } from "react-router-dom";

const breadcrumbItems = [
  { label: "Trang chủ", link: "/" },
  { label: "Thanh toán" },
];

const products = [
  {
    id: "book1",
    title: "Nuôi Con Không Phải Là Cuộc Chiến (Tái Bản 2023)",
    image: bookImage,
    price: 109500,
    quantity: 1,
  },
  {
    id: "book2",
    title: "Đắc Nhân Tâm (Tái Bản 2022)",
    image: bookImage,
    price: 89000,
    quantity: 1,
  },
];

const PayPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingFee = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal + shippingFee - discountValue;

  const handleApplyDiscount = () => {
    setIsApplying(true);

    setTimeout(() => {
      if (discountCode.trim().toUpperCase() !== "BOOK123") {
        setError(`Mã khuyến mãi ${discountCode} không khả dụng`);
        setDiscountValue(0);
      } else {
        setError("");
        setDiscountValue(20000);
      }
      setIsApplying(false);
    }, 1000);
  };

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} />

      <Row className="mb-4">
        {/* Bên trái */}
        <Col md={6}>
          {/* Thông tin vận chuyển */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Thông tin vận chuyển</Card.Title>
              <div>
                Giao hàng đến <strong>Q.1, P. Bến Nghé, Hồ Chí Minh</strong>{" "}
                <a href="#">Thay đổi</a>
              </div>
              <div className="mt-2">
                <i className="bi bi-truck text-success"></i> Giao Thứ Hai -{" "}
                <strong>14/07</strong> | <del>32.700₫</del>{" "}
                <span className="badge bg-success mb-1">Freeship</span>
                <div className="text-muted small">
                  Freeship cho đơn hàng từ 300k
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Phương thức thanh toán */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Phương thức thanh toán</Card.Title>
              <Form>
                {/* COD */}
                <div className="d-flex align-items-center mb-2 p-2 rounded border">
                  <Form.Check
                    type="radio"
                    label="Thanh toán khi giao hàng (COD)"
                    name="paymentMethod"
                    value="cod"
                    checked={selectedMethod === "cod"}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                </div>
                {selectedMethod === "cod" && (
                  <div
                    className="text-danger p-3 mb-2 ps-4"
                    style={{ backgroundColor: "#E8E8E8" }}
                  >
                    Bạn chỉ phải thanh toán khi nhận được hàng.
                  </div>
                )}

                {/* BANK */}
                <div className="d-flex align-items-center mb-2 p-2 rounded border">
                  <Form.Check
                    type="radio"
                    label="Chuyển khoản qua ngân hàng"
                    name="paymentMethod"
                    value="bank"
                    checked={selectedMethod === "bank"}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                </div>
                {selectedMethod === "bank" && (
                  <div
                    className="p-2 mb-2"
                    style={{
                      backgroundColor: "#D7E2F6",
                      border: "1px solid #eee",
                    }}
                  >
                    <div className="text-danger mb-3">
                      Vui lòng chuyển khoản đến số tài khoản được cung cấp sau
                      khi đặt hàng.
                    </div>
                    <div className="d-flex align-items-center">
                      <div style={{ flex: 1 }}>
                        <p className="mb-1">
                          <strong>Ngân hàng:</strong> MB Bank
                        </p>
                        <p className="mb-1">
                          <strong>Số tài khoản:</strong> 128102002
                        </p>
                        <p className="mb-1">
                          <strong>Chủ tài khoản:</strong> Nguyễn Duy Thuần
                        </p>
                        <p className="mb-1">
                          <strong>Nội dung:</strong> DH-1234123
                        </p>
                      </div>
                      <div style={{ flex: "0 0 120px", marginLeft: "20px" }}>
                        <img
                          src={imgmbbank}
                          alt="QR Code"
                          style={{
                            width: "200px",
                            border: "1px solid #ddd",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MoMo */}
                <div className="d-flex align-items-center mb-2 p-2 rounded border">
                  <Form.Check
                    type="radio"
                    label="Ví MoMo"
                    name="paymentMethod"
                    value="momo"
                    checked={selectedMethod === "momo"}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  />
                </div>
                {selectedMethod === "momo" && (
                  <div
                    className="p-2 mb-2"
                    style={{
                      backgroundColor: "#E8E8E8",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div className="text-danger mb-3">
                      Bạn sẽ được chuyển đến ứng dụng MoMo để hoàn tất thanh
                      toán.
                    </div>
                    <div className="d-flex">
                      <div style={{ flex: 1 }}>
                        <p className="mb-1">
                          <strong>Ví MoMo:</strong> 0901234567
                        </p>
                        <p className="mb-1">
                          <strong>Chủ ví:</strong> Nguyễn Văn A
                        </p>
                        <p className="mb-1">
                          <strong>Nội dung:</strong> Thanh toan don hang #1234
                        </p>
                      </div>
                      <div style={{ flex: "0 0 120px", marginLeft: "20px" }}>
                        <img
                          src={imgmomo}
                          alt="QR MoMo"
                          style={{
                            width: "100%",
                            border: "1px solid #bbb",
                            borderRadius: "6px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          {/* Thông tin khác */}
          <Card>
            <Card.Body>
              <Card.Title>Thông tin khác</Card.Title>
              <Form.Group controlId="note">
                <Form.Label>Ghi chú cho Booklovers</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Thông tin ghi chú"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Bên phải */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Đơn hàng ({products.length} sản phẩm)</Card.Title>

              {/* Danh sách sản phẩm */}
              {products.map((product) => (
                <div
                  className="d-flex mb-3 border-bottom pb-2"
                  key={product.id}
                >
                  <Image
                    src={product.image}
                    width={50}
                    height={60}
                    rounded
                    className="me-2"
                  />
                  <div>
                    <strong>{product.title}</strong>
                    <div>{product.price.toLocaleString()}₫</div>
                  </div>
                </div>
              ))}
              <Form.Group className="mb-3 d-flex" style={{ gap: "8px" }}>
                <FloatingLabel
                  controlId="discountCode"
                  label="Nhập mã giảm giá"
                  style={{ flex: 1 }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    isInvalid={!!error}
                  />
                </FloatingLabel>

                <Button
                  variant="primary"
                  className="px-4 d-flex align-items-center justify-content-center"
                  onClick={handleApplyDiscount}
                  disabled={isApplying || !discountCode.trim()}
                  style={{ minWidth: "110px" }}
                >
                  {isApplying ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                    </>
                  ) : (
                    "Áp dụng"
                  )}
                </Button>
              </Form.Group>
              {error && (
                <div
                  className="text-danger small mb-2"
                  style={{ marginTop: "-8px" }}
                >
                  {error}
                </div>
              )}

              {/* Tổng kết */}
              <div className="d-flex justify-content-between mb-1">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString()}₫</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString()}₫</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()}₫</span>
              </div>

              {/* Nút điều hướng */}
              <div className="d-flex justify-content-between mt-3">
                <Link to="/gio-hang" className="text-decoration-none">
                  &lt; Quay về giỏ hàng
                </Link>
                <ButtonCustom text="Đặt hàng" bgrColor="#E35765" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PayPage;
