
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
function SiteLayout({ children }) {
  return <div className="flex min-h-screen flex-col"><Navbar /><main className="flex-1">{children}</main><Footer /></div>;
}
export {
  SiteLayout as default
};
