import Title from "~/components/title";

export default function RoadmapPage() {
  return (
    <main className="relative pt-20">
      <Title title="Roadmap" description="Our journey of building the Andamio platform and ecosystem, from founding to the present day and beyond." />
      {/* <div className="mb-8 w-full md:w-80">
        <div dir="ltr" data-orientation="horizontal" className="rounded-none">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="items-center justify-center p-2 text-accent-foreground grid w-full grid-cols-2 rounded-sm outline-none border border-white/20 bg-gray-800/50 backdrop-blur-sm"
            data-orientation="horizontal"
          >
            <button
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls="radix-:r0:-content-time"
              data-state="active"
              id="radix-:r0:-trigger-time"
              className="whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow flex items-center justify-center space-x-2 rounded-sm text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-clock h-4 w-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Timeline</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="radix-:r0:-content-category"
              data-state="inactive"
              id="radix-:r0:-trigger-category"
              className="whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow flex items-center justify-center space-x-2 rounded-sm text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-layers h-4 w-4"
              >
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
              </svg>
              <span>Categories</span>
            </button>
          </div>
        </div>
      </div> */}
    </main>
  );
}
