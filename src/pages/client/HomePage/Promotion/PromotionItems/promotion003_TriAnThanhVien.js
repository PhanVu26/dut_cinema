import React from "react";
import { Link } from "react-router-dom";

function Promotion003_TriAnThanhVien() {
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
          <p style={fontSize}>DUT Cinema Tri Ân Thành Viên</p>
        </div>
      </div>

      <div className={content_text}>
        <p></p>
        <p style={style2}>
          Tri ân tình cảm của các Stars, <b>DUT Cinema</b> dành tặng hàng loạt
          ưu đãi chưa – từng – có mừng 2021.{" "}
        </p>

        <p style={styleAlign}>
          <img
            alt=""
            height="383"
            src="https://www.galaxycine.vn/media/2021/1/18/1035x660_1610956392715.png"
            width="600"
            class="loading"
            data-was-processed="true"
          />
        </p>

        <p style={style2}>
          &nbsp; Thành viên Star chi tiêu đủ mức G-Star, X-Star trong năm 2020
          sẽ được nâng hạng và hưởng quyền lợi mới tương ứng. Nếu mức chi tiêu
          không đủ vẫn giữ nguyên hạng mức cũ.
        </p>

        <p style={style2}>
          Thành viên G-Star chi tiêu đủ mức X-Star trong năm 2020 sẽ được nâng
          hạng và hưởng quyền lợi mới X-Star tương ứng. Nếu mức chi tiêu không
          đủ vẫn giữ nguyên hạng mức cũ G-Star.
        </p>

        <p style={style2}>
          <b>Đặc biệt,</b>
        </p>

        <p style={style2}>Thành viên X-Star giữ nguyên hạng bất kể chi tiêu.</p>

        <p style={style2}>
          Vé miễn phí và Điểm tích lũy (Stars) sẽ được bảo lưu và tiếp tục sử
          dụng trong năm 2021.
        </p>

        <p style={style2}>
          Cảm ơn các Stars đã đồng hành cùng <b>Galaxy Cinema</b> trong một năm
          2020 với rất nhiều ký ức khó quên.{" "}
        </p>

        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export default Promotion003_TriAnThanhVien;
