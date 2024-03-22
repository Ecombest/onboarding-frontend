"use client";
import { fabric } from "fabric";
import React from "react";

export default function ImageCanvas(props: {
    template: Object;
    id_current: React.MutableRefObject<any>;
    setnewFabricCanvas: any;
}) {
    React.useEffect(() => {
        if (!props.id_current.current) return;
        if (!props.template.width || !props.template.height) return;
        if (!props.template.imageUrl) return;
        const canvas = new fabric.Canvas(props.id_current.current);
        props.setnewFabricCanvas(canvas)
        fabric.Image.fromURL(`${props.template.imageUrl}`, function (oImg) {
            const { width, height } = oImg.getOriginalSize()
            oImg.selectable = false
            oImg.scaleX = (props.template.width / width)
            oImg.scaleY = (props.template.height / height)
            canvas.add(oImg);
        });
        console.log('background')
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
