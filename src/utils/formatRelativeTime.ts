import { formatDistanceToNowStrict } from "date-fns";

const relativeTimeLabels: Record<string, string> = {
  lessThanXSeconds: "recién",
  xSeconds: "hace {count} s",
  halfAMinute: "hace 30 s",
  lessThanXMinutes: "hace {count} min",
  xMinutes: "hace {count} min",
  aboutXHours: "hace {count} h",
  xHours: "hace {count} h",
  xDays: "hace {count} d",
  aboutXWeeks: "hace {count} sem",
  xWeeks: "hace {count} sem",
  aboutXMonths: "hace {count} mes",
  xMonths: "hace {count} meses",
  aboutXYears: "hace {count} año",
  xYears: "hace {count} años",
  overXYears: "hace {count} años",
  almostXYears: "hace {count} años",
};

export const formatRelativeTime = (date: Date | string | null): string => {
  if (!date) return "N/A";

  try {
    const value = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(value.getTime())) return "N/A";

    return formatDistanceToNowStrict(value, {
      addSuffix: true,
      roundingMethod: "floor",
      locale: {
        formatDistance: (token, count) =>
          relativeTimeLabels[token].replace("{count}", String(count)),
      },
    });
  } catch {
    return "N/A";
  }
};
