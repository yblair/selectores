import React, { useState, useRef, useEffect } from "react";
import { CustomCheckbox } from "./CustomCheckbox.jsx";
import { useUniqueId } from "./hooks/useId.js";

export const MultiSelect = ({
  width = "200px",
  height = "44px",
  backgroundColor = "#fff",
  color = "#1f2937",
  options = [],
  onChange,
  placeholder = "Seleccionar...",
  value = [],
  borderRadius = "8px",
  borderColor = "#e5e7eb",
  maxHeight = "240px",
  padding = "12px 16px",
  boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  zIndex = 9999,
  transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  hoverBackgroundColor = "#f8fafc",
  hoverTextColor = "#1f2937",
  textColor = "#374151",
  separatorColor = "#f1f5f9",
  arrowColor = "#6b7280",
  focusBorderColor = "#7c3aed",
  shadowColor = "rgba(124, 58, 237, 0.1)",
  checkboxSize = "20px",
  checkboxColor = "#7c3aed",
  checkboxBackgroundColor = "#fff",
  checkboxBorderColor = "#d1d5db",
  checkboxCheckedBackgroundColor = "#7c3aed",
  checkboxCheckedBorderColor = "#7c3aed",
  checkboxLabelColor = "#374151",
  checkboxBorderRadius = "6px",
  checkboxTransition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  maxSelections,
  showCount = true,
  defaultValue = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(value);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const multiselectId = useUniqueId("multiselect");
  const errorId = useUniqueId("error");
  const helperId = useUniqueId("helper");

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
    if (defaultValue !== undefined) {
      setSelectedValues(defaultValue);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHoveredIndex((prev) => Math.min(prev + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHoveredIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (hoveredIndex >= 0 && options[hoveredIndex]) {
          handleOptionToggle(options[hoveredIndex]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, hoveredIndex, options]);

  const handleOptionToggle = (option) => {
    console.log("Toggling option:", option);
    const newSelectedValues = selectedValues.includes(option.value)
      ? selectedValues.filter((val) => val !== option.value)
      : [...selectedValues, option.value];

    console.log("New selected values:", newSelectedValues);
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setHoveredIndex(-1);
      return next;
    });
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option ? option.label : placeholder;
    }
    if (showCount) {
      return `${selectedValues.length} seleccionados`;
    }
    return selectedValues
      .map((val) => {
        const option = options.find((opt) => opt.value === val);
        return option ? option.label : val;
      })
      .join(", ");
  };

  return (
    <div
      ref={dropdownRef}
      className="select-component"
      style={{
        position: "relative",
        width,
        display: "inline-block",
      }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={multiselectId}
          style={{
            display: "block",
            fontSize: "var(--select-font-size)",
            fontWeight: "var(--select-font-weight-medium)",
            color: error ? "#dc2626" : "#374151",
            marginBottom: "6px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#dc2626", marginLeft: "4px" }}>*</span>
          )}
        </label>
      )}

      {/* Input Display */}
      <div
        id={multiselectId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : toggleDropdown}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
            setHoveredIndex(0);
          }
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isOpen) {
            e.target.style.borderColor = hoverTextColor;
            e.target.style.boxShadow = `0 0 0 3px ${shadowColor}`;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isOpen) {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = "none";
          }
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = focusBorderColor;
            e.target.style.boxShadow = `0 0 0 3px ${shadowColor}`;
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = "none";
          }
        }}
        style={{
          width: "100%",
          height,
          backgroundColor: disabled ? "#f9fafb" : backgroundColor,
          color: disabled ? "#9ca3af" : color,
          border: `1px solid ${
            error ? "#dc2626" : isOpen ? focusBorderColor : borderColor
          }`,
          borderBottom: isOpen ? "none" : `1px solid ${borderColor}`,
          borderRadius: isOpen
            ? `${borderRadius} ${borderRadius} 0 0`
            : borderRadius,
          padding: padding,
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "var(--select-font-size)",
          fontWeight: "var(--select-font-weight)",
          userSelect: "none",
          transition: transition,
          boxSizing: "border-box",
          outline: "none",
        }}
      >
        <span
          style={{
            color: selectedValues.length > 0 ? color : "#9ca3af",
            fontWeight: selectedValues.length > 0 ? "500" : "400",
          }}
        >
          {getDisplayText()}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            color: disabled ? "#9ca3af" : arrowColor,
            flexShrink: 0,
          }}
          aria-hidden
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Error Message */}
      {error && !isOpen && (
        <div
          id={errorId}
          style={{
            fontSize: "12px",
            color: "#dc2626",
            marginTop: "4px",
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
      {helperText && !error && !isOpen && (
        <div
          id={helperId}
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "4px",
          }}
        >
          {helperText}
        </div>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <div
          role="listbox"
          aria-activedescendant={
            hoveredIndex >= 0 ? `option-${hoveredIndex}` : undefined
          }
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            width: "100%",
            backgroundColor: backgroundColor,
            border: `1px solid ${isOpen ? focusBorderColor : borderColor}`,
            borderTop: "none",
            borderRadius: `0 0 ${borderRadius} ${borderRadius}`,
            boxShadow: boxShadow,
            zIndex: 9999,
            maxHeight: maxHeight,
            overflowY: "auto",
            boxSizing: "border-box",
            padding: "4px 0",
          }}
        >
          {options.map((option, index) => (
            <div
              id={`option-${index}`}
              key={option.value}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "var(--select-font-size)",
                backgroundColor:
                  hoveredIndex === index ? hoverBackgroundColor : "transparent",
                color: hoveredIndex === index ? hoverTextColor : textColor,
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                borderBottom:
                  index < options.length - 1
                    ? `1px solid ${separatorColor}`
                    : "none",
              }}
            >
              <CustomCheckbox
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionToggle(option)}
                label={option.label}
                size={checkboxSize}
                color={checkboxColor}
                backgroundColor={checkboxBackgroundColor}
                borderColor={checkboxBorderColor}
                checkedBackgroundColor={checkboxCheckedBackgroundColor}
                checkedBorderColor={checkboxCheckedBorderColor}
                labelColor={checkboxLabelColor}
                borderRadius={checkboxBorderRadius}
                transition={checkboxTransition}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
