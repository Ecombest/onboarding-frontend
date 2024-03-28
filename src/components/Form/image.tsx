"use client";
import { fabric } from "fabric";
import React from "react";
import { TemplateInterface } from "../Template/editTemplate";
const MAX_DIMENSION = 800;
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

  return props.template?.width && props.template?.height ? (
    props.template.width > props.template.height ? (
      <div
        style={{
          width: props.template.width > MAX_DIMENSION ? MAX_DIMENSION : props.template.width,
          height:
            props.template.width > MAX_DIMENSION
              ? (MAX_DIMENSION / props.template.width) * props.template.height
              : props.template.height,
          overflow: "hidden",
        }}
      >
        <canvas
          style={{
            transformOrigin: "0 0",
            transform: `scale(${props.template.width > MAX_DIMENSION ? MAX_DIMENSION / props.template.width : 1})`,
          }}
          ref={props.id_current}
          width={props.template.width}
          height={props.template.height}
        ></canvas>
      </div>
    ) : (
      <div
        style={{
          height: props.template.height > MAX_DIMENSION ? MAX_DIMENSION : props.template.height,
          width:
            props.template.height > MAX_DIMENSION
              ? (MAX_DIMENSION / props.template.height) * props.template.width
              : props.template.width,
          overflow: "hidden",
        }}
      >
        <canvas
          style={{
            transformOrigin: "0 0",
            transform: `scale(${props.template.height > MAX_DIMENSION ? MAX_DIMENSION / props.template.height : 1})`,
          }}
          ref={props.id_current}
          width={props.template.width}
          height={props.template.height}
        ></canvas>
      </div>
    )
  ) : (
    <div></div>
  );
}
