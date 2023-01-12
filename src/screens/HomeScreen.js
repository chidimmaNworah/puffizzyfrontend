import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getError } from '../utils';
import CarouselSlide from '../components/CarouselSlide.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_PAGE_REQUEST':
      return { ...state, loadingSearchPage: true };
    case 'SEARCH_PAGE_SUCCESS':
      return {
        ...state,
        searchedProducts: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loadingSearchPage: false,
      };
    case 'SEARCH_PAGE_FAIL':
      return {
        ...state,
        loadingSearchPage: false,
        searchPageError: action.payload,
      };

    default:
      return state;
  }
};

function HomeScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || '';
  const page = sp.get('page') || 1;

  const [
    { loadingSearchPage, searchPageError, pages, searchedProducts },
    dispatch,
  ] = useReducer(logger(reducer), {
    loadingSearchPage: true,
    searchPageError: '',
  });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/changepage?page=${page}&query=${query}`
        );
        dispatch({ type: 'SEARCH_PAGE_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'SEARCH_PAGE_FAIL',
          payload: getError(searchPageError),
        });
      }
    };
    fetchData();
  }, [page, searchPageError, query]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    return `${
      skipPathname ? '' : '/changepage?'
    }&query=${filterQuery}&page=${filterPage}`;
  };

  return (
    <>
      <Helmet>
        <title>Nails Republic</title>
      </Helmet>
      <h2>
        <i className="fas fa-magic"></i> Top Products
      </h2>
      <CarouselSlide />
      <h2>
        <i className="fab fa-gitter"> </i> Featured Products
      </h2>

      <div className="products">
        {loadingSearchPage ? (
          <LoadingBox />
        ) : searchPageError ? (
          <MessageBox variant="danger">{searchPageError}</MessageBox>
        ) : (
          <>
            {searchedProducts.length === 0 && (
              <MessageBox>No Product Found</MessageBox>
            )}

            <Row>
              {searchedProducts.map((product) => (
                <Col
                  key={product.slug}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3 featured-cards"
                >
                  <Product product={product}></Product>
                </Col>
              ))}
              <div className="mt-4">
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/changepage',
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default HomeScreen;
