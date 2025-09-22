import React, { useState } from "react";
import {
  BasicSelect,
  MultiSelect,
  DatePicker,
  CustomCheckbox,
} from "./src/index.js";

// Componente de prueba para validar que no haya bucles infinitos
export const TestComponents = () => {
  const [basicValue, setBasicValue] = useState("");
  const [multiValue, setMultiValue] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);

  console.log("Render count:", Date.now());

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2>Test Components</h2>

      <BasicSelect
        options={[
          { value: "option1", label: "Opción 1" },
          { value: "option2", label: "Opción 2" },
        ]}
        value={basicValue}
        onChange={setBasicValue}
        placeholder="Seleccionar opción"
      />

      <MultiSelect
        options={[
          { value: "option1", label: "Opción 1" },
          { value: "option2", label: "Opción 2" },
        ]}
        value={multiValue}
        onChange={setMultiValue}
        placeholder="Seleccionar múltiples"
      />

      <DatePicker
        value={dateValue}
        onChange={setDateValue}
        placeholder="Seleccionar fecha"
      />

      <CustomCheckbox
        checked={checkboxValue}
        onChange={(e) => setCheckboxValue(e.target.checked)}
        label="Acepto términos"
      />
    </div>
  );
};
