export type NewPatientInterface = {
  firstName: string;
  middleName?: string;
  lastName: string;
  DOB: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  other?: ArbitraryField
}

export type QueryBody = Record<string, string | number | undefined>;

export type ArbitraryField = Record<string, number | string>;
