import clsx from "clsx";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

export const PaginationControls = ({
  page,
  pageSize,
  totalItems,
  onPageChange,
  className = "",
}: PaginationControlsProps) => {
  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div
      className={clsx(
        "absolute -top-8 left-0 right-0 flex justify-end gap-4 items-center z-10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-1.5 rounded-md bg-primary/70 disabled:opacity-40"
        >
          <ArrowLeft2 size={16} />
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          className="p-1.5 rounded-md bg-primary/70 disabled:opacity-40"
        >
          <ArrowRight2 size={16} />
        </button>
      </div>
    </div>
  );
};
