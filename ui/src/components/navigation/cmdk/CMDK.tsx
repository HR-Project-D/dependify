import React, { useEffect } from "react";
import { Command } from "cmdk";
import Home from "./pages/Home";
import DataSources from "./pages/DataSources";
import { AnimatePresence, motion } from "framer-motion";
import { useUIContext } from "@/state/UI";

export function CMDK() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  const [pages, setPages] = React.useState<string[]>(["home"]);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === "home";


  const { state: UIState, dispatch: UIDispatch } = useUIContext();

  const open = UIState.commandMenu

  const popPage = React.useCallback(() => {
    setPages((pages) => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  function onClose() {
    setInputValue("");
    UIDispatch({ type: "TOGGLE_COMMAND_MENU" });
    setPages(["home"]);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setInputValue("");
      UIDispatch({ type: "TOGGLE_COMMAND_MENU" });
      setPages(["home"]);
    }

    if (e.key === "Enter") {
      bounce();
    }

    if (isHome || inputValue.length) {
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      popPage();
      bounce();
    }
  }

  function bounce() {
    setInputValue("");

    if (ref.current) {
      ref.current.style.transform = "scale(0.96)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "";
        }
      }, 100);
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setInputValue("");
        UIDispatch({ type: "TOGGLE_COMMAND_MENU" });
        setPages(["home"]);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as any)) {
        setInputValue("");
        UIDispatch({ type: "TOGGLE_COMMAND_MENU" });
        setPages(["home"]);
      }
    };

    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="fixed z-[1001] flex h-screen w-full items-start justify-center overflow-hidden bg-black-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={"container"}
        >
          <motion.div
            key={"cmdk-menu"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex h-full w-full items-start justify-center px-4"
          >
            <Command
              label="Global Command Menu"
              ref={ref}
              onKeyDown={onKeyDown}
            >
              <div>
                {pages.map((p) => (
                  <div key={p} cmdk-page-badge="">
                    {p}
                  </div>
                ))}
              </div>
              <Command.Input
                autoFocus
                value={inputValue}
                placeholder="What do you need?"
                onValueChange={(value) => {
                  setInputValue(value);
                }}
              />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                {activePage === "home" && (
                  <Home
                    searchDataSources={() =>
                      setPages([...pages, "data sources"])
                    }
                  />
                )}
                {activePage === "data sources" && <DataSources />}
              </Command.List>

              <footer cmdk-footer="">
                <div cmdk-footer-container="">
                  <div cmdk-shortcuts="" cmdk-footer-item="">
                    <kbd key="↑">↑</kbd>
                    <kbd key="↓">↓</kbd>
                    <label>Navigate</label>
                  </div>
                  <div cmdk-shortcuts="" cmdk-footer-item="">
                    <kbd key="⏎">⏎</kbd>
                    <label>Select</label>
                  </div>
                  <div cmdk-shortcuts="" cmdk-footer-item="">
                    <kbd key="←">← </kbd>
                    <label>Return</label>
                  </div>
                </div>
                <div cmdk-shortcuts="" cmdk-footer-item="">
                  <kbd key="Esc">Esc</kbd>
                  <label>Close</label>
                </div>
              </footer>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
