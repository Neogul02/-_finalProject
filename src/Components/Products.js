import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Products = ({ products, addToCart, setSelectItem }) => {

  const navigate = useNavigate();
  const goToProductIndex = (product, setSelectItem) => {
    if(setSelectItem){
      console.log('제품상세 탭으로 이동');
      setSelectItem(product)
      navigate('/productIndex');
    }
  }

  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 카테고리 목록 추출 및 중복 제거
  const categories = [...new Set(products.map(product => product.category))];
  categories.unshift('전체'); // 전체 카테고리 추가

  // 카테고리 필터링 함수
  const filterByCategory = category => {
    setSelectedCategory(category);
  };

  // 선택된 카테고리에 따라 제품 필터링
  const filteredProducts = selectedCategory === '전체' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Products Page</h2>
      <div className="category-buttons" style={buttonContainerStyle}>
        {categories.map(category => (
          <button key={category} onClick={() => filterByCategory(category)} style={selectedCategory === category ? selectedButtonStyle : buttonStyle}>
            {category}
          </button>
        ))}
      </div>
      <div style={containerStyle}>
        {filteredProducts.map(product => (
          <div key={product.id} style={productStyle}>
            <div >
              <img onClick={() => goToProductIndex(product, setSelectItem)} style={imageStyle} alt={product.name} src={product.img} />
            </div>
            <div style={contentStyle}>
              <div>{product.name} - {product.price.toLocaleString()}원</div>
              <button style={{border: '1px solid #ccc',}} onClick={() => addToCart(product)}>장바구니에 추가</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap', // 줄 바꿈을 허용
  justifyContent: 'center', // 가운데 정렬
  padding: '20px 100px', // 전체 페이지의 좌우 여백
};

const buttonContainerStyle = {
  marginBottom: '20px', // 버튼과 제품 목록 사이에 여백 추가
  display: 'flex', // 버튼을 가로로 배열
  justifyContent: 'center', // 버튼을 중앙에 배치
};

const buttonStyle = {
  margin: '0 5px', // 버튼 사이에 여백 추가
  padding: '10px', // 버튼 내부에 여백 추가
  backgroundColor: '#f0f0f0', // 버튼 배경색
  border: 'none', // 버튼 테두리 제거
  cursor: 'pointer', // 마우스 커서를 포인터로 변경
};

const selectedButtonStyle = {
  ...buttonStyle, // 기본 버튼 스타일을 상속
  backgroundColor: '#007BFF', // 선택된 버튼의 배경색을 변경
  color: 'white', // 선택된 버튼의 글자색을 변경
};

const productStyle = {
  width: '25%', // 한 줄에 3개씩 표시
  paddingBottom: '25%', // 정사각형 모양으로 만들기
  position: 'relative',
  border: '1px solid #ccc',
  boxSizing: 'border-box', // padding과 border를 요소의 크기에 포함시킴
  margin: '0 0 15px 15px', // 각 제품의 여백
  cursor: 'pointer',
};

const imageStyle = {
  width: '80%', // 이미지 크기를 조절
  height: '80%', // 이미지 크기를 조절
  objectFit: 'contain', // 이미지 비율 유지
  position: 'absolute',
  top: '50%', // 상단 중앙으로 이동
  left: '50%', // 좌측 중앙으로 이동
  transform: 'translate(-50%, -50%)', // 가운데 정렬
  cursor: 'pointer',
};

const contentStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '10px',
  background: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
};

export default Products;

