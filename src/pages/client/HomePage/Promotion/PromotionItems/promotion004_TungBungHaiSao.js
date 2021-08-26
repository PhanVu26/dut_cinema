import React from "react";
import { Link } from "react-router-dom";

function Promotion004_TungBungHaiSao() {
  let color = {
    color: "#b9b9b9",
  };
  let fontSize = {
    fontSize: "25px",
  };

  const styleAlign = {
    textAlign: "center",
  };

  const content_text = {
    margin: "30px 0",
    fontSize: "20px",
    textAlign: "justify",
  };

  const style2 = {
    margin: "0in 0in 8pt",
    fontSize: "18px",
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-12">
          <span>
            <Link to="/" href="#" title="trang chủ " className="links">
              Trang Chủ
            </Link>
            <span style={color}> {`>`} </span>
            <Link to="/promotion" href="#" title="ưu đãi" className="links">
              Ưu đãi
            </Link>
            <span style={color}> {`>`} </span>
            <span> Khuyến mãi</span>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p style={fontSize}>TƯNG BỪNG HÁI "SAO" – NHẬN ƯU ĐÃI KHỦNG</p>
        </div>
      </div>

      <div class={content_text}>
        <p></p>
        <p>
          <span style={style2}>
            <i>
              Galaxy Cinema ra mắt hệ thống tích điểm thành viên hoàn toàn mới!
            </i>
          </span>
        </p>

        <p>
          <span style={style2}>
            Từ 31.3.2021, các Star <strong>sẽ được thăng hạng thành </strong>
            Star, G-star, X-star tương ứng với
            <strong> tổng chi tiêu trong năm 2021</strong> và
            <strong> nhận các ưu đãi đặc biệt mới</strong>:
          </span>
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            src="https://www.galaxycine.vn/media/2019/12/9/thanh-tinh-diem_1575875113783.jpg"
            width="600"
            class="loading"
            data-was-processed="true"
          />
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            height="302"
            src="https://www.galaxycine.vn/media/2019/12/31/bangquyenloi_1577780325222.jpg"
            width="600"
            class="loading"
            data-was-processed="true"
          />
        </p>
        <p>
          <span style={style2}>
            Thành viên mua bất kỳ sản phẩm vé xem phim, nước uống, thức ăn,
            combo … tại các cụm rạp Galaxy hoặc thanh toán trực tuyến sẽ được
            tích lũy điểm thưởng tương ứng vào tài khoản
          </span>
        </p>

        <p>
          <span style={style2}>
            Lưu ý: Đối với những giao dịch trực tuyến, thành viên phải đăng nhập
            vào tài khoản mới được quyền tích điểm hợp lệ.&nbsp;
          </span>
        </p>

        <p>
          <span style={style2}>
            <strong>Đổi quà hấp dẫn:</strong>
          </span>
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            height="329"
            src="https://www.galaxycine.vn/media/2019/12/30/cs-doi-qua_1577691054615.jpg"
            width="600"
          />
        </p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export default Promotion004_TungBungHaiSao;
