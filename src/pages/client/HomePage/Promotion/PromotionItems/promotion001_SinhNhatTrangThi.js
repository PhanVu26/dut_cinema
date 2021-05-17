import React from "react";
import { Link } from "react-router-dom";

function Promotion001_SinhNhatTrangThi() {
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
          <p style={fontSize}>Sinh Nhật Tràng Thi, Nhận Quà Mệt Nghỉ</p>
        </div>
      </div>

      <div style={content_text}>
        <p></p>
        <p>
          Vô vàn phần quà hấp dẫn dành tặng cho các Stars nhân dịp mừng sinh
          nhật 2 tuổi của Galaxy Tràng Thi.
        </p>

        <p>
          Từ ngày 01/04/2021 - 30/04/2021, các Stars khi đến xem phim tại Galaxy
          Tràng Thi sẽ có cơ hội nhận được nhiều phần quà đặc biệt. Cụ thể:
        </p>

        <ul>
          <li>
            Trước 17h00 mỗi ngày: Tặng 01 phần bỏng ngọt khi mua 02 vé xem phim.
          </li>
          <li>
            Sau 17h00 mỗi ngày: Tặng voucher M1T1 (Mua 1 vé tặng 1 vé) khi mua
            02 vé xem phim và check in tại Galaxy Tràng Thi. &nbsp;
          </li>
        </ul>

        <p>
          Ngoài ra, chỉ cần thực hiện chấm điểm 5* và chia sẻ cảm nhận, đánh giá
          về Galaxy Tràng Thi trên Google Maps, bạn sẽ được nhận ngay 01 phần
          bỏng ngọt.&nbsp;
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            height="349"
            src="https://www.galaxycine.vn/media/2021/3/30/1135x660_1617074397836.jpg"
            width="600"
            class="loading"
            data-was-processed="true"
          />
        </p>

        <p>
          <strong>Điều kiện chương trình:</strong>
        </p>

        <ul>
          <li>Chương trình chỉ áp dụng tại Galaxy Tràng Thi</li>
          <li>Thời gian áp dụng từ 01/04 - 30/04/2021</li>
        </ul>

        <p>
          <strong>Điều kiện áp dụng voucher M1T1:</strong>
        </p>

        <ul>
          <li>Thời hạn sử dụng: từ ngày 01/04/2021 - 30/05/2021</li>
          <li>01 voucher tương ứng 01 vé xem phim 2D miễn phí</li>
          <li>
            Chỉ áp dụng cho 01 vé xem phim có phát sinh doanh thu cùng suất
            chiếu
          </li>
          <li>Chỉ áp dụng cho giao dịch trực tiếp tại quầy</li>
          <li>
            Không áp dụng trong Lễ, Tết, Ngày tri ân, Happy Day và suất chiếu
            sớm
          </li>
          <li>
            Voucher không có giá trị khi bị rách, tẩy xóa, hư hỏng và chưa đóng
            dấu
          </li>
          <li>Voucher không có giá trị quy đổi thành tiền mặt</li>
        </ul>

        <p>
          <strong>
            Trong mọi trường hợp, quyết định của Galaxy là quyết định cuối
            cùng.&nbsp;
          </strong>
          <br />
        </p>
        <p></p>
      </div>
    </div>
  );
}

export default Promotion001_SinhNhatTrangThi;
