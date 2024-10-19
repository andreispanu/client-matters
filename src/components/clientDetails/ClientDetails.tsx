import React from "react";
import {
  ClientDescriptionContainer,
  ClientDescriptionTitle,
  ClientDescriptionLine,
  ClientDescriptionLineKey
} from "./ClientDetails.styles";
import { ClientDetailsProps } from "./ClientDetails.types";
import { formatCustomDate } from "../../utils";

const ClientDetails = (props: ClientDetailsProps) => {
  const { clientName, clientDescription, clientInceptionDate } = props;

  return (
    <ClientDescriptionContainer>
      <ClientDescriptionTitle>Details</ClientDescriptionTitle>
      <ClientDescriptionLine><ClientDescriptionLineKey>Client Name: </ClientDescriptionLineKey> {clientName}</ClientDescriptionLine>
      <ClientDescriptionLine><ClientDescriptionLineKey>Client Description:</ClientDescriptionLineKey> {clientDescription}</ClientDescriptionLine>
      <ClientDescriptionLine><ClientDescriptionLineKey>Inception date:</ClientDescriptionLineKey> {formatCustomDate(clientInceptionDate)}</ClientDescriptionLine>
    </ClientDescriptionContainer>
  );
};

export default ClientDetails;
