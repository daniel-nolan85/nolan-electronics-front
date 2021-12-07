import React, { useState, useEffect } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  PoundOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import Star from '../components/forms/Star';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'Asus',
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');

    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkboxes
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          name='category'
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    setStar(num);
    fetchProducts({ stars: num });
  };

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        onClick={() => handleSub(s)}
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: 'pointer' }}
        key={s._id}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping('');
    fetchProducts({ sub });
    setSub(sub);
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className='pb-1 pl-4 pr-4 mr-5'
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setColor('');
    setShipping('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className='pb-1 pl-4 pr-4 mr-5'
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    setShipping('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingChange}
        value='Yes'
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>
      <Checkbox
        className='pb-2 pl-4 pr-4'
        onChange={handleShippingChange}
        value='No'
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <hr />
          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode='inline'
          >
            {/* price */}
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <PoundOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `£${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max='5000'
                />
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div>{showCategories()}</div>
            </SubMenu>
            {/* stars */}
            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>
            {/* sub-category */}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Sub-Categories
                </span>
              }
            >
              <div className='pl-4 pr-4'>{showSubs()}</div>
            </SubMenu>
            {/* brands */}
            <SubMenu
              key='5'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Brands
                </span>
              }
            >
              <div className='pr-5 mr-5'>{showBrands()}</div>
            </SubMenu>
            {/* colors */}
            <SubMenu
              key='6'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Colors
                </span>
              }
            >
              <div className='pr-5 mr-5'>{showColors()}</div>
            </SubMenu>
            {/* shipping */}
            <SubMenu
              key='7'
              title={
                <span className='h6'>
                  <DownSquareOutlined />
                  Shipping
                </span>
              }
            >
              <div className='pr-5 mr-5'>{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className='row pb-5'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4 mt-3'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
