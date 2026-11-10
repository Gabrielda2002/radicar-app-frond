import { CircleAlert } from "lucide-react";

interface TurnoNoticeProps {
  message: string;
}

const TurnoNotice = ({ message }: TurnoNoticeProps) => (
  <div role="alert" className="flex items-start gap-3 p-4 text-sm leading-relaxed text-red-800 bg-red-50 border border-red-200 rounded-xl dark:text-red-200 dark:bg-red-950/40 dark:border-red-900">
    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
    <p>{message}</p>
  </div>
);

export default TurnoNotice;
