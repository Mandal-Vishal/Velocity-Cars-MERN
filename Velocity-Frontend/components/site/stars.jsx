
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
function Stars({
  rating,
  size = 14,
  className,
  showValue = false
}) {
  return <div className={cn("flex items-center gap-1", className)}><div className="flex items-center">{Array.from({ length: 5 }).map((_, i) => {
      const filled = i + 1 <= Math.round(rating);
      return <Star width={size} height={size} className={cn(filled ? "fill-accent text-accent" : "fill-muted text-muted")} />;
    })}</div>{showValue && <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}</div>;
}
export {
  Stars
};
