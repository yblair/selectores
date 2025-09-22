# Librería de Selectores

Una librería moderna de componentes de selección para React con diseño personalizable y accesibilidad completa.

## 🚀 Componentes

- **BasicSelect**: Selector básico con dropdown personalizado
- **MultiSelect**: Selector múltiple con checkboxes
- **CustomCheckbox**: Checkbox personalizado
- **DatePicker**: Selector de fechas con calendario

## 📦 Instalación

```bash
npm install libreria-selectores
```

## 🎯 Uso

```jsx
import { BasicSelect, MultiSelect, DatePicker, CustomCheckbox } from 'libreria-selectores';

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

## ✨ Características

- ✅ **Totalmente personalizable** - Todos los estilos son configurables via props
- ✅ **Accesible** - Cumple con estándares ARIA y WCAG
- ✅ **Sin dependencias externas** - Solo requiere React
- ✅ **Tamaño ligero** - Optimizado para producción
- ✅ **TypeScript ready** - Tipos incluidos
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
- `value`: Valor seleccionado
- `onChange`: Función callback
- `placeholder`: Texto placeholder
- `disabled`: Estado deshabilitado
- `required`: Campo obligatorio
- `error`: Mensaje de error
- `helperText`: Texto de ayuda

### MultiSelect

- `options`: Array de opciones
- `value`: Array de valores seleccionados
- `onChange`: Función callback
- `maxSelections`: Máximo de selecciones
- `showCount`: Mostrar contador de selecciones

### DatePicker

- `value`: Fecha seleccionada (Date)
- `onChange`: Función callback
- `minDate`: Fecha mínima
- `maxDate`: Fecha máxima
- `disabledDates`: Array de fechas deshabilitadas
- `locale`: Configuración regional

### CustomCheckbox

- `checked`: Estado del checkbox
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
