import React from "react";
import ReactDOM from "react-dom/client";
import { BasicSelect, MultiSelect, CustomCheckbox, DatePicker } from "../src";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the playground</h1>
      <h2>Basic Select - Con Default Value</h2>
      <BasicSelect
        width="300px"
        label="Selecciona una opción"
        placeholder="Elige una opción"
        required
        defaultValue="opcion2"
        options={[
          { label: "Opción 1", value: "opcion1" },
          { label: "Opción 2", value: "opcion2" },
          { label: "Opción 3", value: "opcion3" },
          { label: "Opción 4", value: "opcion4" },
          { label: "Opción 5", value: "opcion5" },
        ]}
        onChange={(val) => console.log("Opción seleccionada:", val)}
      />

      <br />
      <br />

      <h2>Basic Select - Con Error</h2>
      <BasicSelect
        width="300px"
        label="Selecciona una opción"
        placeholder="Elige una opción"
        required
        error="Este campo es obligatorio"
        options={[
          { label: "Opción 1", value: "opcion1" },
          { label: "Opción 2", value: "opcion2" },
          { label: "Opción 3", value: "opcion3" },
        ]}
        onChange={(val) => console.log("Opción seleccionada:", val)}
      />

      <br />
      <br />

      <h2>Multi Select - Con Default Values</h2>
      <MultiSelect
        width="300px"
        label="Selecciona días de la semana"
        placeholder="Elige los días"
        required
        helperText="Puedes seleccionar múltiples días"
        defaultValue={["lunes", "viernes"]}
        options={[
          { label: "Lunes", value: "lunes" },
          { label: "Martes", value: "martes" },
          { label: "Miércoles", value: "miercoles" },
          { label: "Jueves", value: "jueves" },
          { label: "Viernes", value: "viernes" },
          { label: "Sábado", value: "sabado" },
          { label: "Domingo", value: "domingo" },
        ]}
        onChange={(selectedDays) =>
          console.log("Días seleccionados:", selectedDays)
        }
      />

      <br />
      <br />

      <h2>Multi Select - Personalizado</h2>
      <MultiSelect
        width="300px"
        label="Selecciona colores"
        placeholder="Elige los colores"
        helperText="Máximo 3 colores"
        maxSelections={3}
        checkboxColor="#10b981"
        checkboxCheckedBackgroundColor="#10b981"
        checkboxCheckedBorderColor="#059669"
        checkboxLabelColor="#1f2937"
        options={[
          { label: "Rojo", value: "rojo" },
          { label: "Verde", value: "verde" },
          { label: "Azul", value: "azul" },
          { label: "Amarillo", value: "amarillo" },
          { label: "Morado", value: "morado" },
          { label: "Naranja", value: "naranja" },
        ]}
        onChange={(selectedColors) =>
          console.log("Colores seleccionados:", selectedColors)
        }
      />

      <br />
      <br />

      <h2>Date Picker - Con Default Value</h2>
      <DatePicker
        width="300px"
        label="Selecciona una fecha"
        placeholder="Elige una fecha"
        required
        helperText="Selecciona una fecha válida"
        defaultValue="2024-06-15"
        minDate="2024-01-01"
        maxDate="2025-12-31"
        onChange={(date) => console.log("Fecha seleccionada:", date)}
      />

      <br />
      <br />

      <h2>Date Picker - Con Error</h2>
      <DatePicker
        width="300px"
        label="Fecha de nacimiento"
        placeholder="Elige tu fecha de nacimiento"
        required
        error="La fecha de nacimiento es obligatoria"
        maxDate="2024-12-31"
        onChange={(date) => console.log("Fecha de nacimiento:", date)}
      />

      <br />
      <br />

      <h2>Custom Checkbox - Con Default Values</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <CustomCheckbox
          label="Acepto los términos y condiciones"
          required
          helperText="Debes aceptar para continuar"
          defaultChecked={true}
          onChange={(e) => console.log("Términos:", e.target.checked)}
        />
        <CustomCheckbox
          label="Recibir notificaciones por email"
          defaultChecked={true}
          onChange={(e) => console.log("Notificaciones:", e.target.checked)}
        />
        <CustomCheckbox
          label="Opción con error"
          error="Este campo es obligatorio"
          defaultChecked={false}
          onChange={(e) => console.log("Error:", e.target.checked)}
        />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
