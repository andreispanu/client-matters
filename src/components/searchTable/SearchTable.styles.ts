import styled from "@emotion/styled";
import theme from "../../theme";
import { Typography } from "@mui/material";

export const TableTitleContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    width: "100%",
}))

export const TableTitle = styled(Typography)(() => ({
    margin: 0,
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
}))