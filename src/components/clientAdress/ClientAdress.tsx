import React from "react";
import { ClientAdressProps } from "./ClientAdress.types";
import { Typography } from "@mui/material";
import { ClientDescriptionTitle } from "./ClientAdress.styles";

const ClientAdress = (props: ClientAdressProps) => {
  const { addressDetails } = props;

  return (
    <>
      <ClientDescriptionTitle>Address:</ClientDescriptionTitle>
      <Typography variant="body2">{addressDetails.addressLine1}</Typography>
      <Typography variant="body2">{addressDetails.addressLine2}</Typography>
      <Typography variant="body2">{addressDetails.addressLine2}</Typography>
      <Typography variant="body2">{addressDetails.county}</Typography>
      <Typography variant="body2">{addressDetails.postcode}</Typography>
    </>
  );
};

export default ClientAdress;
