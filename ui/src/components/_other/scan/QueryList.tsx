import ResizablePanel from "@/components/motion/ResizablePanel";
import { Button } from "@/components/input/Button";
import { IconEye, IconMinusCircle } from "@/components/_other/Icons";
import BodyBase from "@/components/text/BodyBase";
import BodyLarge from "@/components/text/BodyLarge";
import { Query } from "@/types/scan";
import { AnimatePresence, motion } from "framer-motion";
import { importQuery } from "@/utils/query";
import { useEffect, useState } from "react";
import { IconPlusCircle } from "@/components/_other/Icons";
import Body from "@/components/text/Body";
import { capitalize } from "@/utils/formatting";

function QueryList({
  onClear,
  onRemove,
  getQueries,
  title,
}: {
  onClear: () => void;
  onRemove: (query: Query) => void;
  getQueries: () => Query[] | undefined;
  title: string;
}) {
  const [queries, setQueries] = useState<Query[] | undefined>();

  function handleGetQueries() {
    setQueries(getQueries());
  }

  useEffect(() => {
    handleGetQueries();

    window.addEventListener("storage", () => {
      handleGetQueries();
    });

    return () => {
      window.removeEventListener("storage", () => {
        handleGetQueries();
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <BodyLarge className="font-medium">{title}</BodyLarge>
        <Button onClick={onClear} size="compact" intent="noBG">
          Clear All
        </Button>
      </div>
      {queries !== undefined && queries.length > 0 ? (
        <AnimatePresence initial={false} mode="wait">
          <ResizablePanel key="saved-queries">
            <ul className="flex flex-col">
              {queries ? (
                <AnimatePresence initial={false}>
                  {queries.map((query) => (
                    <QueryItem
                      key={query.id}
                      query={query}
                      onRemove={onRemove}
                    />
                  ))}
                </AnimatePresence>
              ) : (
                <div></div>
              )}
            </ul>
          </ResizablePanel>
        </AnimatePresence>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default QueryList;

function QueryItem({
  query,
  onRemove,
}: {
  query: Query;
  onRemove: (query: Query) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      key={query.id}
    >
      <div
        className={`flex w-full items-center justify-between rounded-lg py-1.5 text-white-48 hover:text-white`}
      >
        <BodyBase>{query.dependencyName}</BodyBase>
        <div className="flex">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            rounded="full"
            size="icon"
            intent="noBG"
          >
            <IconEye className="h-4 w-4 text-white-48" />
          </Button>
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

      <AnimatePresence initial={false} mode="wait">
        {isExpanded && (
          <ResizablePanel
            key="expanded"
          >
            <div
              className="mr-1 flex flex-col gap-2 border-t border-t-white-8 py-4 text-white-48"
            >
              {query.versions.length > 0 ? (
                <Body as="span" className="flex flex-col gap-1">
                  {query.versions.map((version) => (
                    <div
                      className="flex w-full items-center justify-between"
                      key={version.version}
                    >
                      <span>{capitalize(version.type)}</span>
                      <span>{version.version}</span>
                    </div>
                  ))}
                </Body>
              ) : (
                <Body as="span">No version guards specified..</Body>
              )}
            </div>
          </ResizablePanel>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
