//React
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

//Components
import Main from './Components/Main';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import ProductIndex from './Components/ProductIndex';

//DataBase
import axios from 'axios';

//css
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]); // 장바구니 목록
  const [products, setProducts] = useState([]); // 제품 목록
  const [selectItem, setSelectItem] = useState([]);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수 정의
    const fetchData = async () => {
      try {
        // axios를 사용하여 서버에서 데이터 가져오기
        const response = await axios.get('https://reactdb-qwtma.run.goorm.site/products');

        // 가져온 데이터를 state에 설정
        setProducts(response.data);
      } catch (error) {
        console.error('제품 목록을 불러오는 동안 오류가 발생했습니다:', error);
        alert(`제품 목록을 불러오는 동안 ${error}가 발생했습니다.`);
      }
    };
    fetchData(); // 함수 호출
  }, []);

  const addToCart = (product) => {
    // 장바구니 제품 추가
    const itemExists = cartItems.find((item) => item.id === product.id);
    

    if (itemExists) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + product.price };
        }
        return item;
      });

      setCartItems(updatedCartItems); // 배열의 요소를 수정, 새로운 배열을 반환하여 장바구니에 제품을 추가
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, totalPrice: product.price }]);
    }
    console.log(`장바구니에 ${product.name} 제품이 추가됨`);
    alert(`장바구니에 ${product.name} 제품이 추가되었습니다`);
  };

  const updateCartItem = (id, newQuantity) => {
    // Quantity = 수량
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }; // 배열의 요소를 수정, 새로운 배열을 반환
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (id) => {
    // Remove the item from the cart
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  // 총 가격 계산
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="container" style={{ marginTop: 50 }}>
        <nav style={{marginLeft:'-30'}}> 
          <h1>
            <Link style={{fontSize: '30px'}} className="link" to="/Main">
              강냉몰
            </Link>
          </h1>
          <ul>
            <li>
              <Link className="link" to="/Main">
                메인페이지
              </Link>
            </li>
            <li>
              <Link className="link" to="/products">
                제품목록
              </Link>
            </li>
            <li>
              <Link className="link" to="/cart">
                장바구니
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/Main" element={<Main />} />

          {/* 제품목록 */}
          <Route path="/products" element={<Products products={products} addToCart={addToCart} setSelectItem={setSelectItem} />} />

          {/* 장바구니 */}
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} updateCartItem={updateCartItem} calculateTotalPrice={calculateTotalPrice} removeFromCart={removeFromCart} />
            }
          />
          {/* 결제하기 */}
          <Route path="/payment" element={<Payment cartItems={cartItems} calculateTotalPrice={calculateTotalPrice} />} />

          {/*상품정보 */}
          <Route path="/productIndex" element={<ProductIndex product={selectItem} addToCart={addToCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
