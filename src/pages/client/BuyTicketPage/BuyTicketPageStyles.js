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
    color: theme.color.orange,
  },
  session: {
    border: "1px solid #dedede",
    textAlign: "center",
    width: "85px",
    marginRight: "10px",
    marginTop: "10px",
    "&:hover": {
      color: theme.color.orange,
      borderColor: theme.color.orange,
      cursor: "pointer",
    },
  },
});

export default styles;
