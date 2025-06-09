import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useMedia from "use-media";
import clsx from "clsx";
import type { AxiosResponse } from "axios";

import { api } from "@/api";
import { PaginationControls, SelectedSkipCard, SkipCard } from "@/components";
import { useEdgeMask } from "@/hooks";
import type { ISkip } from "@/types";

// Constants for pagination
const PAGE_SIZE = 9;

function App() {
  const isTablet = useMedia({ maxWidth: "1024px" });
  const [selectedSkip, setSelectedSkip] = useState<ISkip | null>(null);
  const [page, setPage] = useState(1);

  // Reference for the container to apply edge masks
  const containerRef = useRef<HTMLDivElement>(null);
  const { showLeftMask, showRightMask } = useEdgeMask(containerRef);

  // Fetch skips data using React Query
  const { data: response, isFetching } = useQuery<AxiosResponse<ISkip[]>>({
    queryKey: ["choose-skip-size"],
    queryFn: () =>
      api.get("/api/skips/by-location?postcode=NR32&area=Lowestoft"),
  });

  // Extract skips from the response, defaulting to an empty array if undefined
  const skips = response?.data ?? [];

  // Memoize the paginated skips to avoid recalculating on every render
  const paginatedSkips = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return skips.slice(start, start + PAGE_SIZE);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skips, page, PAGE_SIZE]);

  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-10 p-4">
      <header className="mx-auto max-w-4xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Choose Your Skip Size</h1>
        <p className="text-sm text-neutral-400">
          Select the skip size that best suits your needs
        </p>
      </header>

      <div
        className={clsx(
          "flex w-full gap-4 flex-col lg:flex-row  lg:[&_>_*]:w-[calc(50%_-_(var(--spacing)_*_4))]"
        )}
      >
        {selectedSkip ? (
          <SelectedSkipCard skip={selectedSkip} />
        ) : (
          <div className="border lg:max-h-full max-h-[425px] aspect-square border-neutral-500/10 rounded-md flex flex-col items-center justify-center gap-4 w-full aspe">
            <p className="text-lg text-neutral-500">
              Select a skip to see more details
            </p>
          </div>
        )}

        <div className="relative">
          {PAGE_SIZE < skips.length && !isTablet && (
            <PaginationControls
              page={page}
              pageSize={PAGE_SIZE}
              totalItems={skips.length}
              onPageChange={setPage}
            />
          )}

          <div
            ref={containerRef}
            className={clsx(
              "flex flex-row gap-4 lg:place-content-start  overflow-x-auto lg:snap-none snap-x snap-mandatory no-scrollbar",
              isTablet
                ? `mask-alpha ${
                    showLeftMask &&
                    "mask-l-from-body mask-l-to-transparent mask-l-from-70%"
                  } ${
                    showRightMask &&
                    "mask-r-from-body mask-r-to-transparent mask-r-from-70%"
                  }`
                : null,
              (isFetching && !skips.length) ||
                (!isFetching && skips.length <= 0)
                ? "items-center w-full justify-center h-full lg:aspect-square"
                : "lg:grid grid-cols-2 lg:grid-cols-3"
            )}
          >
            {!isFetching && skips.length <= 0 ? (
              <div className="py-12 w-full md:h-full flex justify-center items-center text-center border rounded-md border-neutral-500/10">
                <p className="text-lg text-neutral-500">No skips available</p>
              </div>
            ) : null}

            {isFetching && !skips.length ? (
              <div className="py-12 w-full md:h-full flex justify-center items-center text-center border rounded-md border-neutral-500/10">
                <p className="text-lg text-neutral-500">Loading skips...</p>
              </div>
            ) : (
              (isTablet ? skips : paginatedSkips).map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={skip.id === selectedSkip?.id}
                  onSelect={setSelectedSkip}
                  className="shrink-0 min-w-32 !w-[calc(25%_-_(var(--spacing)_*_4))] lg:!w-full snap-start"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
