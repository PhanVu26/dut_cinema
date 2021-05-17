const styles = (theme) => ({
  block: {
    border: "1px solid #dedede",
    borderTop: "none",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  link: {
    textDecoration: "unset",
    color: "inherit",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "unset",
      backgroundColor: "#f1f1f1 !important",
    },
  },
  active: {
    backgroundColor: "#f1f1f1 !important",
    color: "#f26b38",
  },
  session: {
    border: "1px solid #dedede",
    textAlign: "center",
    width: "85px",
    marginRight: "10px",
    marginTop: "10px",
    "&:hover": {
      color: "#f26b38",
      borderColor: "#f26b38",
      cursor: "pointer",
    },
  },
});

export default styles;
