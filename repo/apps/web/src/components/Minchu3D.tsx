"use client";
import React from "react";
import Spline from "@splinetool/react-spline";

const Minchu3D: React.FC<JSX.IntrinsicElements["div"]> = ({
  className,
  ...prop
}) => {
  return (
    <Spline
      className={className}
      scene="https://prod.spline.design/EO3oHDFBgze8ruv1/scene.splinecode"
    />
  );
};

export default Minchu3D;
