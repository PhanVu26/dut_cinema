import React from "react";
import { Link } from "react-router-dom";

function Promotion002_MiloDay() {
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
          <p style={fontSize}>Ngày Thành Viên - Milo Day</p>
        </div>
      </div>

      <div style={content_text}>
        <p></p>
        <p>
          Bước sang năm mới, Galaxy dành tặng các Stars thêm một ngày tràn đầy
          “yêu thương” – <strong>Milo Day</strong>.
        </p>

        <p>
          Từ tháng 01/2021, <strong>Galaxy Cinema</strong>
          thực hiện chương trình vô cùng đặc biệt mang tên{" "}
          <strong>Milo Day</strong>.
        </p>

        <p>
          Cụ thể vào <strong>Thứ 4 cuối cùng mỗi tháng</strong>, khách hàng
          thành viên Galaxy Cinema khi mua Milo ly 22oz sẽ chỉ với giá{" "}
          <strong>9.000 VNĐ</strong>. Bạn chỉ cần trình thẻ thành viên/ app
          Galaxy là đã có thể sở hữu một ly Milo ngọt ngào với giá siêu “mềm”.
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            height="349"
            src="https://www.galaxycine.vn/media/2021/3/24/1135x660_1616560030778.jpg"
            width="600"
            class="loading"
            data-was-processed="true"
          />
        </p>

        <p>
          Như vậy, sau <strong>Ngày Tri Ân</strong> và{" "}
          <strong>Happy Day</strong>, <strong>Milo Day</strong> sẽ là sự kiện
          quan trọng tiếp theo của Galaxy mà bạn không nên bỏ qua!
        </p>

        <p>
          Hẹn gặp các Stars&nbsp;vào ngày 31/03/2021 nhé!
          <br />
        </p>
        <p></p>
      </div>
    </div>
  );
}

export default Promotion002_MiloDay;
