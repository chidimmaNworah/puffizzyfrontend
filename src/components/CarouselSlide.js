import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Badge, Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CarouselSlide() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === products._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div>
      <div className="my-4">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Carousel showArrows autoPlay showThumbs={false}>
            {products.map((product) => (
              <div className="outer">
                <div className="the-slides outer-slide">
                  <h3 className="text-white">SHOP NOW</h3>
                  <h3 className="text-white">AND</h3>
                  <h3 className="text-white">STAND A CHANCE!!!</h3>
                  <p className="first-slide-name outer-slide">
                    {product.description}
                  </p>
                  {product.countInStock === 0 ? (
                    <Button variant="light" disabled>
                      Out of stock
                    </Button>
                  ) : (
                    <Button onClick={() => addToCartHandler(product)}>
                      Shop Now
                    </Button>
                  )}
                </div>

                <div className="inner-slide">
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-decoration-none"
                  >
                    <img src={product.image} alt={product.name} />
                    <p className="slide_name">{product.name} </p>
                  </Link>
                </div>
                <ListGroup variant="flush" className="outer-slide outer-items">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>₦{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
