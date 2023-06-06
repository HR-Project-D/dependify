import ResizablePanel from "@/components/motion/ResizablePanel";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconChevron, IconDocker, IconFile, IconX } from "../Icons";
import { APIResponseScan } from "@/types/api/api-scan";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/input/Button";
import { Project } from "@/types/scan";
import Body from "@/components/text/Body";
import BodyBase from "@/components/text/BodyBase";
import Tooltip from "@/components/status_info/Tooltip";
import Subtitle from "@/components/text/Subtitle";

type ScanResultsProps = {
  results: APIResponseScan;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function ScanResults({ results, open, setOpen }: ScanResultsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // console.log(" RESULTS ")
  // console.log( results);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        setOpen(open);
        setIsExpanded(open);
      }}
      open={open}
      defaultOpen
    >
      <AnimatePresence>
        {open && (
          <Dialog.Portal
            forceMount
            className="z-50 flex h-screen w-screen items-center justify-center"
          >
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 cursor-pointer bg-black-64 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              ></motion.div>
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount className="fixed z-[60]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`no-scrollbar fixed left-[5%] top-[10%] z-[60] flex max-h-[80%] w-[90%] flex-col gap-8 overflow-y-scroll rounded-lg border border-white-8 bg-gray-0 p-8 pt-0 drop-shadow-2xl lg:left-[25%] lg:w-1/2`}
              >
                <header className="sticky top-0 z-[20] flex w-full justify-between border-b border-white-8 bg-gray-0 pb-4 pt-8">
                  <Subtitle className="">Search Results</Subtitle>
                  <Button
                    className="h-fit"
                    onClick={() => setOpen(false)}
                    size="icon"
                    intent="noBG"
                  >
                    <IconX className="w-5" />
                  </Button>
                </header>

                <section className="no-scrollbar flex flex-col">
                  {results.data.map((project) => (
                    <ScanResultProject
                      key={project.name + project.version}
                      project={project}
                    />
                  ))}
                </section>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default ScanResults;

function ScanResultProject({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mb-4 overflow-hidden rounded-lg border border-white-8 last:mb-0">
        <button
          className="first flex w-full items-center justify-between bg-gray-1 px-6 py-3"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-3 text-sm font-medium">
            <IconChevron
              className={`w-5 -rotate-90  ${
                isOpen && "rotate-0"
              } transition-all duration-300`}
            />
            <Body as="span">{project.name}</Body>
          </div>

          <table className="">
            <tbody>
              <tr className=" flex w-full items-center whitespace-nowrap">
                {project.dockerImage && (
                  <td className="flex w-full items-center gap-2 px-2 text-sm text-white-48">
                    <IconDocker className="mt-1 w-6 text-white-48" />
                    {project.dockerImage}
                  </td>
                )}
                <td className="flex w-full items-center gap-2 px-2 text-sm text-white-48">
                  <IconFile className="mt-1 w-4 text-white-48" />
                  {project.sbomFile}
                </td>
              </tr>
            </tbody>
          </table>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && project.results && (
            <ResizablePanel
              className="w-full overflow-hidden border-t border-white-8 first:border-t-0"
              key={project.name + "content"}
            >
              <div className="w-full py-4 pl-14 pr-6">
                <table className="w-full whitespace-nowrap text-left">
                  <tbody className="text-sm text-black-56 dark:text-white-56">
                    {project.results.map((result, index) => (
                      <tr
                        className=""
                        key={result.version + index + result.label}
                      >
                        <td className="w-0 py-1.5 pr-6">
                          <span className="w-fit rounded-full bg-white-8 px-3 py-1 text-xs font-medium">
                            {result.version}
                          </span>
                        </td>
                        <td className="flex-1 font-medium text-white-56">
                          {result.label}
                        </td>
                        {result.purl && (
                          <td className="flex-1 text-xs font-medium text-white-48">
                            {result.purl}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ResizablePanel>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
