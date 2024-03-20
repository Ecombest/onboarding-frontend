"use client";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import FilterIcon from "@mui/icons-material/Filter";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import ImageCanvas from "../Form/image";
import { fabric } from "fabric";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function EditTemplate(props: { id: string }) {
  const [template, setTemplate] = React.useState({});
  const id_current = React.useRef(null);
  const [newFabricCanvas, setNewFabricCanvas] = React.useState(null);
  useEffect(() => {
    const canvas = new fabric.Canvas(id_current.current);
    setNewFabricCanvas(canvas);
  }, [id_current.current]);

  React.useEffect(() => {
    fetch(`http://192.168.1.222:3000/template/${props.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((template) => {
        setTemplate(template);
      });
  }, [props.id]);

  const draw = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });
    newFabricCanvas.add(rect);
  };

  return (
    <div>
      <div className="flex flex-col h-full">
        <div className="header"></div>
        <div className="main-content">
          <div className="layer-content">
            <div className="flex px-2 py-4">
              <span className="">Layers</span>
            </div>
            <div className="flex px-5 py-4">
              <span className="w-30">1</span>
              <span>Image</span>
            </div>
          </div>
          <div className="template-content">
            {/* <div className='img'>
                            <img src={`/${template.imageUrl}`} alt='Image template' width={template.width} height={template.height}></img>
                        </div> */}
            <ImageCanvas template={template} id_current={id_current} newFabricCanvas={newFabricCanvas}></ImageCanvas>
          </div>
          <div className="sidebar-content position-relative">
            <div className="flex">
              <div className="px-3 py-3">
                <div className="border w-20 h-20 rounded-lg flex justify-center items-center hover:bg-layer cursor-pointer">
                  <div className="text-center text-sm">
                    <div>
                      <FilterIcon></FilterIcon>
                    </div>
                    Clip art
                  </div>
                </div>
              </div>
              <div className="px-3 py-3">
                <div className="border w-20 h-20 rounded-lg flex justify-center items-center hover:bg-layer cursor-pointer">
                  <div className="text-center text-sm">
                    <Button onClick={draw}>
                      <div>
                        <InsertPhotoIcon></InsertPhotoIcon>
                      </div>
                      Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="px-3">
                <div className="collapse-title min-h-0 bg-layer text-white p-3">Config</div>
                <div className="py-3">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<ImageIcon />}
                  >
                    Upload image
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="px-3 position-absolute">
              <button className="button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
