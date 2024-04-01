"use client";
import { BiEdit, BiTrashAlt, BiUserPlus } from "react-icons/bi";
import React, { useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import ListTemplateModal from "../ListTemplateModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fabric } from "fabric";
import Loading from "../Loading";
import { TemplateInterface } from "../Template/editTemplate";
export interface OptionInterface {
  layerId: string;
  id: number | string;
  setID: string;
  type: string;
  label: string;
  helpText: string;
  imageURL: null | string;
  createdAt: Date;
  updatedAt: Date;
  listFunction: FunctionInterface[];
}

export interface FunctionInterface {
  id: number | string;
  type: string;
  templateId: null;
  layerId?: string;
  optionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OptionSetInterface {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const style = {
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

const styles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  backGroundColor: "#f0f0f0",
};

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

const formAdDefaultValue = {
  type: "image_upload",
  label: "",
  helpText: "",
  imageUrl: "",
  width: 0,
  height: 0,
  listFunction: [],
};
export interface FormAddInterface {
  type: string;
  label: string;
  helpText: string;
  imageUrl: string;
  width: number;
  height: number;
  listFunction: FunctionInterface[];
}
export default function ListOption(props: {
  id: string;
  setIsRefesh: React.Dispatch<React.SetStateAction<boolean>>;
  isRefesh: boolean;
}) {
  const [isShowModalCreate, setIsShowModalCreate] = React.useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = React.useState(false);
  const [isShowModalLayer, setisShowModalLayer] = React.useState(false);
  const [isShowModalUpdateLayer, setIsShowModalUpdateLayer] = React.useState(false);
  const [formAd, setFormAd] = React.useState<FormAddInterface>(formAdDefaultValue);
  const [file, setFile] = React.useState<File | null>(null);
  const [listFunction, setListFunction] = React.useState<FunctionInterface[]>([
    {
      id: uuid(),
      type: "image_upload",
      layerId: "",
    },
  ] as FunctionInterface[]);
  const [openPreview, setOpenPreview] = React.useState(false);
  const [curFuncId, setCurFuncId] = React.useState<string | number | null>(null);
  const [listOption, setListOption] = React.useState<OptionInterface[]>([]);
  const [optionSetDetail, SetOptionSetDetail] = React.useState<OptionSetInterface | null>(null);
  const [optionCur, setOptionCur] = React.useState<OptionInterface | null>(null);
  const [typeChange, setTypeChange] = React.useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option/set/${props.id}`)
      .then((res) => res.json())
      .then((listoptions) => {
        setListOption(listoptions);
      });
  }, [props.isRefesh]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set/${props.id}`)
      .then((res) => res.json())
      .then((optionset) => {
        SetOptionSetDetail(optionset);
      });
  }, [props.id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.src = URL.createObjectURL(file as Blob | MediaSource);
    image.onload = function () {
      setFormAd({
        ...formAd,
        width: image.width,
        height: image.height,
      });
    };
    setFile(file);
  };

  useEffect(() => {
    if (!isShowModalCreate) {
      setFormAd(formAdDefaultValue);
      setFile(null);
      setListFunction([
        {
          id: uuid(),
          type: "image_upload",
          layerId: "",
        },
      ] as FunctionInterface[]);
    }
  }, [isShowModalCreate]);

  const uploadFile = async (file: File) => {
    const selectedFile = file;
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "vitamim"); // Replace with your Cloudinary upload preset

    return await fetch("https://api.cloudinary.com/v1_1/vitamim/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data.url;
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleFormAd = (e: any) => {
    setFormAd({
      ...formAd,
      [e.target.name]: e.target.value,
    });
  };

  const showModalTemplateLayer = (id: string | null | number) => {
    setisShowModalLayer(true);
    setCurFuncId(id);
  };

  const showModalUpdateTemplateLayer = (id: string | null) => {
    setIsShowModalUpdateLayer(true);
    setCurFuncId(id);
  };

  const cancelModalTemplateLayer = () => {
    setisShowModalLayer(false);
    setCurFuncId(null);
  };

  const cancelModalUpdateTemplateLayer = () => {
    setIsShowModalUpdateLayer(false);
    setCurFuncId(null);
  };

  const showModalCreate = () => {
    setIsShowModalCreate(true);
  };

  const cancelModalCreate = () => {
    setIsShowModalCreate(false);
  };

  const showModalUpdate = (item: OptionInterface) => {
    setOptionCur(item);
    setIsShowModalUpdate(true);
  };

  const cancelModalUpdate = () => {
    setIsShowModalUpdate(false);
  };

  const addFunction = () => {
    const newListFunction = [
      ...listFunction,
      {
        id: uuid(),
        type: "image_upload",
        layerId: "",
      },
    ] as FunctionInterface[];
    setListFunction(newListFunction);
  };

  const addUpdateFunction = () => {
    if (!optionCur) return;

    const newListFunction = [
      ...optionCur?.listFunction,
      {
        id: uuid(),
        type: "image_upload",
        layerId: "",
      },
    ] as FunctionInterface[];
    setOptionCur({ ...optionCur, listFunction: newListFunction });
    setListFunction(newListFunction);
  };

  const setValueLayerID = (layer: any) => {
    const newListFunction = listFunction.map((item) => {
      if (item.id === curFuncId) {
        return {
          ...item,
          layerId: layer.id,
          teamplateId: layer.templateId,
        };
      }
      return item;
    });
    setListFunction(newListFunction);
    setFormAd({
      ...formAd,
      listFunction: newListFunction,
    } as FormAddInterface);
    cancelModalTemplateLayer();
  };

  const setUpdateValueLayerID = (layer: any) => {
    const newListFunction = optionCur?.listFunction.map((item: any) => {
      if (item.id === curFuncId) {
        return {
          ...item,
          layerId: layer.id,
          teamplateId: layer.templateId,
        };
      }
      return item;
    }) as FunctionInterface[];
    setListFunction(newListFunction);
    setOptionCur({
      ...optionCur,
      listFunction: newListFunction,
    } as OptionInterface);
    cancelModalUpdateTemplateLayer();
  };

  const deleteFuncCurCreate = (func: any) => {
    const newListFunction = listFunction.filter((item: any) => {
      return item.id != func.id;
    }) as FunctionInterface[];
    setListFunction(newListFunction);
    setFormAd({
      ...formAd,
      listFunction: newListFunction,
    } as FormAddInterface);
  };

  const deleteFuncCurUpdate = (func: any) => {
    const newListFunction = optionCur?.listFunction.filter((item: any) => {
      return item.id != func.id;
    }) as FunctionInterface[];
    setListFunction(newListFunction);
    setOptionCur({
      ...optionCur,
      listFunction: newListFunction,
    } as OptionInterface);
  };

  const changeFunctionOption = (functionId: string | number, value: string) => {
    const newListFunction = listFunction.map((item) => {
      if (item.id === functionId) {
        return {
          ...item,
          type: value,
        };
      }
      return item;
    });
    setListFunction(newListFunction);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/option`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formAd,
        setID: props.id,
      }),
    })
      .then((e) => {
        if (e.status == 201) {
          toast.success("Create successfull !");
          props.setIsRefesh((prev) => !prev);
        } else {
          toast.error("Create failed !");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsShowModalCreate(false);
  };

  const handleUpdateOption = async (option: any) => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/option/${option.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...optionCur,
        setID: props.id,
      }),
    })
      .then((e) => {
        if (e.status == 200) {
          toast.success("Update successfull !");
          props.setIsRefesh((prev) => !prev);
        } else {
          toast.error("Update failed !");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsShowModalUpdate(false);
  };

  const handleDeleteOption = (option: OptionInterface) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option/${option.id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Delete successfull !");
      props.setIsRefesh((prev) => !prev);
    });
  };
  const openPreviewModal = () => {
    setOpenPreview(true);
  };

  const handleUpdateOptionSet = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set/${props.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(optionSetDetail),
    })
      .then((e) => {
        if (e.status == 200) {
          toast.success("Update successfull !");
          props.setIsRefesh((prev) => !prev);
        } else {
          toast.error("Update failed !");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const handleChangeType = (value) => {
  //     setTypeChange(value)
  // }

  return (
    <>
      <div className="container mx-auto flex justdify-between py-5 border-b">
        <div className="left flex gap-3">
          <button onClick={showModalCreate} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
            Add option{" "}
            <span className="px-1">
              <BiUserPlus size={22}></BiUserPlus>
            </span>
          </button>
        </div>
      </div>
      <div className="option-set-overlay position-relative">
        <fieldset className="option-set-content">
          <legend>Option set data</legend>
          <label htmlFor="set-title">Set title</label>
          <input
            onChange={(e) => SetOptionSetDetail({ ...optionSetDetail, name: e.target.value } as OptionSetInterface)}
            value={optionSetDetail?.name}
            type="text"
            id="set-title"
          />
          <div className="flex justify-end">
            <Button className="flex bg-blue-500 text-white px-4 py-2 border rounded-md" onClick={openPreviewModal}>
              Preview
            </Button>
          </div>
          <p>Option set items</p>
          {listOption.map((item, index) => (
            <div key={index} className="item flex justify-between">
              <span>
                {index + 1} - {item.label} (image upload)
              </span>
              <div>
                <Button className="cursor">
                  <BiEdit onClick={() => showModalUpdate(item)} size={22}></BiEdit>
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteOption(item);
                  }}
                  className="cursor"
                >
                  <BiTrashAlt size={22}></BiTrashAlt>
                </Button>
              </div>
            </div>
          ))}
          <button onClick={handleUpdateOptionSet} className="button position-absolute-button">
            Save
          </button>
        </fieldset>
      </div>
      {isLoading && <Loading />}

      <Modal
        open={isShowModalCreate}
        onClose={cancelModalCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>Create new option</h2>
            <div className="flex">
              <div className="py-2">
                <label>Option types:</label>
                <div>
                  <select
                    name="type"
                    onChange={handleFormAd}
                    id="option_type"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                  >
                    <option value="image_upload">Image upload</option>
                    <option value="text_input">Text input</option>
                  </select>
                </div>
              </div>
              <div className="py-2 margin-left">
                <label>Option label:</label>
                <input
                  type="text"
                  name="label"
                  onChange={handleFormAd}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                  placeholder="Option label"
                ></input>
              </div>
            </div>
            <div className="py-2">
              <label>Help Text (HTML is allowed):</label>
              <textarea
                id="help-text"
                name="helpText"
                onChange={handleFormAd}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              ></textarea>
            </div>

            <fieldset
              style={{
                border: "1px solid #999",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <legend>Functions</legend>
              <div className="flex flex-col">
                {listFunction.map((item) => (
                  <div key={item.id} className="flex flex-row position-relavtive">
                    <div>
                      <label>Function:</label>
                      <div>
                        <select
                          id="function_type"
                          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                          name="function_type"
                          onChange={(e) => {
                            changeFunctionOption(item.id, e.target.value);
                            handleFormAd;
                          }}
                          value={item.type}
                        >
                          <option value="image_upload">Image upload</option>
                          <option value="text_input">Text input</option>
                        </select>
                      </div>
                    </div>
                    <div className="margin-left">
                      <label>LayerID:</label>
                      <input
                        name="layerId"
                        onChange={handleFormAd}
                        onClick={() => {
                          showModalTemplateLayer(item.id);
                        }}
                        value={item.layerId}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                        placeholder="LayerID"
                      ></input>
                    </div>
                    <span
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: "24px",
                        fontFamily: "Arial",
                        marginLeft: "10px",
                        marginTop: "32px",
                      }}
                      onClick={() => deleteFuncCurCreate(item)}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
              <div className="py-2">
                <button onClick={addFunction} className="flex bg-blue-500 text-white px-4 py-1 border rounded-md">
                  Add
                </button>
              </div>
            </fieldset>
          </Typography>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              textAlign: "center",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
            }}
            onClick={cancelModalCreate}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              textAlign: "center",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
            onClick={handleSubmit}
          >
            Create
          </button>
        </Box>
      </Modal>
      <ListTemplateModal open={isShowModalLayer} onClose={cancelModalTemplateLayer} onSelect={setValueLayerID} />

      <Modal
        open={isShowModalUpdate}
        onClose={cancelModalUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>Update option</h2>
            <div className="flex">
              <div className="py-2">
                <label>Option types:</label>
                <div>
                  <select
                    name="type"
                    onChange={(e) => {
                      setOptionCur({ ...optionCur, type: e.target.value } as OptionInterface);
                    }}
                    value={optionCur?.type}
                    id="option_type"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                  >
                    <option value="image_upload">Image upload</option>
                    <option value="text_input">Text input</option>
                  </select>
                </div>
              </div>
              <div className="py-2 margin-left">
                <label>Option label:</label>
                <input
                  type="text"
                  name="label"
                  onChange={(e) => {
                    setOptionCur({ ...optionCur, label: e.target.value } as OptionInterface);
                  }}
                  value={optionCur?.label}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                  placeholder="Option label"
                ></input>
              </div>
            </div>
            <div className="py-2">
              <label>Help Text (HTML is allowed):</label>
              <textarea
                id="help-text"
                name="helpText"
                onChange={(e) => {
                  setOptionCur({ ...optionCur, helpText: e.target.value } as OptionInterface);
                }}
                value={optionCur?.helpText}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              ></textarea>
            </div>
            <fieldset
              // style="border:1px solid #999; border-radius:8px; box-shadow:0 0 8px #999;padding:6px;"
              style={{
                border: "1px solid #999",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <legend>Functions</legend>
              <div className="flex flex-col">
                {optionCur?.listFunction.map((item: any) => (
                  <div key={item.id} className="flex flex-row">
                    <div>
                      <label>Function:</label>
                      <div>
                        <select
                          id="function_type"
                          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                          name="type"
                          onChange={(e) => {
                            changeFunctionOption(item.id, e.target.value);
                            setOptionCur({ ...optionCur, type: e.target.value });
                            handleFormAd;
                          }}
                          value={item.type}
                        >
                          <option value="image_upload">Image upload</option>
                          <option value="text_input">Text input</option>
                        </select>
                      </div>
                    </div>
                    <div className="margin-left">
                      <label>LayerID:</label>
                      <input
                        name="layerId"
                        onChange={(e) => {
                          setOptionCur({ ...optionCur, layerId: e.target.value });
                        }}
                        onClick={() => {
                          showModalUpdateTemplateLayer(item.id);
                        }}
                        value={item.layerId}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                        placeholder="LayerID"
                      ></input>
                    </div>
                    <span
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: "24px",
                        fontFamily: "Arial",
                        marginLeft: "10px",
                        marginTop: "32px",
                      }}
                      onClick={() => deleteFuncCurUpdate(item)}
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
              <div className="py-2">
                <button onClick={addUpdateFunction} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                  Add
                </button>
              </div>
            </fieldset>
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
            onClick={cancelModalUpdate}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              textAlign: "center",
              padding: "20px",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
              borderRadius: "12px",
            }}
            onClick={() => handleUpdateOption(optionCur)}
          >
            Update
          </button>
        </Box>
      </Modal>
      <ListTemplateModal
        open={isShowModalUpdateLayer}
        onClose={cancelModalUpdateTemplateLayer}
        onSelect={setUpdateValueLayerID}
      />

      <PreviewModal
        optionSetId={props.id}
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        options={listOption}
      />
    </>
  );
}

const PreviewModal = (props: {
  optionSetId: string | number;
  open: boolean;
  onClose: () => void;
  options: OptionInterface[];
}) => {
  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    backGroundColor: "#f0f0f0",
  };
  const { open, onClose, options } = props;
  const [listTemplate, setListTemplate] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateInterface | null>(null);
  useEffect(() => {
    if (!open) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
      .then((res) => res.json())
      .then((templates) => {
        setListTemplate(templates);
      });
  }, [open]);
  const onChooseTemplate = (template: TemplateInterface) => {
    setSelectedTemplate(template);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="choose-template-box-preview">
              <h2>Select an template</h2>
              <div
                className="w-full h-full flex white flex-col gap-2"
                style={{
                  padding: "20px",
                }}
              >
                {listTemplate.map((template: any, index) => (
                  <div key={index} className="flex justify-between items-center template-item">
                    <span
                      style={{
                        marginBottom: "0px",
                      }}
                    >
                      {template.name}
                    </span>
                    <VisibilityIcon
                      onClick={() => {
                        onChooseTemplate(template);
                      }}
                    />
                  </div>
                ))}
                {/* <input type="text" placeholder="Search" /> */}
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
            onClick={onClose}
          >
            Cancel
          </button>
        </Box>
      </Modal>
      <PreviewTemplateModal template={selectedTemplate!} onClose={() => setSelectedTemplate(null)} options={options} />
    </>
  );
};
const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  backGroundColor: "#f0f0f0",
};
interface layerProps {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  type: string;
  imageUrl: string;
}
const FIX_BOUNDING_BOX = {
  width: 500,
  height: 500,
};
const PreviewTemplateModal = (props: {
  template?: TemplateInterface;
  onClose: () => void;
  options: OptionInterface[];
}) => {
  const { onClose, template, options } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [layers, setLayers] = React.useState<layerProps[]>([]);
  const [functions, setFunctions] = React.useState<
    {
      id: string;
      optionId: string;
      layerId: string;
    }[]
  >([]);
  const [canvasState, setCanvasState] = React.useState<null | fabric.Canvas>(null);
  useEffect(() => {
    if (!template?.id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/template/${template.id}`)
      .then((res) => res.json())
      .then((layers) => {
        setLayers(layers);
      });
  }, [template?.id]);

  useEffect(() => {
    if (!template?.id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/function/option-ids`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        optionIds: options.map((option) => option.id),
      }),
    })
      .then((res) => res.json())
      .then((functions) => {
        setFunctions(functions);
      });
  }, [template?.id]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!template?.id) return;
    const canvas = new fabric.Canvas(canvasRef.current);
    if (!canvas) return;
    if (!template) return;
    if (template.imageUrl) {
      fabric.Image.fromURL(
        `${template.imageUrl}`,
        function (oImg) {
          const { width, height } = oImg.getOriginalSize();
          oImg.selectable = false;
          canvas.add(oImg);
          canvas.sendToBack(oImg);
        },
        {
          crossOrigin: "Anonymous",
        }
      );
    } else {
      const rect = new fabric.Rect({
        fill: "white",
        top: 0,
        selectable: false,
        left: 0,
        width: template.width,
        height: template.height,
      } as unknown as fabric.IRectOptions);
      canvas.add(rect);
      canvas.sendToBack(rect);
    }

    setCanvasState(canvas);
    canvas?.renderAll();
    return () => {
      if (canvas) canvas?.dispose();
    };
  }, [layers, template, canvasRef.current]);

  const draw = (optionId: string, file: File | undefined) => {
    if (!canvasState) return;
    const listCurrentFunction = functions.filter((func) => func.optionId === optionId).map((func) => func.layerId);
    if (!listCurrentFunction) return;
    const listCurrentLayer = layers.filter((layer) => listCurrentFunction.includes(layer.id));
    if (!listCurrentLayer) return;
    if (!file) {
      return;
    } else {
      listCurrentLayer.forEach((currentLayer) => {
        fabric.Image.fromURL(URL.createObjectURL(file as Blob | MediaSource), function (oImg) {
          const { width, height } = oImg.getOriginalSize();
          oImg.scaleX = currentLayer.width / width;
          oImg.scaleY = currentLayer.height / height;
          oImg.top = currentLayer.top;
          oImg.left = currentLayer.left;
          oImg.selectable = false;
          canvasState.add(oImg);
        });
      });
      canvasState.renderAll();
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas?.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL.replace("/upload/", "/upload/fl_attachment/");
    a.download = "image.png";
    a.click();
  };
  const boxRef = React.useRef<HTMLDivElement>(null);

  return (
    <Modal open={!!template?.id} onClose={onClose}>
      <Box sx={boxStyle} ref={boxRef}>
        <div className="flex">
          <div
            style={{
              position: "relative",
              flexBasis: "50%",

              width: "auto",
              height: FIX_BOUNDING_BOX.height + 20,
              overflow: "hidden",
            }}
          >
            {template?.width && template?.height && (
              <canvas
                ref={canvasRef}
                width={template.width}
                height={template.height}
                style={{
                  transformOrigin: "0 0",
                  transform: `scale(${FIX_BOUNDING_BOX.width / template.width > FIX_BOUNDING_BOX.height / template.height
                      ? FIX_BOUNDING_BOX.height / template.height
                      : FIX_BOUNDING_BOX.width / template.width
                    })`,
                }}
              ></canvas>
            )}
          </div>
          <div
            className="p-4"
            style={{
              width: "100%",
              display: "flex",
              flexBasis: "50%",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {options.map((option: any) => {
                return (
                  <div
                    key={option.id}
                    style={{
                      width: "100%",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "1px dashed #000",
                      boxSizing: "border-box",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <strong>{option.label}</strong>
                      <div dangerouslySetInnerHTML={{ __html: option.helpText }}></div>
                    </div>
                    <label
                      htmlFor={option.id}
                      style={{
                        width: "max-content",
                        height: "max-content",
                        cursor: "pointer",
                        padding: "10px 18px",
                        display: "block",
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: "5px",
                      }}
                    >
                      Choose photo
                    </label>

                    <input
                      id={option.id}
                      style={{
                        display: "none",
                      }}
                      type={option.type == "image_upload" ? "file" : "text"}
                      onChange={(e) => {
                        if (option.type == "image_upload") {
                          draw(option.id, e.target.files?.[0]);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <Button className="flex bg-blue-500 text-white px-4 py-2 border rounded-md" onClick={downloadImage}>
              Download Image
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
