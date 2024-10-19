export type Person = {
  title: string;
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
};

export type Matter = {
  matterId: string;
  matterName: string;
  matterDate: string;
  matterDescription?: string;
  matterCode: string;
};
