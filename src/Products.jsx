import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
  InputGroup,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";
import { FaStar, FaShoppingCart, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";

// Create CartContext within the same file
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://productapi-jsns.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Container>
        <h1 className="text-center mb-4 fw-bold" style={{ fontSize: "3rem" }}>
          Explore Our Trendy Picks ✨
        </h1>

        <InputGroup className="mb-5 w-75 mx-auto shadow-lg">
          <Form.Control
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-start-pill px-4 py-2"
          />
          <Button variant="warning" className="rounded-end-pill px-4">
            <FaSearch />
          </Button>
        </InputGroup>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <Spinner animation="border" variant="light" size="lg" />
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="h-100 border-0 shadow-lg item-card rounded-5">
                    <div
                      className="item-image-container rounded-top-5 position-relative"
                      style={{ height: "230px" }}
                    >
                      <Card.Img
                        src={product.url}
                        alt={product.name}
                        className="item-image"
                      />
                      <Badge
                        bg="info"
                        className="position-absolute top-0 end-0 px-3 py-1 fw-semibold rounded-bottom-start"
                      >
                        Featured
                      </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                      <Card.Title
                        className="fw-bold text-center fs-5 text-truncate"
                        title={product.title}
                      >
                        {product.description}
                      </Card.Title>

                      <div className="d-flex justify-content-center align-items-center mb-3">
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} className="text-warning me-1" />
                        ))}
                        <small className="text-muted ms-2">
                          (200+ reviews)
                        </small>
                      </div>

                      <h4 className="fw-bold text-center text-success mb-3">
                        ${product.price.toFixed(2)}
                      </h4>

                      <Button
                        variant="outline-dark"
                        className="w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm buy-now-btn"
                        onClick={() => addToCart(product)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100 mt-4">
                <p className="fs-4">No products found. Try another search!</p>
              </div>
            )}
          </Row>
        )}
      </Container>

      <Button
        variant="primary"
        className="rounded-circle position-fixed cart-button-glow"
        style={{
          bottom: "20px",
          right: "20px",
          width: "65px",
          height: "65px",
          fontSize: "1.5rem",
        }}
        onClick={() => setShowCart(true)}
      >
        <FaShoppingCart />
      </Button>

      {/* Cart Offcanvas */}
      <Offcanvas
        show={showCart}
        onHide={() => setShowCart(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length > 0 ? (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">{item.description}</h6>
                    <small>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </small>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

const ProductsWithCart = () => (
  <CartProvider>
    <Products />
  </CartProvider>
);

export default ProductsWithCart;
