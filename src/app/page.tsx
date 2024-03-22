import BlogsPage from "@/components/BlogsPage";
import CreateOption from "@/components/CreateOption";
import Options from "@/components/Options";
import AppProvider from "@/context/app.provider";
export default function Home() {
  return (
    <main>
      <AppProvider>
        <BlogsPage />
      </AppProvider>
    </main>
  );
}
