import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search';
import logo from '../../images/nolan-electronics.png';

const { Item, SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const [largeScreen, setLargeScreen] = useState();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  useEffect(() => {
    let mql = window.matchMedia('(max-width: 700px)');
    mql.matches ? setLargeScreen(false) : setLargeScreen(true);
  }, []);

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <>
      {largeScreen && (
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode='horizontal'
          style={{ backgroundColor: '#f9f9f9' }}
        >
          <Item key='home'>
            <Link to='/'>
              <img
                src={logo}
                alt=''
                style={{ height: '50px' }}
                className='py-2'
              />
            </Link>
          </Item>
          <Item key='shop' icon={<ShoppingOutlined />}>
            <Link to='/shop'>Shop</Link>
          </Item>
          <Item key='cart' icon={<ShoppingCartOutlined />}>
            <Link to='/cart'>
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Item>
          {!user && (
            <>
              <Item
                key='register'
                icon={<UserAddOutlined />}
                className='float-right pt-1'
              >
                <Link to='/register'>Register</Link>
              </Item>
              <Item
                key='login'
                icon={<UserOutlined />}
                className='float-right pt-1'
              >
                <Link to='/login'>Login</Link>
              </Item>
            </>
          )}
          {user && (
            <SubMenu
              key='menu'
              icon={<SettingOutlined />}
              title={user.email && user.email.split('@')[0]}
              className='float-right pt-1 ml-5'
            >
              {user && user.role === 'subscriber' ? (
                <Item>
                  <Link to='/user/history'>Dashboard</Link>
                </Item>
              ) : (
                <Item>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </Item>
              )}
              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )}
          <span className='float-right p-1'>
            <Search />
          </span>
        </Menu>
      )}
      {!largeScreen && (
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode='horizontal'
          style={{ backgroundColor: '#f9f9f9' }}
        >
          <Item key='home'>
            <Link to='/'>
              <img
                src={logo}
                alt=''
                style={{ height: '50px' }}
                className='py-2'
              />
            </Link>
          </Item>

          {!user && (
            <SubMenu
              key='menu'
              icon={<SettingOutlined />}
              title='Welcome'
              className='float-right ml-5'
              style={{ width: '200px' }}
            >
              <Item
                key='register'
                icon={<UserAddOutlined />}
                className='float-right'
              >
                <Link to='/register'>Register</Link>
              </Item>
              <Item key='login' icon={<UserOutlined />} className='float-right'>
                <Link to='/login'>Login</Link>
              </Item>
              <Item key='shop' icon={<ShoppingOutlined />}>
                <Link to='/shop'>Shop</Link>
              </Item>
              <Item key='cart' icon={<ShoppingCartOutlined />}>
                <Link to='/cart'>
                  <Badge count={cart.length} offset={[9, 0]}>
                    Cart
                  </Badge>
                </Link>
              </Item>
            </SubMenu>
          )}
          {user && (
            <SubMenu
              key='menu'
              icon={<SettingOutlined />}
              title={user.email && user.email.split('@')[0]}
              className='float-right ml-5'
              style={{ width: '200px' }}
            >
              {user && user.role === 'subscriber' ? (
                <Item>
                  <Link to='/user/history'>Dashboard</Link>
                </Item>
              ) : (
                <Item>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </Item>
              )}
              <Item key='shop' icon={<ShoppingOutlined />}>
                <Link to='/shop'>Shop</Link>
              </Item>
              <Item key='cart' icon={<ShoppingCartOutlined />}>
                <Link to='/cart'>
                  <Badge count={cart.length} offset={[9, 0]}>
                    Cart
                  </Badge>
                </Link>
              </Item>
              <Search />
              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )}
        </Menu>
      )}
    </>
  );
};

export default Header;
