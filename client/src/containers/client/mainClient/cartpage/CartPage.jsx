import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import bookImage from "../../../../assets/image/sp/anh1.webp";
import imgbookempty from "../../../../assets/image/imgbookempty.jpg";
import cartempty from "../../../../assets/image/cartempty.png";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import "./CartPage.scss";
import ButtonCustom from "../../../../components/button/ButtonCustom";
import { useNavigate } from "react-router-dom";

const breadcrumbItems = [
  { label: "Trang chủ", link: "/" },
  { label: "Giỏ hàng" },
];

const CartPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: "book1",
      title: "Nuôi Con Không Phải Là Cuộc Chiến (Tái Bản 2023)",
      image: bookImage,
      price: 109500,
      quantity: 1,
      checked: false,
    },
    {
      id: "book2",
      title: "Đắc Nhân Tâm (Tái Bản 2022)",
      image: bookImage,
      price: 89000,
      quantity: 1,
      checked: false,
    },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    book1: false,
  });

  const totalPrice = products.reduce((sum, item) => {
    return item.checked ? sum + item.quantity * item.price : sum;
  }, 0);

  const handleCheckAll = () => {
    setIsLoading(true);
    const newChecked = !isCheckedAll;
    setTimeout(() => {
      const updated = products.map((item) => ({
        ...item,
        checked: newChecked,
      }));
      setProducts(updated);
      setIsCheckedAll(newChecked);
      setIsLoading(false);
    }, 1000);
  };

  const handleCheckItem = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      const updated = products.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setProducts(updated);
      setIsCheckedAll(updated.every((item) => item.checked));
      setIsLoading(false);
    }, 1000);
  };
  const handleRemoveItem = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleIncrease = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleDecrease = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="overlay-loading">
          <div className="custom-spinner"></div>
        </div>
      )}
      <Container>
        <Breadcrumb items={breadcrumbItems} />

        {products.length === 0 ? (
          <div className="bg-white text-center p-5 rounded mb-4">
            <Image src={cartempty} height={200} />
            <h5 className="mt-3 text-muted">Giỏ hàng của bạn đang trống</h5>
          </div>
        ) : (
          <>
            <h5 className="p-2" style={{ color: "#333" }}>
              GIỎ HÀNG
            </h5>
            <Row className="mb-4">
              <Col md={8}>
                <div
                  className="d-flex align-items-center bg-white p-2 text-muted fw-bold mb-3 rounded"
                  style={{ fontSize: "14px" }}
                >
                  <div
                    style={{ flex: "1" }}
                    className="d-flex align-items-center"
                  >
                    <input
                      type="checkbox"
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                      style={{
                        accentColor: "#dc3545",
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />
                    <span className="ms-2">
                      Chọn tất cả ({products.filter((p) => p.checked).length}/
                      {products.length} sản phẩm)
                    </span>
                  </div>

                  <div style={{ flexBasis: "12%" }} className="text-center">
                    Đơn giá
                  </div>
                  <div style={{ flexBasis: "14%" }} className="text-center">
                    Số lượng
                  </div>
                  <div style={{ flexBasis: "13%" }} className="text-center">
                    Thành tiền
                  </div>
                  <div style={{ width: "50px" }}></div>
                </div>

                <div className=" bg-white p-2 rounded">
                  {products.map((item, index) => (
                    <div
                      key={item.id}
                      className={`d-flex align-items-center pt-3 pb-3 ${
                        index !== products.length - 1 ? "border-bottom" : ""
                      }`}
                    >
                      <div
                        style={{ flex: "1" }}
                        className="d-flex align-items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleCheckItem(item.id)}
                          style={{
                            accentColor: "#dc3545",
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                          }}
                        />
                        <Image src={item.image} width={70} height={90} />
                        <div>{item.title}</div>
                      </div>

                      <div
                        style={{ flexBasis: "12%" }}
                        className="text-center text-danger fw-bold"
                      >
                        {item.price.toLocaleString()} đ
                      </div>

                      <div style={{ flexBasis: "14%" }} className="text-center">
                        <InputGroup className="ipQuantity1 ms-3 mt-2 justify-content-center">
                          <Button
                            className="btnDecrease"
                            onClick={() => handleDecrease(item.id)}
                          >
                            <i className="bi bi-dash btnDecrease-icon"></i>
                          </Button>
                          <FormControl
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const quantity = isNaN(val) || val < 1 ? 1 : val;
                              setProducts((prev) =>
                                prev.map((p) =>
                                  p.id === item.id ? { ...p, quantity } : p
                                )
                              );
                            }}
                            type="text"
                            min={1}
                            className="ipQuantity-input text-center"
                          />
                          <Button
                            className="btnIncrease"
                            onClick={() => handleIncrease(item.id)}
                          >
                            <i className="bi bi-plus btnIncrease-icon"></i>
                          </Button>
                        </InputGroup>
                      </div>

                      <div
                        style={{ flexBasis: "13%" }}
                        className="text-center text-danger fw-bold"
                      >
                        {(item.quantity * item.price).toLocaleString()} đ
                      </div>

                      <div style={{ width: "50px" }} className="text-center">
                        <Button
                          variant="link"
                          className="text-muted p-0"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>

              <Col md={4}>
                <div className="checkout-box bg-white p-3 rounded shadow-sm">
                  {totalPrice === 0 ? (
                    <div className="d-flex mb-3 align-items-start gap-2 border-bottom pb-2">
                      <div
                        className="rounded border d-flex justify-content-center align-items-center"
                        style={{
                          width: 70,
                          height: 90,
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <img
                          src={imgbookempty}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className="mb-2"
                          style={{
                            height: "20px",
                            backgroundColor: "#e0e0e0",
                            borderRadius: "4px",
                            width: "80%",
                          }}
                        ></div>
                        <div
                          style={{
                            height: "16px",
                            backgroundColor: "#e0e0e0",
                            borderRadius: "4px",
                            width: "50%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    products
                      .filter((p) => p.checked)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="d-flex mb-3 align-items-start gap-2 border-bottom pb-2"
                        >
                          <Image
                            src={item.image}
                            width={70}
                            height={90}
                            className="rounded border"
                          />
                          <div style={{ flex: 1 }}>
                            <h6 className="mb-1 fw-bold text-dark">
                              {item.title}
                            </h6>
                            <div
                              className="fw-bold "
                              style={{ color: "#D14552" }}
                            >
                              {(item.price * item.quantity).toLocaleString()} đ
                            </div>
                          </div>
                        </div>
                      ))
                  )}

                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span className="text-dark">Tổng cộng:</span>
                    <span style={{ color: "#D14552" }}>
                      {totalPrice.toLocaleString()} đ
                    </span>
                  </div>

                  <Button
                    className="w-100 fw-bold"
                    style={{
                      backgroundColor: "#E35765",
                      border: "none",
                      opacity: totalPrice === 0 ? 0.5 : 1,
                      pointerEvents: totalPrice === 0 ? "none" : "auto",
                    }}
                    disabled={totalPrice === 0}
                    onClick={() => navigate("/thanh-toan")}
                  >
                    Thanh toán
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
