export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type AddressDetails = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postcode: string;
};

export type ClientData = {
  clientId: string;
  name: string;
  description: string;
  people: Person[];
  address: AddressDetails;
  inceptionDate: string;
};

export type Matter = {
  matterId: string;
  matterName: string;
  matterDate: string;
  matterDescription?: string;
  matterCode: string;
};

export type MattersData = {
  clientId: string;
  matterId: string;
  matterCode: string;
  matterName: string;
  matterDescription: string;
  matterDate: string;
}
