import type { ISkip } from "@/types";
import clsx from "clsx";

export interface SkipCardProps {
  skip: ISkip;
  isSelected: boolean;
  onSelect: (skip: ISkip) => void;
  className?: string;
}

export const SkipCard = ({
  skip,
  isSelected,
  onSelect,
  className = "",
}: SkipCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select ${skip.size}-yard skip`}
      aria-pressed={isSelected}
      onClick={() => onSelect(skip)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(skip)}
      className={clsx(
        "relative cursor-pointer flex flex-col w-full aspect-square items-center justify-center gap-2 rounded-md border-2 p-4 shadow-md transition-colors duration-300",
        isSelected
          ? "border-primary bg-primary/30"
          : "border-transparent bg-neutral-800/60 hover:bg-primary/30",
        className
      )}
    >
      {/* Highlight the selected skip with a colored dot */}
      <span
        className={clsx(
          "absolute top-2 left-2 z-[1] inline-block size-3 md:size-4 rounded bg-primary transition-opacity",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
      <h3 className="text-lg font-bold">{skip.size} Yard</h3>
      <p className="text-sm text-neutral-500 bg-neutral-700  rounded-md p-1">
        £{skip.price_before_vat}
      </p>
    </div>
  );
};
