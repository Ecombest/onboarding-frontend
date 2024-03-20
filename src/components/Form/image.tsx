"use client";
import { fabric } from "fabric";
import React from "react";

export default function ImageCanvas(props: {
  template: {
    imageUrl: string;
    width: number;
    height: number;
  };
  id_current: React.MutableRefObject<any>;
  newFabricCanvas: any;
}) {
  React.useEffect(() => {
    if (props.id_current.current === null) return;
    if (props.template.width === undefined || props.template.height === undefined) return;
    if (props.template.imageUrl === undefined) return;

    fabric.Image.fromURL(`/${props.template.imageUrl}`, function (oImg) {
      const { width, height } = oImg.getOriginalSize();
      oImg.selectable = false;
      oImg.scaleX = (props.template.width * 3) / width;
      oImg.scaleY = (props.template.height * 3) / height;
      props.newFabricCanvas.add(oImg);
    });

    props.newFabricCanvas.renderAll();
    return () => {
      if (props.newFabricCanvas) props.newFabricCanvas.dispose();
    };
  }, [props.id_current.current, props.template.width, props.template.height]);

  return (
    <div>
      <canvas
        ref={props.id_current}
        width={props.template.width * 3}
        height={props.template.height * 3}
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}
