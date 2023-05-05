"use client";
import { FC, useEffect, useRef } from "react";
import clsx from "clsx";
import { IconButton } from "../Buttons";

interface DialogBaseProps extends React.HTMLProps<HTMLDivElement> {
  onClose: () => void;
}

export const FullScreenDialog = ({
  open,
  onClose,
  className,
  children,
  ...props
}: DialogBaseProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open && typeof window !== "undefined") {
      window.document.addEventListener("keydown", handleEscapeKey);
    } else {
      window.document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        className,
        "fixed inset-0 z-max backdrop-brightness-90 backdrop-blur-2xl grid w-full justify-center",
        "p-5",
        { hidden: !open }
      )}
      {...props}
    >
      <div className="w-full max-w-2xl">
        <IconButton
          variant="outlined"
          size="small"
          className="mt-20 mb-8"
          onClick={onClose}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-20 h-20">
            <path
              fillRule="evenodd"
              d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 11-.707-.707L9.293 10 5.652 6.36a.5.5 0 11.707-.707L10 9.293l3.64-3.64a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
        </IconButton>
        {children}
      </div>
    </div>
  );
};

interface DialogProps extends DialogBaseProps {
  displayCloseButton?: boolean;
}

export const Dialog = ({
  open = false,
  onClose,
  displayCloseButton = false,
  className,
  children,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open && typeof window !== "undefined") {
      window.document.addEventListener("keydown", handleEscapeKey);
    } else {
      window.document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]);

  return (
    <div
      ref={dialogRef}
      className={clsx(
        "fixed inset-0 z-max backdrop-brightness-75 backdrop-blur-2xl grid place-items-center",
        { hidden: !open }
      )}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <dialog
        open={open}
        className={clsx(
          className,
          "bg-p-10 dark:bg-p-1",
          "relative appearance-none max-w-sm w-auto rounded-lg",
          "p-5 m-5",
          "border-[1.5px] dark:border",
          "shadow-xl"
        )}
      >
        {displayCloseButton ? (
          <IconButton
            variant="outlined"
            size="small"
            className="absolute -top-16 right-0 mx-5"
            onClick={onClose}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="x w-6 h-6">
              <path
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 11-.707-.707L9.293 10 5.652 6.36a.5.5 0 11.707-.707L10 9.293l3.64-3.64a.5.5 0 01.708 0z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        ) : null}
        {children}
      </dialog>
    </div>
  );
};
