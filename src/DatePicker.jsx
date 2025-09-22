import React, { useState, useRef, useEffect } from "react";
import { useUniqueId } from "./hooks/useId.js";

export const DatePicker = ({
  width = "200px",
  height = "44px",
  backgroundColor = "#fff",
  color = "#1f2937",
  placeholder = "Seleccionar fecha",
  value,
  defaultValue,
  onChange,
  borderRadius = "8px",
  borderColor = "#e5e7eb",
  padding = "12px 16px",
  boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  zIndex = 9999,
  transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  arrowColor = "#6b7280",
  focusBorderColor = "#7c3aed",
  shadowColor = "rgba(124, 58, 237, 0.1)",
  calendarBackgroundColor = "#fff",
  calendarBorderColor = "#e5e7eb",
  calendarTextColor = "#374151",
  calendarHeaderColor = "#1f2937",
  calendarHeaderBackgroundColor = "#f8fafc",
  selectedDateColor = "#7c3aed",
  selectedDateBackgroundColor = "#ede9fe",
  todayColor = "#1f2937",
  todayBackgroundColor = "#f3f4f6",
  hoverDateColor = "#1f2937",
  hoverDateBackgroundColor = "#f8fafc",
  disabledDateColor = "#9ca3af",
  disabledDateBackgroundColor = "#f9fafb",
  monthYearSelectorColor = "#7c3aed",
  monthYearSelectorBackgroundColor = "#fff",
  monthYearSelectorBorderColor = "#e5e7eb",
  weekDaysColor = "#6b7280",
  weekDaysBackgroundColor = "#f9fafb",
  locale = "es-ES",
  minDate,
  maxDate,
  disabledDates = [],
  disabled = false,
  required = false,
  label,
  error,
  helperText,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    if (value !== undefined) return new Date(value);
    if (defaultValue !== undefined) return new Date(defaultValue);
    return new Date();
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    if (value !== undefined) return new Date(value);
    if (defaultValue !== undefined) return new Date(defaultValue);
    return null;
  });
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const datePickerRef = useRef(null);
  const datePickerId = useUniqueId("datepicker");
  const errorId = useUniqueId("error");
  const helperId = useUniqueId("helper");

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const weekDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowMonthSelector(false);
        setShowYearSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentDate(new Date(value));
    }
  }, [value]);

  const formatDate = (date) => {
    if (!date) return placeholder;
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = (firstDay.getDay() + 6) % 7; // Convertir domingo=0 a lunes=0

    const days = [];

    // Días del mes anterior
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    // Días del mes actual
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected:
          selectedDate && date.toDateString() === selectedDate.toDateString(),
      });
    }

    // Días del mes siguiente para completar la cuadrícula
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return disabledDates.some(
      (disabledDate) =>
        date.toDateString() === new Date(disabledDate).toDateString()
    );
  };

  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;

    setSelectedDate(date);
    setCurrentDate(date);
    setIsOpen(false);
    setShowMonthSelector(false);
    setShowYearSelector(false);
    onChange?.(date);
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateYear = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
    setShowMonthSelector(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearSelector(false);
  };

  const getYearRange = () => {
    const currentYear = currentDate.getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowMonthSelector(false);
    setShowYearSelector(false);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div
      ref={datePickerRef}
      className="select-component"
      style={{
        position: "relative",
        width,
        display: "inline-block",
      }}
      {...props}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={datePickerId}
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
        id={datePickerId}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : toggleDropdown}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isOpen) {
            e.target.style.borderColor = hoverDateColor;
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
          borderRadius: borderRadius,
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
            color: selectedDate ? color : "#9ca3af",
            fontWeight: selectedDate ? "500" : "400",
          }}
        >
          {formatDate(selectedDate)}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: disabled ? "#9ca3af" : arrowColor,
            flexShrink: 0,
          }}
          aria-hidden
        >
          <path
            d="M4 4V6M12 4V6M3 8H13M4 3H12C12.5523 3 13 3.44772 13 4V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3Z"
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

      {/* Calendar Dropdown */}
      {isOpen && (
        <div
          role="dialog"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            backgroundColor: calendarBackgroundColor,
            border: `1px solid ${calendarBorderColor}`,
            borderRadius: borderRadius,
            boxShadow: boxShadow,
            zIndex: 9999,
            boxSizing: "border-box",
            padding: "12px",
            marginTop: "4px",
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              backgroundColor: calendarHeaderBackgroundColor,
              padding: "8px 12px",
              borderRadius: "4px",
            }}
          >
            <button
              onClick={() => navigateYear(-1)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: calendarHeaderColor,
                fontSize: "16px",
                padding: "8px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => navigateMonth(-1)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: calendarHeaderColor,
                fontSize: "16px",
                padding: "8px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setShowMonthSelector(!showMonthSelector)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: calendarHeaderColor,
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "4px 8px",
                }}
              >
                {months[currentDate.getMonth()]}
              </button>
              <button
                onClick={() => setShowYearSelector(!showYearSelector)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: calendarHeaderColor,
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "4px 8px",
                }}
              >
                {currentDate.getFullYear()}
              </button>
            </div>

            <button
              onClick={() => navigateMonth(1)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: calendarHeaderColor,
                fontSize: "16px",
                padding: "8px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => navigateYear(1)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: calendarHeaderColor,
                fontSize: "16px",
                padding: "8px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Month Selector */}
          {showMonthSelector && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4px",
                marginBottom: "16px",
                backgroundColor: monthYearSelectorBackgroundColor,
                border: `1px solid ${monthYearSelectorBorderColor}`,
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  style={{
                    background:
                      currentDate.getMonth() === index
                        ? monthYearSelectorColor
                        : "transparent",
                    color:
                      currentDate.getMonth() === index
                        ? "#fff"
                        : monthYearSelectorColor,
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 4px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {month.substring(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year Selector */}
          {showYearSelector && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "4px",
                marginBottom: "16px",
                backgroundColor: monthYearSelectorBackgroundColor,
                border: `1px solid ${monthYearSelectorBorderColor}`,
                borderRadius: "4px",
                padding: "8px",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            >
              {getYearRange().map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  style={{
                    background:
                      currentDate.getFullYear() === year
                        ? monthYearSelectorColor
                        : "transparent",
                    color:
                      currentDate.getFullYear() === year
                        ? "#fff"
                        : monthYearSelectorColor,
                    border: "none",
                    cursor: "pointer",
                    padding: "6px 4px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {/* Week Days Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "2px",
              marginBottom: "6px",
            }}
          >
            {weekDays.map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: weekDaysColor,
                  backgroundColor: weekDaysBackgroundColor,
                  padding: "8px 4px",
                  borderRadius: "4px",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "2px",
            }}
          >
            {days.map((day, index) => {
              const isDisabled = isDateDisabled(day.date);
              const isSelected = day.isSelected;
              const isToday = day.isToday;
              const isCurrentMonth = day.isCurrentMonth;

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day.date)}
                  disabled={isDisabled}
                  style={{
                    background: isSelected
                      ? selectedDateBackgroundColor
                      : isToday
                      ? todayBackgroundColor
                      : "transparent",
                    color: isSelected
                      ? selectedDateColor
                      : isToday
                      ? todayColor
                      : isCurrentMonth
                      ? calendarTextColor
                      : disabledDateColor,
                    border: "none",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    padding: "10px 8px",
                    borderRadius: "8px",
                    fontSize: "var(--select-font-size)",
                    fontWeight:
                      isSelected || isToday
                        ? "var(--select-font-weight-semibold)"
                        : "var(--select-font-weight)",
                    opacity: isCurrentMonth ? 1 : 0.5,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "36px",
                    minWidth: "36px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected) {
                      e.target.style.backgroundColor = hoverDateBackgroundColor;
                      e.target.style.color = hoverDateColor;
                      e.target.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isSelected) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = isCurrentMonth
                        ? calendarTextColor
                        : disabledDateColor;
                      e.target.style.transform = "scale(1)";
                    }
                  }}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
