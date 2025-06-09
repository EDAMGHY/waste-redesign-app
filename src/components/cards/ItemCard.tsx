import clsx from "clsx";

interface ItemCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export const ItemCard = ({ label, value, className }: ItemCardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-y-1 [&_span]:font-semibold [&_span]:uppercase [&_span]:text-xs md:[&_span]:text-sm [&_p]:text-neutral-500 [&_p]:text-xs md:[&_p]:text-sm",
        className
      )}
    >
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
};
