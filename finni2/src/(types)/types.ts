import { Dispatch, SetStateAction } from "react";

export type NewPatientInterface = {
  _id?: number | undefined;
  id?: number | undefined;
  firstName: string;
  middleName?: string;
  lastName: string;
  DOB: string;
  status: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  other?: ArbitraryField;
};

export type QueryBody = Record<string, string | number | undefined>;

export type ArbitraryField = Record<string, number | string>;

export type CheckboxProp = { field: string; checked: boolean };

export type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
