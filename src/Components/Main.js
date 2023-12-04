import { React, useState } from 'react';

import 야옹 from '../img/MainImg/야옹.jpg';
import 호영 from '../img/MainImg/호영.webp';
import 햄스터 from '../img/MainImg/햄스터.jpg';
import 깃허브 from '../img/MainImg/깃허브.png';

import Chat from './Chat';

const Main = () => {
  const gitUrl = 'https://github.com/';
  const ids = ['H5Y0UNG', 'dldpw', 'Neogul02'];
  const userProfile = ['202104186 김호영', '202004228 이예진', '202004123 최진형'];

  const [김호영, 이예진, 최진형] = userProfile;
  const [showImages, setShowImages] = useState(false);

  const handleToggleImages = () => {
    setShowImages((prev) => !prev);
  };

  return (
    <div className="center" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Main page</h2>

      <button className="sd" onClick={handleToggleImages}>
        Team Info
      </button>

      {showImages && (
        <div style={imagesContainerStyle}>
          <div style={containerStyle}>
            <img alt="김호영" style={imageStyle} className="MainImg" src={호영} />
            <div style={textContainerStyle} id="userProfile">
              {김호영}
              <a href={gitUrl + ids[0]}>
                <img style={iconStyle} alt="깃허브" src={깃허브} />
              </a>
            </div>
          </div>

          <div style={containerStyle}>
            <img alt="이예진" style={imageStyle} className="MainImg" src={햄스터} />
            <div style={textContainerStyle} id="userProfile">
              {이예진}
              <a href={gitUrl + ids[1]}>
                <img style={iconStyle} alt="깃허브" src={깃허브} />
              </a>
            </div>
          </div>

          <div style={containerStyle}>
            <img alt="최진형" style={imageStyle} className="MainImg" src={야옹} />
            <div style={textContainerStyle} id="userProfile">
              {최진형}
              <a href={gitUrl + ids[2]}>
                <img style={iconStyle} alt="깃허브" src={깃허브} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div style={{ margin: 15 }} className="Chatbot">
        패션 AI 챗봇
      </div>

      <Chat />

      <div style={{ marginTop: 200 }}>Address: 이공관(102호), 대표전화: 010-8366-2414</div>
    </div>
  );
};

const imagesContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  padding: 5,
};

const iconStyle = {
  width: 25,
  height: 25,
  padding: 5,
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px', // Adjust the margin as needed to control the spacing
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

export default Main;
