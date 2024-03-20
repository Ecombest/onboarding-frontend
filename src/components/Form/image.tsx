"use client";
import { fabric } from 'fabric';
import React from 'react';

export default function ImageCanvas(props: { template: Object }) {
    console.log(props.template.width)
    const id_current = React.useRef(null)
    React.useEffect(() => {
        const canvas = new fabric.Canvas(id_current.current)
        fabric.Image.fromURL(`/${props.template.imageUrl}`, function (oImg) {
            canvas.add(oImg);
        })
        return () => {
            if (canvas)
                canvas.remove()
        }
    }, [id_current.current, props.template.width, props.template.height])
    return (
        <div>
            <canvas ref={id_current} width={props.template.width} height={props.template.height}></canvas>
        </div>
    )
}