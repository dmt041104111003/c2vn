import DocSidebar from "~/components/docs/doc-sidebar";
import DocContentComponent from "~/components/docs/doc-content";
import DocBreadcrumb from "~/components/docs/doc-breadcrumb";
import { installationContent } from "~/constants/docs";

export default function InstallationPage() {
  return (
    <main className="relative pt-20">
      <div className="flex min-h-screen bg-white">
        <DocSidebar />
        
        <div className="flex-1 max-w-none">
          <div className="px-8 py-6">
            <DocBreadcrumb
              items={[
                { label: "Documentation", href: "/docs" },
                { label: "New to Cardano?", href: "/docs/new-to-cardano" },
                { label: "Installation" },
              ]}
            />
            
            <DocContentComponent content={installationContent} />
          </div>
        </div>
      </div>
    </main>
  );
} 