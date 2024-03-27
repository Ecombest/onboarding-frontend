"use client";
import { fabric } from "fabric";
import React from "react";
import { TemplateInterface } from "../Template/editTemplate";

export default function ImageCanvas(props: {
  template: TemplateInterface;
  id_current: React.MutableRefObject<any>;
  setnewFabricCanvas: any;
}) {
  React.useEffect(() => {
    if (!props.id_current.current) return;
    if (!props.template.width || !props.template.height) return;
    const canvas = new fabric.Canvas(props.id_current.current);
    props.setnewFabricCanvas(canvas);
    if (props.template.imageUrl) {
      fabric.Image.fromURL(`${props.template.imageUrl}`, function (oImg) {
        const { width, height } = oImg.getOriginalSize();
        oImg.selectable = false;
        oImg.scaleX = props.template.width / width;
        oImg.scaleY = props.template.height / height;
        canvas.add(oImg);
        canvas.sendToBack(oImg);
      });
    } else {
      const rect = new fabric.Rect({
        fill: "white",
        top: 0,
        selectable: false,
        left: 0,
        width: props.template.width,
        height: props.template.height,
      } as unknown as fabric.IRectOptions);
      canvas.add(rect);
    }
    canvas?.renderAll();
    return () => {
      if (canvas) canvas?.dispose();
    };
  }, [props.id_current.current, props.template.width, props.template.height, props.template.imageUrl]);
  return (
    <div>
      {props.template?.width && props.template?.height && (
        <canvas ref={props.id_current} width={props.template.width} height={props.template.height}></canvas>
      )}
    </div>
  );
}
