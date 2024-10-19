import React from "react";
import {
  ClientAdressContainer,
  ClientAdressTitle,
  ClientAdressLine,
} from "./ClientDetails.styles";
import { ClientDetailsProps } from "./ClientDetails.types";
import { formatCustomDate } from "../../utils";

const ClientDetails = (props: ClientDetailsProps) => {
  const { clientName, clientDescription, clientInceptionDate } = props;

  return (
    <ClientAdressContainer>
      <ClientAdressTitle>Details</ClientAdressTitle>
      <ClientAdressLine>{clientName}</ClientAdressLine>
      <ClientAdressLine>{clientDescription}</ClientAdressLine>
      <ClientAdressLine>{formatCustomDate(clientInceptionDate)}</ClientAdressLine>
    </ClientAdressContainer>
  );
};

export default ClientDetails;
