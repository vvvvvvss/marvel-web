"use client";

import { useState } from "react";
import { Tab } from "../Tabs";
import { TabGroup } from "../Tabs";
import { MarkdownRender } from "../MarkdownRender";
import clsx from "clsx";

type MarkdownEditorProps = JSX.IntrinsicElements["textarea"];

export const MarkdownEditor = ({
  value = "",
  onChange,
  className,
  ...props
}: MarkdownEditorProps) => {
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  return (
    <div className={clsx(className)}>
      <TabGroup className="um-mb-5">
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
          className="um-bg-p-9 dark:um-bg-p-2 um-p-5 um-pb-10 um-rounded-lg um-w-full um-min-h-[300px]"
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
