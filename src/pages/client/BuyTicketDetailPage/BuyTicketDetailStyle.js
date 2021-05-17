const styles = (theme) => ({
  chooseMovie: {
    backgroundColor: "#f26b38",
    minWidth: "365px",
  },
  movie: {
    backgroundColor: "#f1f1f1",
    padding: "10px 30px",
  },
  header: {
    color: "white",
    fontSize: "22px",
    letterSpace: "3px",
    marginBottom: "15px",
  },
  imageMovie: {
    width: "100%",
    height: "auto",
    //adding: '10px 30px'
  },
  button: {
    backgroundColor: "#f26b38",
    border: "none",
    padding: "7px 25px",
    color: "white",
    margin: "0 auto",
    display: "block",
    "&:hover": {
      backgroundColor: "#4267B2",
    },
  },
  buttonNomargin: {
    margin: "unset",
  },
  wrap: {
    // height:'500px'
  },
  wrapScreen: {
    paddingTop: "20px",
  },
  screen: {
    border: "1px solid gray",
    padding: "20px",
    width: "40%",
    margin: "20px auto 0",
    textAlign: "center",
  },
  cell: {
    display: "inline-block",
    width: "32px",
    height: "32px",
    borderRadius: "5px",
    marginRight: "5px",
  },
  reversed: {
    backgroundColor: "#d26a74",
  },
  canChoose: {
    backgroundColor: "lightgray",
  },
  choosing: {
    backgroundColor: "lightseagreen",
  },
});

export default styles;
