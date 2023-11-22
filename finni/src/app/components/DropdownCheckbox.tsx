import { Checkbox } from "@chakra-ui/react";
import { type FC, useContext, SyntheticEvent } from "react";
import { type CheckboxProp } from "~/(types)/types";
import { ActiveFieldsContext } from "./PatientDisplayContainer";

export const DropdownCheckbox: FC<CheckboxProp> = ({ field, checked }) => {
  const [activeFields, setActiveFields] = useContext(ActiveFieldsContext);

  // Accessing the element checked and updating the active field context
  // so that the correct columns are rendered and un-rendered in the PatientDisplayTable component
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
