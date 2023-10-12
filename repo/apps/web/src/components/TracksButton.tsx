"use client";
import React from "react";
import { Button } from "@uvcemarvel/react-ui/client";
import { MdAltRoute } from "react-icons/md";

const TracksButton = () => {
  return (
    <Button
      variant="outlined"
      onPress={() => {
        if (typeof window !== "undefined") {
          window.location.hash = "tracks";
        }
      }}
      className="flex-1 md:flex-none"
      left={MdAltRoute}
    >
      Tracks
    </Button>
  );
};

export default TracksButton;
