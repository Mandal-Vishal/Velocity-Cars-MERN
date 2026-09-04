
import { Link } from "react-router-dom";
import { Car, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
function NotFound() {
  return <main className="flex min-h-[70vh] items-center justify-center px-4 text-center"><div><div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Car className="size-8" /></div><p className="mt-8 font-mono text-sm font-bold text-primary">404</p><h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">This road ends here.</h1><p className="mx-auto mt-4 max-w-md text-muted-foreground">The page you're looking for has taken a different turn.</p><Button asChild className="mt-7 rounded-full"><Link to="/"><ArrowLeft className="mr-2 size-4" />Back home</Link></Button></div></main>;
}
export {
  NotFound as default
};
