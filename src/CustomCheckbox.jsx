import React, { useState } from "react";

export const CustomCheckbox = ({
  checked = false,
  onChange,
  disabled = false,
  size = "20px",
  color = "#7c3aed",
  backgroundColor = "#fff",
  borderColor = "#d1d5db",
  checkedBackgroundColor = "#7c3aed",
  checkedBorderColor = "#7c3aed",
  labelColor = "#374151",
  labelFontSize = "14px",
  labelFontFamily = "system-ui, -apple-system, sans-serif",
  borderRadius = "6px",
  transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  label,
  required = false,
  error,
  helperText,
  name,
  value,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Actualizar el estado interno cuando cambie la prop checked
  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    const newChecked = !isChecked;
    console.log("Checkbox clicked, changing from", isChecked, "to", newChecked);

    setIsChecked(newChecked);

    if (onChange) {
      // Crear un evento sintético que simule un checkbox
      const syntheticEvent = {
        target: {
          checked: newChecked,
          value: newChecked,
        },
        preventDefault: () => {},
        stopPropagation: () => {},
      };
      onChange(syntheticEvent);
    }
  };

  const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          <input
            type="checkbox"
            id={checkboxId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            onChange={handleClick}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              margin: 0,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            aria-describedby={
              error
                ? `error-${checkboxId}`
                : helperText
                ? `helper-${checkboxId}`
                : undefined
            }
            aria-invalid={!!error}
            required={required}
          />
          <label
            htmlFor={checkboxId}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: disabled ? "not-allowed" : "pointer",
              userSelect: "none",
              opacity: disabled ? 0.6 : 1,
            }}
          >
            <div
              style={{
                width: size,
                height: size,
                border: `2px solid ${
                  error
                    ? "#dc2626"
                    : isChecked
                    ? checkedBorderColor
                    : borderColor
                }`,
                borderRadius: borderRadius,
                backgroundColor: isChecked
                  ? checkedBackgroundColor
                  : backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: transition,
                boxSizing: "border-box",
                position: "relative",
                boxShadow: isChecked
                  ? `0 0 0 3px ${checkedBackgroundColor}20`
                  : "none",
              }}
            >
              {isChecked && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    color: "#fff",
                    transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </label>
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            style={{
              fontSize: labelFontSize,
              color: error ? "#dc2626" : labelColor,
              fontFamily: labelFontFamily,
              fontWeight: "500",
              cursor: disabled ? "not-allowed" : "pointer",
              userSelect: "none",
              lineHeight: "1.5",
            }}
          >
            {label}
            {required && (
              <span style={{ color: "#dc2626", marginLeft: "4px" }}>*</span>
            )}
          </label>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          id={`error-${checkboxId}`}
          style={{
            fontSize: "12px",
            color: "#dc2626",
            marginLeft: "32px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 1L11 10H1L6 1Z" />
          </svg>
          {error}
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <div
          id={`helper-${checkboxId}`}
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginLeft: "32px",
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};
