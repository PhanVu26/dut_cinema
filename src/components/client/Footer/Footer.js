import React from "react";
import "./styles/FooterStyles.css";

const Footer = () => {
  return (
    <div className="footer-content">
      <footer className="footer-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
              <ul className="ul-list-items">
                <li className="li-list-items">
                  <h5 className="title-widget">GIỚI THIỆU</h5>
                  <ul className="list-items">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>VỀ CHÚNG TÔI
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>THỎA THUẬN
                        SỬ DỤNG
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>QUY CHẾ HOẠT
                        ĐỘNG
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>CHÍNH SÁCH
                        BẢO MẬT
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* another */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
              <ul className="ul-list-items">
                <li className="li-list-items">
                  <h5 className="title-widget">GÓC ĐIỆN ẢNH</h5>
                  <ul className="list-items">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>THỂ LOẠI
                        PHIM
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>BÌNH LUẬN
                        PHIM
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>BLOG ĐIỆN
                        ẢNH
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>PHIM HAY
                        THÁNG
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* another */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
              <ul className="ul-list-items">
                <li className="li-list-items">
                  <h5 className="title-widget">HỖ TRỢ</h5>
                  <ul className="list-items">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>GÓP Ý
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>SALE &
                        SERVICES
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>RẠP / GIÁ VÉ
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-double-right"></i>TUYỂN DỤNG
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* another */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
              <ul className="ul-list-items">
                <li className="li-list-items">
                  <h5 className="title-widget">KẾT NỐI CINEMA</h5>
                  <ul className="list-items">
                    <li>
                      <a href="#">
                        <img
                          src="https://img.icons8.com/nolan/32/facebook-new.png"
                          alt="facebook-icon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="https://img.icons8.com/fluent/32/000000/youtube-play.png"
                          alt="youtube-icon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="https://img.icons8.com/fluent/32/000000/instagram-new.png"
                          alt="instagram-icon"
                        />
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="li-list-items">
                  <h5 className="title-widget">DOWNLOAD APP</h5>
                  <ul className="list-items">
                    <li>
                      <a href="#">
                        <img
                          src="https://img.icons8.com/color/32/000000/apple-app-store--v3.png"
                          alt="apple-store-icon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="https://img.icons8.com/color/32/000000/google-play.png"
                          alt="goole-play-icon"
                        />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* another */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
