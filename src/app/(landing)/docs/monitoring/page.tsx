import DocSidebar from "~/components/docs/doc-sidebar";
import DocContentComponent from "~/components/docs/doc-content";
import DocBreadcrumb from "~/components/docs/doc-breadcrumb";
import { monitoringContent } from "~/constants/docs";

export default function MonitoringPage() {
  return (
    <main className="relative pt-20">
      <div className="flex min-h-screen bg-white">
        <DocSidebar />
        
        <div className="flex-1 max-w-none">
          <div className="px-8 py-6">
            <DocBreadcrumb
              items={[
                { label: "Documentation", href: "/docs" },
                { label: "Learn", href: "/docs/learn" },
                { label: "Stake Pool Operators", href: "/docs/stake-pool-operators" },
                { label: "Monitoring" },
              ]}
            />
            
            <DocContentComponent content={monitoringContent} />
          </div>
        </div>
      </div>
    </main>
  );
} 