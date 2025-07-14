import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ButtonCustom from "../../../../../components/button/ButtonCustom";
import AddLocation from "../../../../../components/addlocation/AddLocation";
import "./LocationPage.scss";

const LocationPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Thiện Nguyễn",
      phone: "0764513099",
      address: "123 th, Xã Chư Don, Huyện Chư Pưh, Gia Lai",
      isDefault: true,
    },
    {
      id: 2,
      name: "Ngọc Anh",
      phone: "0987654321",
      address: "45 Nguyễn Trãi, Phường 1, Quận 5, TP.HCM",
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id) => {
    const newList = addresses.filter((addr) => addr.id !== id);
    setAddresses(newList);
  };

  return (
    <>
      <AddLocation
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <Card style={{ borderRadius: "5px" }} className="border-0 p-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h5 className="mb-0">Địa chỉ của tôi</h5>
          </Col>
          <Col xs="auto">
            <ButtonCustom
              text="Thêm địa chỉ mới"
              icon="bi bi-plus-lg me-2"
              bgrColor="#E35765"
              onClick={() => setShowAddModal(true)}
            />
          </Col>
        </Row>

        {addresses.map((item, index) => (
          <Card
            key={item.id}
            className={index === addresses.length - 1 ? "" : "mb-3"}
          >
            <Card.Body className="p-2 border-bottom">
              <Row>
                <Col md={10}>
                  <h6 className="mb-2">
                    {item.name}{" "}
                    {item.isDefault && (
                      <span className="text-success ms-2">
                        <i className="bi bi-check-circle"></i> Địa chỉ mặc định
                      </span>
                    )}
                  </h6>
                  <div className="mb-1">
                    <span className="text-muted">Địa chỉ: </span>
                    <span className="fw-semibold">{item.address}</span>
                  </div>
                  <div>
                    <span className="text-muted">Điện thoại: </span>
                    <span className="fw-semibold">{item.phone}</span>
                  </div>
                </Col>
                <Col md={2} className="text-end">
                  <div className="d-flex flex-column align-items-end gap-1">
                    {!item.isDefault && (
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none btn-no-underline text-success"
                        onClick={() => handleSetDefault(item.id)}
                      >
                        Thiết lập mặc định
                      </Button>
                    )}
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none btn-no-underline"
                      onClick={() => handleEdit(item.id)}
                    >
                      Chỉnh sửa
                    </Button>
                    {!item.isDefault && (
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none btn-no-underline text-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xoá
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Card>
    </>
  );
};

export default LocationPage;
