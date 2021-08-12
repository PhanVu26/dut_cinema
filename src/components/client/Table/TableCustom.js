import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ShowMoreText from "react-show-more-text";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  styleHead: {
    width: "10%",
  },
  headRight: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  btnAdd: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
});

const dataHead = [
  { title: "Tên phim", field: "name" },
  { title: "Thể loại", field: "type" },
  { title: "Thời lượng", field: "time" },
  { title: "Quốc gia", field: "nation" },
  { title: "Giá vé", field: "price" },
  { title: "Ngày ra mắt", field: "premiereDate" },
  { title: "Diễn viên", field: "actor" },
  { title: "Đạo diễn", field: "author" },
  { title: "Ngày", field: "" },
  { title: "Slug movie", field: "slug" },
  { title: "Giới thiệu", field: "intro" },
  { title: "Ảnh 1", field: "image" },
  { title: "Ảnh 2", field: "imageInfo" },
  { title: "Video", field: "video" },
];

export default function TableCustom({
  movie,
  handleOpenpopup,
  handleOpenpopupDelete,
  handleOpenpopupEdit,
}) {
  const classes = useStyles();
  console.log("movieee:", movie);

  //   dataHead.map(item => {
  //       let value = movie.find(value => Object.keys(value) === item.field)
  //   })

  return (
    <TableContainer component={Paper}>
      <div className="d-flex justify-content-between p-3">
        <h5>Movie</h5>
        <div className={classes.headRight}>
          Search{" "}
          <span onClick={handleOpenpopup} className={`${classes.btnAdd} ml-2`}>
            <AddBoxIcon />
          </span>
        </div>
      </div>
      <Table
        style={{ width: "150%" }}
        className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            {dataHead.map((item,index) => (
              <TableCell key={index} align="center">{item.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {movie.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <span className="d-flex justify-content-between">
                  <span
                    onClick={() => handleOpenpopupEdit(row)}
                    className={`${classes.btnAdd}`}
                  >
                    <EditIcon />
                  </span>
                  <span
                    onClick={() => handleOpenpopupDelete(row.id)}
                    className={`${classes.btnAdd}`}
                  >
                    <DeleteOutlineIcon />
                  </span>
                </span>
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.time}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.nation}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.price}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {new Date(row.premiereDate).toLocaleDateString()}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.actor}
                  </ShowMoreText>
                }
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {row.author}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {""}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.slug}
                  </ShowMoreText>
                }
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.intro}
                  </ShowMoreText>
                }
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.image}
                  </ShowMoreText>
                }
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.imageInfo}
                  </ShowMoreText>
                }
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {
                  <ShowMoreText lines={1} more="" expanded={false} width={150}>
                    {row.video}
                  </ShowMoreText>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
