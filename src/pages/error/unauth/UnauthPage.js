import { Link } from "react-router-dom";
import React from "react";
import "./UnauthPage.css";
function UnAuthPage() {
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
            <Link to="/">
              <button>Quay lại trang chủ</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UnAuthPage;