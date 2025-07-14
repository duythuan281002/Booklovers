import React from "react";
import { Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import avatarDefault from "../../../../../assets/image/default.jpg";
import ButtonCustom from "../../../../../components/button/ButtonCustom";

const ProfilePage = () => {
  return (
    <>
      <Card style={{ borderRadius: "5px" }} className="border-0 p-3">
        <Row className="g-0">
          <Col
            md={7}
            style={{
              borderRight: "1px solid #dee2e6",
            }}
          >
            <Card style={{ border: "none" }} className="pe-3">
              <Card.Header
                style={{
                  backgroundColor: "#fff",
                  borderBottom: "none",
                  padding: " 8px 0",
                }}
              >
                <h5 className="mb-0">Thông tin cá nhân</h5>
              </Card.Header>
              <Card.Body style={{ padding: "8px 0" }}>
                <Row className="align-items-start">
                  <Col md={3} className="text-center position-relative">
                    <Image
                      src={avatarDefault}
                      roundedCircle
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "3px solid #cce5ff",
                        padding: "5px",
                      }}
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="position-absolute"
                      style={{
                        bottom: "0px",
                        right: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        padding: 0,
                      }}
                    >
                      <i
                        className="bi bi-pencil-fill"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </Button>
                  </Col>
                  <Col md={9}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ tên" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Row>
                          <Col>
                            <Form.Select>
                              <option>Ngày</option>
                            </Form.Select>
                          </Col>
                          <Col>
                            <Form.Select>
                              <option>Tháng</option>
                            </Form.Select>
                          </Col>
                          <Col>
                            <Form.Select>
                              <option>Năm</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            label="Nam"
                            name="gender"
                            type="radio"
                          />
                          <Form.Check
                            inline
                            label="Nữ"
                            name="gender"
                            type="radio"
                          />
                        </div>
                      </Form.Group>
                      <ButtonCustom
                        text="Lưu thay đổi"
                        icon="bi bi-save me-2"
                        bgrColor="#E35765"
                      />
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <h5 className="mb-4">Số điện thoại và Email</h5>

                <Row className="align-items-center mb-3">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-telephone-fill text-muted"></i>
                  </Col>
                  <Col xs={8}>
                    <div className="fw-medium">Số điện thoại</div>
                    <div className="text-muted small">0764513977</div>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{ minWidth: "75px" }}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center mb-4">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-envelope-fill text-muted"></i>
                  </Col>
                  <Col xs={8}>
                    <div className="fw-medium">Địa chỉ email</div>
                    <div className="text-muted small">
                      nguyenthien281002@gmail.com
                    </div>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{ minWidth: "75px" }}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>

                <hr />

                {/* Bảo mật */}
                <h5 className="mb-4">Bảo mật</h5>

                <Row className="align-items-center mb-3">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-lock-fill text-muted"></i>
                  </Col>
                  <Col xs={8}>Đổi mật khẩu</Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{ minWidth: "75px" }}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center mb-3">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-shield-lock-fill text-muted"></i>
                  </Col>
                  <Col xs={8}>Thiết lập mã PIN</Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{ minWidth: "75px" }}
                      disabled
                    >
                      Thiết lập
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center mb-4">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-trash-fill text-muted"></i>
                  </Col>
                  <Col xs={8}>Yêu cầu xóa tài khoản</Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      style={{ minWidth: "75px" }}
                      disabled
                    >
                      Yêu cầu
                    </Button>
                  </Col>
                </Row>

                <hr />

                {/* Liên kết MXH */}
                <h5 className="mb-4">Liên kết mạng xã hội</h5>

                <Row className="align-items-center ">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-facebook text-primary"></i>
                  </Col>
                  <Col xs={8}>Facebook</Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      style={{ minWidth: "75px" }}
                      disabled
                    >
                      Liên kết
                    </Button>
                  </Col>
                </Row>

                {/* <Row className="align-items-center">
                  <Col xs={1} className="text-center">
                    <i className="bi bi-google text-danger"></i>
                  </Col>
                  <Col xs={8}>Google</Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled
                      style={{ minWidth: "75px" }}
                    >
                      Đã liên kết
                    </Button>
                  </Col>
                </Row> */}
              </Card.Body>
            </Card>{" "}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProfilePage;
