export interface NewPatientInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  status: string;
  address: string;
  [additionalField: string]: string | number | undefined
}

export type QueryBody = Record<string, string | number | undefined>;