"use client";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import FilterIcon from "@mui/icons-material/Filter";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ImageCanvas from "../Form/image";
import { fabric } from "fabric";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Box, Modal, Typography } from "@mui/material";
import { CATEGORY, CLIP_ART } from "@/constanst/clipart.const";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  backGroundColor: "#f0f0f0",
};
export interface TemplateInterface {
  name: string;
  id: string;
  width: number;
  height: number;
  imageUrl: string;
}
export interface LayerInterface {
  id: number;
  name: string;
  advances: number;
  top: number;
  left: number;
  width: number;
  height: number;
  angle: number;
  imageURL: null;
  maskURL: null;
  templateID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FabricObjectInterface {
  id: number;
  name: string;
}

export default function EditTemplate(props: { id: string }) {
  const [template, setTemplate] = React.useState<TemplateInterface>({} as TemplateInterface);
  const id_current = React.useRef(null);
  const [newFabricCanvas, setnewFabricCanvas] = React.useState<fabric.Canvas | null>(null);
  const [listLayer, setListLayer] = React.useState<LayerInterface[]>([{}] as LayerInterface[]);
  const [changeType, setChangeType] = React.useState<string | null>(null);
  const [currentLayer, setCurrentLayer] = React.useState<LayerInterface>({} as LayerInterface);
  const handleCurrentSelectedLayer = (layerId: number) => {
    const selectedLayer = listLayer.find((layer) => layer.id === layerId);
    if (!selectedLayer) return;
    setCurrentLayer(selectedLayer);
  };
  const [isShowCateModal, setIsShowCateModal] = React.useState(false);

  React.useEffect(() => {
    newFabricCanvas?.on("selection:created", function (event) {
      let selectedObjects = event.selected as unknown as FabricObjectInterface[];
      if (selectedObjects?.length === 0) return;
      handleCurrentSelectedLayer(selectedObjects?.[0]?.id);
    });
    newFabricCanvas?.on("selection:updated", function (event) {
      let selectedObjects = event.selected as unknown as FabricObjectInterface[];

      // Do something with the selected objects
      if (selectedObjects?.length === 0) return;

      handleCurrentSelectedLayer(selectedObjects[0].id);
    });
  }, [newFabricCanvas, listLayer]);

  React.useEffect(() => {
    if (currentLayer) {
      if (currentLayer.name === "Image Placeholder") {
        setChangeType("image");
      }
      if (currentLayer.name === "Clipart") {
        setChangeType("clip-art");
      }
    }
  }, [currentLayer]);
  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template/${props.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((template) => {
        setTemplate(template);
      });
  }, [props.id]);

