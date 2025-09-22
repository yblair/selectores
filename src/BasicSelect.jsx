import React, { useState, useRef, useEffect } from "react";
import { useUniqueId } from "./hooks/useId.js";

export const BasicSelect = ({
  width = "200px",
  height = "44px",
  backgroundColor = "#fff",
  color = "#1f2937",
  options = [],
  onChange,
  borderRadius = "8px",
  borderColor = "#e5e7eb",
  placeholder = "Seleccionar...",
  maxHeight = "240px",
  value,
  focusBorderColor = "#7c3aed",
  hoverBorderColor = "#d1d5db",
  shadowColor = "rgba(0, 0, 0, 0.05)",
  zIndex = 9999,
  optionHoverColor = "#f8fafc",
  optionSelectedColor = "#ede9fe",
  optionSelectedTextColor = "#7c3aed",
  disabled = false,
  required = false,
  label,
  error,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const selectId = useUniqueId("select");
  const errorId = useUniqueId("error");
  const helperId = useUniqueId("helper");

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

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
          handleOptionClick(options[hoveredIndex]);
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

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleOptionClick = (option) => {
    if (value === undefined) {
      setSelectedValue(option.value);
    }
    setIsOpen(false);
    setHoveredIndex(-1);
    onChange?.(option.value);
  };

  const toggleDropdown = () => {
    setIsOpen((s) => {
      const next = !s;
      if (!next) setHoveredIndex(-1);
      return next;
    });
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
          htmlFor={selectId}
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
        id={selectId}
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
            e.target.style.borderColor = hoverBorderColor;
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
          borderRadius: isOpen
            ? `${borderRadius} ${borderRadius} 0 0`
            : borderRadius,
          padding: "12px 16px",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "var(--select-font-size)",
          fontWeight: "var(--select-font-weight)",
          userSelect: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxSizing: "border-box",
          outline: "none",
        }}
      >
        <span
          style={{
            color: selectedOption ? color : "#9ca3af",
            fontWeight: selectedOption ? "500" : "400",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            color: disabled ? "#9ca3af" : "#6b7280",
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
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
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
              aria-selected={option.value === selectedValue}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "var(--select-font-size)",
                fontWeight:
                  option.value === selectedValue
                    ? "var(--select-font-weight-medium)"
                    : "var(--select-font-weight)",
                backgroundColor:
                  option.value === selectedValue
                    ? optionSelectedColor
                    : hoveredIndex === index
                    ? optionHoverColor
                    : "transparent",
                color:
                  option.value === selectedValue
                    ? optionSelectedTextColor
                    : hoveredIndex === index
                    ? "#1f2937"
                    : color,
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                borderLeft:
                  option.value === selectedValue
                    ? `3px solid ${optionSelectedTextColor}`
                    : "3px solid transparent",
              }}
            >
              <span>{option.label}</span>
              {option.value === selectedValue && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
};
