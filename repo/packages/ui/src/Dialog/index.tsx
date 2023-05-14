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

  if (open) {
    return (
      <div
        className={clsx(
          className,
          "um-fixed um-inset-0 um-z-max dark:um-backdrop-brightness-50 um-backdrop-blur-xl um-flex um-w-full um-h-full um-justify-center um-overflow-y-auto",
          "um-p-5",
          { "um-hidden": !open }
        )}
        {...props}
      >
        <div className="um-flex um-flex-col um-items-start um-w-full um-h-full um-max-w-2xl um-py-20">
          <IconButton variant="outlined" className="um-mb-8" onPress={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              width={"80"}
              height={"80"}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
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
        "um-fixed um-inset-0 um-z-max dark:um-backdrop-brightness-50 um-backdrop-blur-xl um-grid um-place-items-center",
        { "um-hidden": !open }
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
          "um-bg-p-10 dark:um-bg-p-1",
          "um-relative um-appearance-none um-max-w-sm um-w-auto um-rounded-lg",
          "um-p-5 um-m-5",
          "um-border-[1.5px] dark:um-border um-border-p-0 dark:um-border-p-6",
          "um-shadow-xl"
        )}
      >
        {displayCloseButton ? (
          <IconButton
            variant="outlined"
            size="small"
            className="um-absolute -um-top-16 um-right-0"
            onPress={onClose}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="um-w-6 um-h-6"
            >
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
