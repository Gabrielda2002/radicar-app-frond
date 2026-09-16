export const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
export const MINUTES = Array.from({ length: 60 }, (_, i) => i); // 0..59

// Convierte "HH:mm" (24h) -> { hour12, minute, meridiem }
export const parseTimeValue = (value: string) => {
  if (!value) return { hour12: "", minute: "", meridiem: "AM" as "AM" | "PM" };
  const [hStr, mStr] = value.split(":");
  const h24 = parseInt(hStr, 10);
  const meridiem: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
  let hour12 = h24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12: String(hour12), minute: mStr ?? "00", meridiem };
};

// Convierte { hour12, minute, meridiem } -> "HH:mm" (24h)
export const buildTimeValue = (hour12: string, minute: string, meridiem: "AM" | "PM") => {
  if (!hour12 || !minute) return "";
  let h = parseInt(hour12, 10) % 12;
  if (meridiem === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};
