import { AddressDetails } from "../../pages/ClientDetailsPage/ClientDetailsPage.types";

export type ClientDetailsProps = {
  clientName: string;
  clientDescription: string;
  clientInceptionDate: string;
  address: AddressDetails;
};
