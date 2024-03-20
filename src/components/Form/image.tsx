"use client";
import { fabric } from "fabric";
import React from "react";

export default function ImageCanvas(props: {
  template: {
    imageUrl: string;
    width: number;
    height: number;
  };
}) {
  const id_current = React.useRef(null);
  React.useEffect(() => {
    if (id_current.current === null) return;
    if (props.template.width === undefined || props.template.height === undefined) return;
    if (props.template.imageUrl === undefined) return;
    const canvas = new fabric.Canvas(id_current.current);
    fabric.Image.fromURL(`/${props.template.imageUrl}`, function (oImg) {
      const { width, height } = oImg.getOriginalSize();
      oImg.scaleX = (props.template.width * 3) / width;
      oImg.scaleY = (props.template.height * 3) / height;
      canvas.add(oImg);
    });
    canvas.renderAll();
    return () => {
      if (canvas) canvas.dispose();
    };
  }, [id_current.current, props.template.width, props.template.height]);
  return (
    <canvas
      ref={id_current}
      width={props.template.width * 3}
      height={props.template.height * 3}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
}
