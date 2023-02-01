import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  categoryInfo: { display: "flex", justifyContent: "space-between" },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));
