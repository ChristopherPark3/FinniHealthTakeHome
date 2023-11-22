import { Checkbox } from "@chakra-ui/react";
import { type FC, useContext, SyntheticEvent } from "react";
import { type CheckboxProp } from "~/(types)/types";
import { ActiveFieldsContext } from "./PatientDisplayContainer";

export const DropdownCheckbox: FC<CheckboxProp> = ({ field, checked }) => {
  const [activeFields, setActiveFields] = useContext(ActiveFieldsContext);

  const handleCheck = (e: any, field: string) => {
    const targetBox = e.target.checked;
    if (!targetBox) {
      setActiveFields({ ...activeFields, [field]: true });
    } else {
      setActiveFields({ ...activeFields, [field]: false });
    }
  };
  
  return (
    <Checkbox
      value={field}
      checked={checked}
      onChange={(e) => handleCheck(e, field)}
    >
      {field}
    </Checkbox>
  );
};
