import { useHistory } from 'react-router-dom';
import React from "react";
import "./NotFoundPage.css";
function NotFoundPage() {
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
          <h1>Page Not Found!</h1>
          <div>
            <span>4</span>
            <span className="circle">0</span>
            <span>4</span>
          </div>
          <p>
            Chúng tôi không thể tìm thấy trang
            <br />
            bạn đang tìm kiếm
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

export default NotFoundPage;