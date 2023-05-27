import ResizablePanel from "@/components/motion/ResizablePanel";
import { Button } from "@/components/input/Button";
import { IconMinusCircle } from "@/components/_other/Icons";
import BodyBase from "@/components/text/BodyBase";
import BodyLarge from "@/components/text/BodyLarge";
import { Query } from "@/types/scan";
import { AnimatePresence, motion } from "framer-motion";
import { importQuery } from "@/utils/query";
import { useState } from "react";
import { IconPlusCircle } from "@/components/_other/Icons";

function QueryList({
  queries,
  onClear,
  onRemove,
  title,
}: {
  queries: Query[] | undefined;
  onClear: () => void;
  onRemove: (query: Query) => void;
  title: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <BodyLarge className="ml-3 font-medium">{title}</BodyLarge>
        <Button className="mr-3" onClick={onClear} size="compact" intent="noBG">
          Clear All
        </Button>
      </div>
      {queries && queries.length > 0 ? (
        <ResizablePanel key="saved-queries">
          <ul className="flex flex-col">
            {queries ? (
              <AnimatePresence initial={false}>
                {queries.map((query) => (
                  <motion.li
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    key={query.id}
                  >
                    <div
                      onClick={() => setIsExpanded((prev) => !prev)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-white-48 hover:bg-gray-3 hover:text-white"
                    >
                      <BodyBase>{query.dependencyName}</BodyBase>
                      <div className="flex">
                        <Button
                          onClick={() => onRemove(query)}
                          rounded="full"
                          size="icon"
                          intent="noBG"
                        >
                          <IconMinusCircle className="h-4 w-4 text-white-48" />
                        </Button>
                        <Button
                          onClick={() => importQuery(query)}
                          rounded="full"
                          size="icon"
                          intent="noBG"
                        >
                          <IconPlusCircle className="h-4 w-4 -rotate-90 text-white-48" />
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            ) : (
              <div></div>
            )}
          </ul>
        </ResizablePanel>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default QueryList;
