export const getExperienceColor = (experience: string): string => {
  switch (experience) {
    case "MUY_BUENO":
      return "p-1 bg-emerald-500/80 text-white rounded-lg dark:bg-emerald-600/80 dark:text-emerald-100";
    case "BUENO":
      return "p-1 bg-green-500/80 text-white rounded-lg dark:bg-green-600/80 dark:text-green-100";
    case "REGULAR":
      return "p-1 bg-amber-500/80 text-white rounded-lg dark:bg-amber-600/80 dark:text-amber-100";
    case "MALO":
      return "p-1 bg-orange-500/80 text-white rounded-lg dark:bg-orange-600/80 dark:text-orange-100";
    case "MUY_MALO":
      return "p-1 bg-red-600/80 text-white rounded-lg dark:bg-red-700/80 dark:text-red-100";
    case "NO_RESPONDE":
      return "p-1 bg-gray-400/80 text-white rounded-lg dark:bg-gray-500/80 dark:text-gray-300";
    default:
      return "";
  }
};
