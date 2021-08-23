import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import React from "react";
import "./UnauthPage.css";
function UnAuthPage() {
  const history = useHistory();
  return (
    <div className="main">
      <div id="particles" className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <main>
        <section>
          <div>
            <span>4</span>
            <span className="circle">0</span>
            <span>3</span>
          </div>
          <p>
            Xin lỗi, bạn không có quyền truy cập vào trang này.
          </p>
          <div>
            <a>
              <button onClick={() => history.goBack()}>Quay lại trang trước</button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UnAuthPage;