import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./BookBanner.scss";
import bookbanner1 from "../../../../../assets/image/bookbanner1.png";
import bookbanner2 from "../../../../../assets/image/bookbanner2.png";
import bookbanner3 from "../../../../../assets/image/bookbanner3.jpg";
import bookbanner4 from "../../../../../assets/image/bookbanner4.jpg";
import bookbanner5 from "../../../../../assets/image/bookbanner5.png";
import bookbanner6 from "../../../../../assets/image/bookbanner6.png";
import bookbgrbanner from "../../../../../assets/image/bookbgrbanner.jpg";
import ButtonCustom from "../../../../../components/button/ButtonCustom";

const categories = [
  {
    title: "Tất Cả Sách",
    image: bookbanner4,
  },
  {
    title: "Sách Văn Học",
    image: bookbanner1,
  },
  {
    title: "Sách Kĩ Năng",
    image: bookbanner2,
  },
  {
    title: "Sách Thiếu Nhi",
    image: bookbanner5,
  },
  {
    title: "Sách Kinh Doanh",
    image: bookbanner6,
  },
  {
    title: "Sách Nước Ngoài",
    image: bookbanner3,
  },
];

const BookBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="book-banner p-4">
      <Container className="mb-4">
        <Row className="g-4 justify-content-center">
          {categories.map((cat, index) => (
            <Col key={index} xs={6} md={2}>
              <div
                className="category-card text-center p-3 shadow-sm rounded"
                // onClick={() => navigate("/products")}
                style={{ cursor: "pointer", background: "#fff", width: "100%" }}
              >
                <Image
                  src={cat.image}
                  rounded
                  className="mb-3"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <h5>{cat.title}</h5>
                <span className="text-primary fw-semibold">
                  XEM NGAY &raquo;
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="book-banner-bottom text-white d-flex align-items-center ">
        <Row className="w-100 g-0 ">
          <Col md={8}>
            <Image src={bookbgrbanner} fluid />
          </Col>
          <Col
            md={4}
            className="d-flex flex-column justify-content-center align-items-start p-5"
            style={{ backgroundColor: "#E35765" }}
          >
            <p className="small text-uppercase text-white">KHÁM PHÁ KHO SÁCH</p>
            <h1 className="display-5 fw-bold text-white">TẤT CẢ SẢN PHẨM</h1>
            {/* <p className="mb-4 text-white">
              Từ sách kỹ năng, văn học, thiếu nhi đến học thuật – đa dạng thể
              loại, phù hợp với mọi lứa tuổi và sở thích. Chất lượng đảm bảo,
              giá cả hợp lý.
            </p> */}

            <ButtonCustom
              color="#E35765"
              bgrColor="white"
              text="Khám phá ngay →"
              onClick={() => navigate("/san-pham")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookBanner;
