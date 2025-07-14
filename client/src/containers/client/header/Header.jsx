import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import logoVN from "../../../assets/image/vn.png";
import logoUS from "../../../assets/image/flags.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ButtonCustom from "../../../components/button/ButtonCustom";
import { Row, Col } from "react-bootstrap";
import imgMenu from "../../../assets/image/menu.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoLoginStorage } from "../../../redux/slices/userSlice";
import { logoutUser } from "../../../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Sách - Truyện Tranh",
    children: [
      "Bảng vẽ XP-Pen",
      "Bảng vẽ Đồ họa",
      "Bảng vẽ Màn hình",
      "Phụ kiện XP-Pen",
    ],
  },
  {
    name: "Dụng Cụ Vẽ - VPP",
    children: ["Bút vẽ", "Tẩy", "Thước kẻ"],
  },
  {
    name: "Bảng Vẽ - Phụ Kiện Số",
    children: ["Bảng vẽ điện tử", "Dây cáp", "Đế vẽ"],
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isProductActive = location.pathname.startsWith("/san-pham");

  const [logoViUs, setLogoViUs] = useState(logoVN);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decodedToken.exp > now) {
          const parsedUser = JSON.parse(user);
          dispatch(setUserInfoLoginStorage(parsedUser));
        } else {
          handleLogout("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
      } catch (error) {
        handleLogout("Đã có lỗi khi xác thực. Vui lòng đăng nhập lại.");
      }
    } else {
      console.warn("⚠️ Không tìm thấy token trong localStorage");
    }
  }, []);

  const handleLogout = (message) => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    if (message) toast.error(message);
    navigate("/dang-nhap");
  };

  const userInfo = useSelector((state) => state.user.auth.userInfo);

  const handleLanguageChange = (lang) => {
    if (logoViUs === lang) {
      setLogoViUs(lang);
    } else {
      setLogoViUs(lang);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="http://localhost:8080/logo/logo-1.webp" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="my-2 my-lg-0 d-flex justify-content-center"
              style={{ maxHeight: "100px", flex: "1" }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Trang chủ
              </NavLink>

              <div
                className="megamenu"
                onClick={() => {
                  navigate("/san-pham");
                }}
              >
                <div
                  className={`nav-link1 ${isProductActive ? "nav-active" : ""}`}
                >
                  Sản phẩm
                </div>
                <div className="dropdown-menu megamenu-content">
                  <ul className="menu-level-1">
                    {categories.map((cat, idx) => (
                      <li className="menu-item" key={idx}>
                        <span className="parent-title">
                          {cat.name}
                          <i className="bi bi-chevron-right"></i>
                        </span>
                        <ul
                          className="menu-level-2"
                          style={{ listStyle: "none" }}
                        >
                          {cat.children.map((child, i) => (
                            <li key={i}>
                              <NavLink
                                to={`/san-pham/${child
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="dropdown-item"
                              >
                                {child}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <NavLink
                to="/bai-viet"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Bài viết
              </NavLink>
              <NavLink
                to="/gioi-thieu"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/cua-hang"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Cửa hàng
              </NavLink>
            </Nav>
            <Nav
              className="d-flex align-item-center"
              style={{ userSelect: "none" }}
            >
              {/* <div
                className="d-flex align-items-center justify-content-center  fs-5 rounded-circle me-2"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              >
                <i className="bi bi-search fs-4"></i>
              </div> */}
              <div
                className="cart d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => navigate("/gio-hang")}
              >
                <i className="bi bi-cart3 fs-4"></i>
                <span className="cart-num-header">2</span>
              </div>
              <Dropdown className="me-2 dropdown-lang">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="no-caret d-flex align-items-center justify-content-center "
                  style={{
                    width: "49.6px",
                    height: "40px",
                    border: "none",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    src={logoViUs}
                    style={{
                      width: logoViUs === logoVN ? "32px" : "24px",
                      height: logoViUs === logoVN ? "32px" : "24px",
                    }}
                    alt="vn"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className="flag-item"
                    onClick={() => handleLanguageChange(logoUS)}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={logoUS} width="24" height="32" alt="en" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="flag-item"
                    onClick={() => handleLanguageChange(logoVN)}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={logoVN}
                        style={{ width: "32px", height: "32px" }}
                        alt="vi"
                      />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {userInfo === null ? (
                <ButtonCustom
                  bgrColor="#EEEEEE"
                  onClick={() => {
                    navigate("/dang-nhap");
                  }}
                  icon="bi bi-person-circle fs-5 me-2"
                  text="Tài khoản"
                  color="#DE3241"
                />
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    as="div"
                    bsPrefix="custom-toggle"
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", minWidth: "120px" }}
                  >
                    <div className="d-flex align-items-center">
                      <div style={{ width: "40px", height: "40px" }}>
                        <Image
                          // src="http://localhost:8080/avatar/chandung.jpg"
                          src={`http://localhost:8080/avatar/${
                            userInfo && userInfo.avatar
                          }`}
                          roundedCircle
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <span
                        className="ms-2 text-truncate"
                        style={{
                          maxWidth: "220px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "inline-block",
                        }}
                      >
                        {userInfo && userInfo.fullname}
                      </span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ marginTop: "8px" }}>
                    <Dropdown.Item onClick={() => navigate("/tai-khoan/ho-so")}>
                      <i className="bi bi-person-fill me-2"></i>Tài khoản
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/tai-khoan/don-hang")}
                    >
                      <i className="bi bi-card-checklist me-2"></i>Đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      style={{ color: "#DE3241" }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
