import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";

const AddressUser = ({ addresses, onClose, onConfirm }) => {
  const [selectedId, setSelectedId] = useState(
    addresses.find((addr) => addr.is_default === 1)?.id || null
  );
  const [sortedAddresses, setSortedAddresses] = useState([]);

  // Khi selectedId thay đổi => sắp xếp lại: đưa địa chỉ đã chọn lên đầu
  useEffect(() => {
    if (selectedId) {
      const sorted = [...addresses].sort((a, b) => {
        if (a.id === selectedId) return -1;
        if (b.id === selectedId) return 1;
        return 0;
      });
      setSortedAddresses(sorted);
    } else {
      setSortedAddresses(addresses);
    }
  }, [selectedId, addresses]);

  const handleConfirm = () => {
    if (selectedId) {
      onConfirm(selectedId);
    }
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Địa chỉ của tôi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {sortedAddresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded p-3 mb-3 d-flex justify-content-between align-items-start ${
                selectedId === addr.id ? "border-success" : ""
              }`}
              style={{
                backgroundColor: selectedId === addr.id ? "#f9fff9" : "#fff",
              }}
            >
              <Form.Check
                type="radio"
                name="selectedAddress"
                id={`address-${addr.id}`}
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id)}
              />
              <div className="ms-3 flex-grow-1">
                <strong>{addr.fullname || "Không rõ tên"}</strong>{" "}
                {addr.is_default === 1 && (
                  <Badge bg="light" text="success" className="ms-2">
                    <i className="bi bi-check-circle-fill text-success me-1"></i>
                    Địa chỉ mặc định
                  </Badge>
                )}
                <p className="mb-1">Địa chỉ: {addr.address}</p>
                <p className="mb-1">Điện thoại: {addr.phone}</p>
              </div>
              <div>
                <Button variant="link" className="text-primary p-0">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="danger">+ Thêm địa chỉ mới</Button>

        <div>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="success" onClick={handleConfirm} className="ms-2">
            Chọn
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressUser;
