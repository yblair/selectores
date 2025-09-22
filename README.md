# Librería de Selectores

Una librería moderna de componentes de selección para React con diseño personalizable y accesibilidad completa.

## 🚀 Componentes

- **BasicSelect**: Selector básico con dropdown personalizado
- **MultiSelect**: Selector múltiple con checkboxes
- **CustomCheckbox**: Checkbox personalizado
- **DatePicker**: Selector de fechas con calendario

## 📦 Instalación

```bash
npm install libreria-selectores-yblair
```

## 🎯 Uso

```jsx
import { BasicSelect, MultiSelect, DatePicker, CustomCheckbox } from 'libreria-selectores-yblair';

// BasicSelect
<BasicSelect
  options={[
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' }
  ]}
  onChange={(value) => console.log(value)}
  placeholder="Seleccionar opción"
/>

// MultiSelect
<MultiSelect
  options={[
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' }
  ]}
  onChange={(values) => console.log(values)}
  placeholder="Seleccionar múltiples"
/>

// DatePicker
<DatePicker
  onChange={(date) => console.log(date)}
  placeholder="Seleccionar fecha"
/>

// CustomCheckbox
<CustomCheckbox
  label="Acepto términos y condiciones"
  onChange={(checked) => console.log(checked)}
/>
```

## 🎯 Valores por Defecto (defaultValue)

Todos los componentes soportan valores por defecto que se establecen al cargar el componente:

```jsx
// BasicSelect con valor por defecto
<BasicSelect
  options={[
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' }
  ]}
  defaultValue="opcion2"  // Se selecciona "Opción 2" por defecto
  onChange={(value) => console.log(value)}
/>

// MultiSelect con valores por defecto
<MultiSelect
  options={[
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'viernes', label: 'Viernes' }
  ]}
  defaultValue={["lunes", "viernes"]}  // Se seleccionan "Lunes" y "Viernes" por defecto
  onChange={(values) => console.log(values)}
/>

// DatePicker con fecha por defecto
<DatePicker
  defaultValue="2024-06-15"  // Se establece el 15 de junio de 2024 por defecto
  onChange={(date) => console.log(date)}
/>

// CustomCheckbox con estado por defecto
<CustomCheckbox
  label="Acepto términos y condiciones"
  defaultChecked={true}  // Se marca por defecto
  onChange={(checked) => console.log(checked)}
/>
```

## ✨ Características

- ✅ **Totalmente personalizable** - Todos los estilos son configurables via props
- ✅ **Accesible** - Cumple con estándares ARIA y WCAG
- ✅ **Sin dependencias externas** - Solo requiere React
- ✅ **Tamaño ligero** - Optimizado para producción

- ✅ **Responsive** - Se adapta a diferentes tamaños de pantalla

## 🎨 Personalización

Todos los componentes aceptan props de personalización:

```jsx
<BasicSelect
  // Colores
  backgroundColor="#ffffff"
  borderColor="#e5e7eb"
  focusBorderColor="#7c3aed"
  // Tamaños
  width="300px"
  height="44px"
  borderRadius="8px"
  // Fuentes
  fontSize="14px"
  fontWeight="400"
  // Estados
  disabled={false}
  required={true}
  error="Este campo es obligatorio"
  helperText="Selecciona una opción"
/>
```

## 📋 Props Comunes

### BasicSelect

- `options`: Array de opciones `[{value, label}]`
- `value`: Valor seleccionado (controlado)
- `defaultValue`: Valor por defecto (no controlado)
- `onChange`: Función callback
- `placeholder`: Texto placeholder
- `disabled`: Estado deshabilitado
- `required`: Campo obligatorio
- `error`: Mensaje de error
- `helperText`: Texto de ayuda

### MultiSelect

- `options`: Array de opciones
- `value`: Array de valores seleccionados (controlado)
- `defaultValue`: Array de valores por defecto (no controlado)
- `onChange`: Función callback
- `maxSelections`: Máximo de selecciones
- `showCount`: Mostrar contador de selecciones

### DatePicker

- `value`: Fecha seleccionada (Date, controlado)
- `defaultValue`: Fecha por defecto (string, no controlado)
- `onChange`: Función callback
- `minDate`: Fecha mínima
- `maxDate`: Fecha máxima
- `disabledDates`: Array de fechas deshabilitadas
- `locale`: Configuración regional

### CustomCheckbox

- `checked`: Estado del checkbox (controlado)
- `defaultChecked`: Estado por defecto (no controlado)
- `onChange`: Función callback
- `label`: Texto del label
- `disabled`: Estado deshabilitado
- `required`: Campo obligatorio

## 🎯 Ejemplos Avanzados

### Con validación

```jsx
<BasicSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  required
  error={!selectedValue ? "Debes seleccionar una opción" : ""}
  helperText="Esta es una selección obligatoria"
/>
```

### Con valores por defecto

```jsx
// Formulario con valores pre-configurados
<BasicSelect
  options={options}
  defaultValue="opcion2"  // Valor por defecto
  onChange={setSelectedValue}
  label="Selecciona una opción"
/>

<MultiSelect
  options={daysOptions}
  defaultValue={["lunes", "viernes"]}  // Días por defecto
  onChange={setSelectedDays}
  label="Días de la semana"
/>

<DatePicker
  defaultValue="2024-06-15"  // Fecha por defecto
  onChange={setSelectedDate}
  label="Fecha de inicio"
/>

<CustomCheckbox
  label="Acepto términos y condiciones"
  defaultChecked={true}  // Marcado por defecto
  onChange={setAccepted}
/>
```

### Con estilos personalizados

```jsx
<MultiSelect
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  backgroundColor="#f8fafc"
  borderColor="#3b82f6"
  focusBorderColor="#1d4ed8"
  borderRadius="12px"
  height="48px"
/>
```

## 📄 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📞 Soporte

Si tienes problemas o preguntas, por favor abre un issue en el repositorio.
