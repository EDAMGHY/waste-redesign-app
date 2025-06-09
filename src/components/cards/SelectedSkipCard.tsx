import type { ISkip } from "@/types";
import { Warning2, TickSquare, CloseSquare } from "iconsax-reactjs";
import { ItemCard } from "./ItemCard";

export const SelectedSkipCard = ({ skip }: { skip: ISkip }) => {
  return (
    <div className="relative w-full lg:h-auto h-fit lg:aspect-square bg-zinc-900 rounded-md overflow-hidden shadow-lg">
      {/* Skip Image */}
      <img
        src={`https://placehold.co/500x500.png?text=Skip+${skip.size}yd`}
        alt={`Photo of ${skip.size}-yard skip`}
        className="w-full h-48 lg:h-56 object-cover"
      />
      <div className="p-5 flex flex-col gap-4">
        {/* Details Container */}
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-white">
            {skip.size}-Yard Skip
          </h3>

          <span className="inline-block md:text-base text-sm py-1 px-3 rounded rounded-tl-xl rounded-br-xl bg-primary font-semibold">
            £{skip.price_before_vat}
          </span>
        </div>
        {/* Key details in two columns */}
        <div className="grid grid-cols-3 gap-4 text-sm text-neutral-300">
          <ItemCard
            label="Hire Period"
            value={`${skip.hire_period_days} days`}
          />
          <ItemCard label="VAT %" value={`${skip.vat}%`} />
          <ItemCard label="Postcode" value={skip.postcode || "N/A"} />
          <ItemCard label="Area" value={skip.area || "N/A"} />
          <ItemCard
            label="Transport Cost"
            value={
              skip.transport_cost != null ? `£${skip.transport_cost}` : "-"
            }
          />
          <ItemCard
            label="Per Tonne Cost"
            value={
              skip.per_tonne_cost != null ? `£${skip.per_tonne_cost}` : "-"
            }
          />
        </div>
        <hr className="border-t border-zinc-700" />
        {/* Status badges */}
        <div className="justify-self-end flex items-center gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2">
            {skip.allowed_on_road ? (
              <TickSquare size={20} className="text-green-400" />
            ) : (
              <CloseSquare size={20} className="text-red-400" />
            )}
            <span className="text-neutral-200 text-xs md:text-sm">
              {skip.allowed_on_road ? "Allowed on Road" : "Not Allowed on Road"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2">
            {skip.allows_heavy_waste ? (
              <TickSquare size={20} className="text-green-400" />
            ) : (
              <CloseSquare size={20} className="text-red-400" />
            )}
            <span className="text-neutral-200 text-sm">
              {skip.allows_heavy_waste
                ? "Allows Heavy Waste"
                : "No Heavy Waste"}
            </span>
          </div>
        </div>

        {/* Forbidden Badge */}
        {skip.forbidden && (
          <div className="absolute uppercase top-3 right-3 font-medium inline-flex items-center gap-1 rounded-md bg-red-600/80 py-1 px-2 text-sm text-white">
            <Warning2 size={16} />
            <span>Forbidden</span>
          </div>
        )}
      </div>
    </div>
  );
};
