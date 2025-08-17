"use client";

import { TabGroup, Tab, MarkdownRender } from "@marvel/ui/ui/server";
import { useState, type JSX } from "react";

type MarkdownEditorProps = JSX.IntrinsicElements["textarea"];

export const MarkdownEditor = ({
  value = "",
  onChange,
  className,
  ...props
}: MarkdownEditorProps) => {
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  return (
    <div className={`${className}`}>
      <TabGroup className="my-5">
        <Tab
          active={editorMode === "write"}
          onClick={() => setEditorMode("write")}
        >
          write
        </Tab>
        <Tab
          active={editorMode === "preview"}
          onClick={() => setEditorMode("preview")}
        >
          preview
        </Tab>
      </TabGroup>
      {editorMode == "write" ? (
        <textarea
          className="bg-p-9 dark:bg-p-2 p-5 pb-10 rounded-lg w-full min-h-[300px]"
          onChange={onChange}
          value={value}
          {...props}
        />
      ) : (
        <MarkdownRender content={value as string} />
      )}
    </div>
  );
};
