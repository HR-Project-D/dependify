import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Scan",
    href: "/scan",
  },
  {
    title: "Data Sources",
    href: "/data-sources",
  },
];

type NavItemType = (typeof navItems)[0];

function MainNav() {
  const [tabBoundingBox, setTabBoundingBox] = React.useState<
    DOMRect | undefined
  >();
  const [wrapperBoundingBox, setWrapperBoundingBox] = React.useState<
    DOMRect | undefined
  >();
  const [highlightedTab, setHighlightedTab] =
    React.useState<NavItemType | null>(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = React.useState(false);

  const highlightRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const repositionHighlight = (
    e: React.MouseEvent<HTMLSpanElement>,
    tab: NavItemType
  ) => {
    const target = e.target as HTMLDivElement;

    setTabBoundingBox(target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles: React.CSSProperties = {};

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
    highlightStyles.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
  }

  return (
    <Nav innerRef={wrapperRef} onMouseLeave={resetHighlight}>
      <NavHighlight
        tabBoundingBox={tabBoundingBox}
        innerRef={highlightRef}
        style={highlightStyles}
      />
      {navItems.map((tab) => (
        <NavItem
          key={tab.title}
          href={tab.href}
          onMouseOver={(ev) => repositionHighlight(ev, tab)}
        >
          {tab.title}
        </NavItem>
      ))}
    </Nav>
  );
}

interface Nav extends React.HTMLProps<HTMLDivElement> {
  innerRef?: React.Ref<HTMLDivElement>;
}

function Nav({ children, innerRef, ...props }: Nav) {
  return (
    <div
      ref={innerRef}
      className="pointer-events-auto relative flex w-full justify-center border-b border-white-8 px-6"
      {...props}
    >
      <ul className="w-full max-w-[1316px]">{children}</ul>
    </div>
  );
}

interface NavItem extends React.HTMLProps<HTMLLIElement> {
  href: string;
}

/**
 * Pointer events none is neccessary on the motion.div because the highlight div is positioned
 * absolutely over the nav item. This in combination with the framer motion
 * layout animation causes the left offset to be incorrect. This can be fixed
 * by setting the highlight div to pointer-events-none so when the page loads and
 * you are still hovering the navitem, the left offset wont be affected by the underline.
 */
function NavItem({ children, href, ...props }: NavItem) {
  const isActive = useRouter().pathname === href;

  return (
    <Link href={href}>
      <li
        {...props}
        className={`relative inline-block cursor-pointer px-4 py-4 text-sm font-medium transition-all duration-300
          ${isActive ? "text-white" : "text-white-48 hover:text-white"}
        `}
      >
        {children}
        {isActive && (
          <motion.div
            transition={{ type: "spring", stiffness: 165, damping: 30 }}
            nav-item-underline=""
            className="nav-item pointer-events-none absolute left-0 top-0 block h-full w-full"
            layoutId="tab-underline"
          ></motion.div>
        )}
      </li>
    </Link>
  );
}

interface NavHighlight extends React.HTMLProps<HTMLDivElement> {
  innerRef?: React.Ref<HTMLDivElement>;
  tabBoundingBox?: DOMRect;
}

function NavHighlight({
  children,
  innerRef,
  tabBoundingBox,
  ...props
}: NavHighlight) {
  return (
    <div
      ref={innerRef}
      {...props}
      className={`absolute left-0 top-2.5 h-8 rounded bg-gray-3 transition-all duration-150 ${
        tabBoundingBox && `h-[${tabBoundingBox.height}]`
      }`}
    />
  );
}

export default MainNav;
