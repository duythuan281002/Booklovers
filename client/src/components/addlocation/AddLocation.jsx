import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const AddLocation = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm địa chỉ mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control type="text" placeholder="Nhập họ tên" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" placeholder="Nhập số điện thoại" />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Tỉnh thành</Form.Label>
              <Form.Select>
                <option>--</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Quận huyện</Form.Label>
              <Form.Select>
                <option>--</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Phường xã</Form.Label>
              <Form.Select>
                <option>--</option>
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="text" placeholder="Số nhà, tên đường..." />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Đặt là địa chỉ mặc định?" />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="success">Thêm địa chỉ</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddLocation;
