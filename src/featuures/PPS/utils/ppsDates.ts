import type { DueYearRelation } from "@/featuures/PPS/models/IPps";

export const buildDueDate = (
  validityYear: number,
  dueMonth: number,
  dueDay: number,
  dueYearRelation: DueYearRelation
): string => {
  const year = validityYear + (dueYearRelation === "next" ? 1 : 0);
  const month = String(dueMonth).padStart(2, "0");
  const day = String(dueDay).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isDeadlinePassed = (isoDate: string): boolean => {
  const today = new Date().toISOString().slice(0, 10);
  return isoDate < today;
};
