import React from "react";
import {
  ClientAdressContainer,
  ClientAdressTitle,
  ClientAdressLine,
} from "./ClientAdress.styles";
import { ClientAdressProps } from "./ClientAdress.types";

const ClientAdress = (props: ClientAdressProps) => {
  const { addressDetails } = props;

  return (
    <ClientAdressContainer>
      <ClientAdressTitle>Address</ClientAdressTitle>
      <ClientAdressLine>{addressDetails.addressLine1}</ClientAdressLine>
      <ClientAdressLine>{addressDetails.addressLine2}</ClientAdressLine>
      <ClientAdressLine>{addressDetails.city}</ClientAdressLine>
      <ClientAdressLine>{addressDetails.county}</ClientAdressLine>
      <ClientAdressLine>{addressDetails.postcode}</ClientAdressLine>
    </ClientAdressContainer>
  );
};

export default ClientAdress;
