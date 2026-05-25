import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type PageLayoutProps = {
  children: React.ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative flex-1 pt-[5.25rem]">{children}</main>
      <Footer />
    </>
  );
}
