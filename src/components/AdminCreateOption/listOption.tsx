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
    type: "image_upload"

}

export default function ListOption(props: { id: string, setIsRefesh: React.Dispatch<React.SetStateAction<boolean>>, isRefesh: boolean; }) {
    const [isShowModalCreate, setIsShowModalCreate] = React.useState(false);
    const [listTemplate, setListTemplate] = React.useState([]);
    const [listLayer, setListLayer] = React.useState([]);
    const [isShowModalLayer, setisShowModalLayer] = React.useState(false);
    const [formAd, setFormAd] = React.useState(formAdDefaultValue);
    const [file, setFile] = React.useState<File | null>(null);
    const [listFunction, setListFunction] = React.useState([
        {
            id: uuid(),
            type: "image_upload",
            layerId: "",
        },
    ]);
    const [curFuncId, setCurFuncId] = React.useState(null);
    const [listOption, setListOption] = React.useState([])
    const [optionSetDetail, SetOptionSetDetail] = React.useState(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option/set/${props.id}`)
            .then((res) => res.json())
            .then((listoptions) => {
                setListOption(listoptions)
            })
    }, [props.isRefesh])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set/${props.id}`)
            .then((res) => res.json())
            .then((optionset) => {
                SetOptionSetDetail(optionset)
            })
    }, [props.id])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const image = new Image();
        image.src = URL.createObjectURL(file as Blob | MediaSource);
        image.onload = function () {
            console.log(image.width, image.height, image.src);
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

    const showModalTemplateLayer = (id: string | null) => {
        setisShowModalLayer(true);
        setCurFuncId(id);
    };

    const cancelModalTemplateLayer = () => {
        setisShowModalLayer(false);
        setCurFuncId(null);
    };

    const showModalCreate = () => {
        setIsShowModalCreate(true);
    };

    const cancelModalCreate = () => {
        setIsShowModalCreate(false);
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
            .then((res) => res.json())
            .then((templates) => {
                setListTemplate(templates);
            });
    }, []);

    const handleShowLayers = (template: any) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/template/${template.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((layers) => {
                setListLayer(layers);
            });
    };

    const addFunction = () => {
        const newListFunction = [
            ...listFunction,
            {
                id: uuid(),
                type: "image_upload",
                layerId: "",
            },
        ];
        setListFunction(newListFunction);
    };

    const setValueLayerID = (layer: any) => {
        const newListFunction = listFunction.map((item) => {
            if (item.id === curFuncId) {
                return {
                    ...item,
                    layerId: layer.id,
                    teamplateId: layer.templateId
                };
            }
            return item;
        });
        setListFunction(newListFunction);
        setFormAd({
            ...formAd,
            "listFunction": newListFunction,
        });
        cancelModalTemplateLayer();
    };

    const changeFunctionOption = (functionId: string, value: string) => {
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

    const handleSubmit = async () => {
        const imageUrl = await uploadFile(file);
        console.log(imageUrl);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/option`, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formAd,
                setID: props.id,
                imageUrl: imageUrl,
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
            });
        setIsShowModalCreate(false);
    };

    const handleDeleteOption = (option) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option/${option.id}`, {
            method: "DELETE"
        })
            .then(() => {
                toast.success("Delete successfull !");
                props.setIsRefesh((prev) => !prev);
            });
    }

    return (
        <div>
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
                <div className="option-set-content">
                    <div className="option-set-title">Option set data</div>
                    <label htmlFor="set-title">Set title</label>
                    <input value={optionSetDetail?.name} type="text" id="set-title" />
                    <p>Option set items</p>
                    {
                        listOption.map((item, index) => (
                            <div key={index} className="item flex justify-between">
                                <span>{index + 1} - {item.label} (image upload)</span>
                                <div>
                                    <Button className="cursor">
                                        <BiEdit size={22}></BiEdit>
                                    </Button>
                                    <Button
                                        onClick={() => { handleDeleteOption(item) }}
                                        className="cursor"
                                    >
                                        <BiTrashAlt size={22}></BiTrashAlt>
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                    <button className="button position-absolute-button">Save</button>
                </div>
            </div>
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
                                    <select name="type" onChange={handleFormAd} id="option_type" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5">
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
                        <div className="py-2">
                            {!file ? (
                                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<ImageIcon />}>
                                    Upload image
                                    <VisuallyHiddenInput
                                        name="file"
                                        onChange={handleFileChange}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                    />
                                </Button>
                            ) : (
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="image"
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            maxWidth: "200px",
                                            maxHeight: "200px",
                                            position: "relative",
                                            top: "0",
                                            left: "50%",
                                            transform: "translate(-50%,0)",
                                        }}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            right: "-5px",
                                            top: "0px",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "24px",
                                            fontFamily: "Arial",
                                        }}
                                        onClick={() => {
                                            setFile(null);
                                            setFormAd({
                                                ...formAd,
                                                width: 0,
                                                height: 0,
                                            });
                                        }}
                                    >
                                        X
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {listFunction.map((item) => (
                                <div key={item.id} className="flex flex-row">
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
                                </div>
                            ))}
                        </div>
                        <div className="py-2">
                            <button onClick={addFunction} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                                Add
                            </button>
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
                        onClick={cancelModalCreate}
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
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </Box>
            </Modal>
            <Modal
                open={isShowModalLayer}
                onClose={cancelModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="choose-template-box">
                            <h2>Select an template</h2>
                            <div className="w-full h-full flex p-2 white">
                                <div className="left-bar">
                                    <span>Template</span>
                                    {listTemplate.map((template: any, index) => (
                                        <span
                                            key={index}
                                            onClick={() => {
                                                handleShowLayers(template);
                                            }}
                                            className="template-item"
                                        >
                                            {template.name}
                                        </span>
                                    ))}
                                    {/* <input type="text" placeholder="Search" /> */}
                                </div>
                                <div className="right-bar">
                                    <span>Layers</span>
                                    {listLayer.map((layer: any, index) => (
                                        <div className="flex template-item" key={index}>
                                            <span className="template-item">{index + 1}#</span>
                                            <span
                                                onClick={() => {
                                                    setValueLayerID(layer);
                                                }}
                                                className="template-item"
                                            >
                                                {layer.name}
                                            </span>
                                        </div>
                                    ))}
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
                        onClick={cancelModalTemplateLayer}
                    >
                        Cancel
                    </button>
                </Box>
            </Modal>
        </div>
    );
}
