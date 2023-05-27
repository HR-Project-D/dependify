import { Field, FieldAttributes } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { ChangeEvent } from "react";

interface CheckboxProps extends FieldAttributes<any> {
  onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export function Checkbox({ children, onClick, ...props }: CheckboxProps) {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="group relative flex">
      <span className="pointer-events-none absolute flex h-full w-full items-center justify-center">
        <AnimatePresence>
          {checked && <CheckIcon className="h-3 w-3 text-white" />}
        </AnimatePresence>
      </span>
      <Field
        onChange={(e: any) => {
          setChecked(!checked);
        }}
        onClick={onClick}
        checked={checked}
        type="checkbox"
        className="h-5 w-5 disabled:cursor-not-allowed appearance-none rounded-md border border-white-16 p-2 transition-colors duration-300
        checked:border-accent-8 checked:bg-accent-8 checked:active:bg-accent-7 enabled:hover:bg-white-5 enabled:checked:hover:bg-accent-8
        enabled:focus:outline-2 enabled:focus:outline-offset-1 enabled:active:border-white-8 enabled:active:bg-white-5
        disabled:border-white-8 checked:disabled:opacity-60"
        {...props}
      />
    </div>
  );
}

export function CheckboxLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`flex items-center gap-3 whitespace-nowrap text-sm text-white-56 ${className}`}
    >
      {children}
    </label>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        animate={{ pathLength: 1 }}
        initial={{ pathLength: 0 }}
        exit={{ pathLength: 0 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