  React.useEffect(() => {
    if (!newFabricCanvas) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/template/${props.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((listLayer) => {
        setListLayer(listLayer);
        listLayer.map((layer: any) => {
          const rect = new fabric.Rect({
            fill: "transparent",
            strokeWidth: 1,
            stroke: "black",
            strokeDashArray: [5, 5],
            top: layer.top,
            left: layer.left,
            width: layer.width,
            height: layer.height,
            id: layer.id,
          } as unknown as fabric.IRectOptions);
          newFabricCanvas?.add(rect);
        });
      });
  }, [props.id, newFabricCanvas]);

  const draw = (value: string) => {
    const newId = uuidv4();
    const rect = new fabric.Rect({
      fill: "transparent",
      top: 100,
      left: 100,
      width: 200,
      height: 200,
      strokeWidth: 1,
      stroke: "black",
      strokeDashArray: [5, 5],
      name: "Image Placeholder",
      id: newId,
    } as unknown as fabric.IRectOptions);
    newFabricCanvas?.add(rect);
    const newListLayer = [
      ...listLayer,
      {
        name: "Image Placeholder",
        id: newId,
      },
    ] as LayerInterface[];
    setListLayer(newListLayer);
    setChangeType(value);
  };

  const drawClipArt = (value: string) => {
    const newId = uuidv4();

    const rect = new fabric.Rect({
      fill: "transparent",
      top: 100,
      left: 100,
      width: 200,
      height: 200,
      strokeWidth: 1,
      stroke: "black",
      strokeDashArray: [5, 5],
      name: "Clipart",
      id: newId,
    } as unknown as fabric.IRectOptions);
    newFabricCanvas?.add(rect);
    const newListLayer = [
      ...listLayer,
      {
        name: "Clipart",
        id: newId,
      },
    ] as LayerInterface[];
    setListLayer(newListLayer);
    setChangeType(value);
  };

  const handleFormLayer = () => {
    const newListCanvas = newFabricCanvas?.getObjects().slice(1);
    if (!newListCanvas) return;
    const newForm = newListCanvas.map((item: any) => ({
      id: Number(item.id) ? item.id : null,
      templateId: template.id,
      left: item.left,
      top: item.top,
      width: (item.width / 2) * item.zoomX,
      height: (item.height / 2) * item.zoomY,
      name: item.name,
      angle: Number(0),
    }));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/list`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    }).then(() => {
      toast.success("Create successfull !");
    });
  };

  const showModalCate = () => {
    setIsShowCateModal(true);
  };

  const cancelShowModalCate = () => {
    setIsShowCateModal(false);
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

            {listLayer.map((layer: LayerInterface, index) => (
              <div
                className={`flex px-5 py-4 border ${layer.id === currentLayer?.id && "text-white bg-black"} `}
                key={index}
                onClick={() => {
                  const selectedObject = newFabricCanvas
                    ?.getObjects()
                    .find((object) => (object as unknown as FabricObjectInterface).id === layer.id);
                  if (selectedObject) {
                    newFabricCanvas?.setActiveObject(selectedObject);
                    newFabricCanvas?.renderAll();
                  }
                  handleCurrentSelectedLayer(layer.id);
                }}
              >
                <span className="w-30">{index + 1}</span>
                <span className="px-2">{layer.name}</span>
              </div>
            ))}
          </div>
          <div className="template-content">
            <div className="img">
              <ImageCanvas
                template={template}
                setnewFabricCanvas={setnewFabricCanvas}
                id_current={id_current}
              ></ImageCanvas>
            </div>
          </div>
          <div className="sidebar-content position-relative">
            <div className="flex">
              <div className="px-3 py-3">
                <div className="border w-20 h-20 rounded-lg flex justify-center items-center hover:bg-layer cursor-pointer">
                  <div className="text-center text-sm">
                    <div
                      onClick={() => {
                        drawClipArt("clip-art");
                      }}
                    >
                      <FilterIcon></FilterIcon>
                    </div>
                    Clip art
                  </div>
                </div>
              </div>
              <div className="px-3 py-3">
                <button
                  onClick={() => {
                    draw("image");
                  }}
                >
                  <div className="border w-20 h-20 rounded-lg flex justify-center items-center hover:bg-layer cursor-pointer">
                    <div className="text-center text-sm">
                      <div>
                        <InsertPhotoIcon></InsertPhotoIcon>
                      </div>
                      Image
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="py-4">
              <div className="px-3">
                {changeType === "clip-art" ? (
                  <div>
                    <div className="collapse-title min-h-0 bg-layer text-white p-3">Config</div>
                    <span>Category</span>
                    <input
                      style={{
                        border: "3px",
                        borderColor: "black",
                        padding: "3px",
                        marginTop: "5px",
                      }}
                      type="text"
                      onClick={showModalCate}
                    ></input>
                    <span>Option</span>
                    <input
                      style={{
                        border: "2px",
                        padding: "3px",
                        marginTop: "5px",
                      }}
                      type="number"
                    ></input>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="px-3 position-absolute">
              <button onClick={handleFormLayer} className="button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ClipArtModel isShowCateModal={isShowCateModal} cancelShowModalCate={cancelShowModalCate}></ClipArtModel>
    </div>
  );
}

const ClipArtModel = ({
  isShowCateModal,
  cancelShowModalCate,
}: {
  isShowCateModal: boolean;
  cancelShowModalCate: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0]);

  return (
    <Modal
      open={isShowCateModal}
      onClose={cancelShowModalCate}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="choose-template-box">
            <h2>Select an category</h2>
            <div className="w-full h-full flex p-2 white">
              <div
                className="category-bar"
                style={{
                  display: "grid",
                  gridTemplateColumns: "20% 80%",
                }}
              >
                <div>
                  <span>Template</span>
                  {CATEGORY.map((category, index) => (
                    <h2
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        fontSize: "16px",
                        background: selectedCategory._id === category._id ? "#f0f0f0" : "#fff",
                      }}
                      onClick={() => setSelectedCategory(category)}
                      key={index}
                    >
                      {category.name}
                    </h2>
                  ))}
                </div>
                <div
                  style={{
                    height: "60vh",
                    overflowY: "auto",
                  }}
                >
                  <span>Cliparts</span>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>OptionId</TableCell>
                          <TableCell align="center">Thumbnail</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Url</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {CLIP_ART.filter((clip) => clip.categoryId === selectedCategory._id).map((clip, index) => (
                          <TableRow key="x" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {clip.optionId}
                            </TableCell>
                            <TableCell align="center">
                              <img
                                src={`https://ecb-personalize-storage.sgp1.digitaloceanspaces.com/${clip.thumbnail}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }}
                              ></img>
                            </TableCell>

                            <TableCell align="center">{clip.name}</TableCell>

                            <TableCell align="center">
                              <img
                                src={`https://ecb-personalize-storage.sgp1.digitaloceanspaces.com/${clip.urlPath}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }}
                              ></img>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </Typography>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            textAlign: "center",
            padding: "20px",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            borderRadius: "12px",
          }}
          onClick={cancelShowModalCate}
        >
          Cancel
        </button>
      </Box>
    </Modal>
  );
};
