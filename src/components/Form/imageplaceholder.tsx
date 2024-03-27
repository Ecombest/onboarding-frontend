"use client";
import { fabric } from "fabric";
import React from "react";
import { TemplateInterface } from "../Template/editTemplate";

export default function ImagePlaceHolder(props: { template: TemplateInterface }) {
  const id_current = React.useRef(null);
  React.useEffect(() => {
    if (id_current.current === null) return;
    if (props.template.width === undefined || props.template.height === undefined) return;
    const canvas = new fabric.Canvas(id_current.current);
    const rect = new fabric.Rect({
      fill: "white",
      width: 300,
      height: 300,
    });
    canvas.add(rect);
    canvas.renderAll();
    return () => {
      if (canvas) canvas.dispose();
    };
  }, [id_current.current]);
  return <canvas ref={id_current} width={props.template.width} height={props.template.height}></canvas>;
}
