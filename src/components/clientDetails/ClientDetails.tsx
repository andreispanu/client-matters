import React from "react";
import { ClientDetailsProps } from "./ClientDetails.types";
import { formatCustomDate } from "../../utils";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ClientAdress from "../clientAdress";
import theme from "../../theme";
import { ClientDescriptionTitle } from "./ClientDetails.styles";

const ClientDetails = (props: ClientDetailsProps) => {
  const { clientName, clientDescription, clientInceptionDate, address } = props;

  return (
    <Grid container size={{ xs: 12 }} p={theme.spacing(2)} spacing={2}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Grid container spacing={2} direction={'column'}>
          <Grid size={{ xs: 12 }}>
            <ClientDescriptionTitle>Name:</ClientDescriptionTitle>
            <Typography variant="body2">{clientName}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ClientDescriptionTitle>Inception date:</ClientDescriptionTitle>
            <Typography variant="body2">
              {formatCustomDate(clientInceptionDate)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <ClientAdress addressDetails={address} />
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
        <ClientDescriptionTitle>Description:</ClientDescriptionTitle>
        <Typography variant="body2">{clientDescription}</Typography>
      </Grid>
    </Grid>
  );
};

export default ClientDetails;
