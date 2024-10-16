export type Person = {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  
  export type ClientData = {
    clientId: string;
    name: string;
    description: string;
    people: Person[];
  };
  
  export type Matter = {
    matterId: string;
    matterName: string;
    matterDate: string;
    matterDescription?: string;
  };