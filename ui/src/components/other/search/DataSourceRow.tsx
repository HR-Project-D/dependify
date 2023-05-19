import ResizablePanel from "@/components/motion/ResizablePanel";
import { IconChevron } from "@/components/shared/Icons";
import { Dependency } from "@/types/dependency";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

function DataSourceRow({
  label,
  results,
}: {
  label: string;
  results?: Array<Dependency>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="first flex w-full items-center justify-between border-t border-black-8 dark:border-gray-5 px-6 py-4 last:border-b-0 first-of-type:border-t-0"
      >
        <div className="flex items-center gap-3 text-sm font-medium">
          <IconChevron className={`w-5 -rotate-90  ${isOpen && "rotate-0"} duration-300 transition-all`} />
          <h4>{label}</h4>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black-8 dark:bg-white-8 text-xs font-medium text-black-64 dark:text-white-64">
          {results?.length || 0}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && results && (
          <ResizablePanel
            className="w-full overflow-hidden border-t border-black-8 dark:border-gray-5 first:border-t-0"
            key={label + "content"}
          >
            <div className="w-full py-4 pl-14 pr-6">
              <table className="w-full whitespace-nowrap text-left">
                <tbody className="text-sm text-black-56 dark:text-white-56">
                  {results.map((result, index) => (
                    <tr className="" key={result.version + index}>
                      <td className="w-0 py-1.5 pr-6">
                        <span className="w-fit rounded-full bg-black-8 dark:bg-white-8 px-3 py-1 text-xs font-medium">
                          {result.version}
                        </span>
                      </td>
                      <td className="flex-1 font-medium text-gray-DARK dark:text-white">
                        {result.label}
                      </td>
                      <td className="w-0 pr-6 text-right">
                        {result.dockerImage}
                      </td>
                      <td className="w-0 pr-6 text-right">{result.sbomFile}</td>
                      <td className="w-0 text-right">
                        <span className="rounded-full border border-white-10 px-3 py-1 text-xs uppercase first-letter:rounded-full">
                          {result.sbomFormat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ResizablePanel>
        )}
      </AnimatePresence>
    </>
  );
}

export default DataSourceRow;
