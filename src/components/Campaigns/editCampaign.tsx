"use client";
import React, { useEffect } from "react";
import { TemplateInterface } from "../Template/editTemplate";
import { Box, Button, Modal, Typography } from "@mui/material";
import { OptionSetInterface } from "../AdminCreateOption/listOption";
import { toast } from "react-toastify";

export interface CampaignIntergace {
    name: string,
    productId: string,
    productLink: string,
    selectorHtml: string,
    imageType: string,
    templateId: number,
    optionSetId: number
}

export default function EditCampaign(props: {
    setIsRefesh: React.Dispatch<React.SetStateAction<boolean>>;
    isRefesh: boolean;
    id: string;
}) {
    const [isOpenModalTemplate, setIsOpenModalTemplate] = React.useState(false);
    const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateInterface | null>(null);
    const [isOpenOptionSet, setIsOpenOptionSet] = React.useState(false);
    const [selectedOptionSet, setSelectedOptionSet] = React.useState<OptionSetInterface | null>(null);
    const [campaign, setCampaign] = React.useState<CampaignIntergace | null>(null);
    const [formAd, setFormAd] = React.useState({
        name: String,
        productId: Number,
        productLink: String,
        selectorHtml: String,
        imageType: String,
        templateId: Number,
        optionSetId: Number
    })

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${props.id}`)
            .then((res) => res.json())
            .then((thisCampaign) => {
                setCampaign(thisCampaign)
            })
    }, [props.id])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/template/${campaign?.templateId}`)
            .then((res) => res.json())
            .then((thisTemplate) => {
                setSelectedTemplate(thisTemplate)
            })
    }, [campaign?.templateId])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set/${campaign?.optionSetId}`)
            .then((res) => res.json())
            .then((thisOptionSet) => {
                setSelectedOptionSet(thisOptionSet)
            })
    }, [campaign?.optionSetId])

    const showModalTemplate = () => {
        setIsOpenModalTemplate(true)
    }

    const cancelModalTemplate = () => {
        setIsOpenModalTemplate(false)
    }

    const showModalOptionSet = () => {
        setIsOpenOptionSet(true)
    }

    const cancelModalOptionSet = () => {
        setIsOpenOptionSet(false)
    }

    const handleUpdateCampaign = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${props.id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                ...campaign,
                templateId: selectedTemplate?.id,
                optionSetId: selectedOptionSet?.id,
                productId: Number(campaign?.productId)
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
    }

    return (
        <div>
            <div className="option-set-overlay position-relative">
                <fieldset
                    // style="border:1px solid #999; border-radius:8px; box-shadow:0 0 8px #999;padding:6px;"
                    style={{
                        border: "1px solid #999",
                        borderRadius: "8px",
                        padding: "16px",
                    }}
                >
                    <legend>Details</legend>
                    <div className="flex justify-end">
                        <Button onClick={handleUpdateCampaign} className="flex bg-green-500 text-white px-4 py-2 border rounded-md" >
                            SAVE
                        </Button>
                    </div>
                    <div>
                        <div className="flex">
                            <div>
                                <label>Name:</label>
                                <input name="name" value={campaign?.name} onChange={(e) => { setCampaign({ ...campaign, name: e.target.value } as CampaignIntergace) }} style={{ width: "30vh" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5" type="text"></input>
                            </div>
                            <div className="margin-left">
                                <label>Product ID:</label>
                                <input name="productId" value={campaign?.productId} onChange={(e) => { setCampaign({ ...campaign, productId: e.target.value } as CampaignIntergace) }} style={{ width: "30vh" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5" type="text"></input>
                            </div>
                            <div className="margin-left">
                                <label>Product Link:</label>
                                <input value={campaign?.productLink} name="productLink" onChange={(e) => { setCampaign({ ...campaign, productLink: e.target.value } as CampaignIntergace) }} style={{ width: "60vh" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5" type="text"></input>
                            </div>
                        </div>
                        <div className="flex py-3">
                            <div>
                                <label>Selector HTML:</label>
                                <input value={campaign?.selectorHtml} name="selectorHtml" onChange={(e) => { setCampaign({ ...campaign, selectorHtml: e.target.value } as CampaignIntergace) }} style={{ width: "30vh" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5" type="text"></input>
                            </div>
                            <div className="margin-left">
                                <label>Image type:</label>
                                <select value={campaign?.imageType} name="imageType" onChange={(e) => { setCampaign({ ...campaign, imageType: e.target.value } as CampaignIntergace) }} style={{ width: "30vh" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5">
                                    <option>PNG</option>
                                    <option>JPG</option>
                                    <option>JEPG</option>
                                </select>
                            </div>
                        </div>
                        <div className="py-3">
                            <label>Template:</label>
                            <button className="border rounded-md" style={{
                                padding: "4px",
                                borderRadius: "1px solid gray",
                                backgroundColor: "blue",
                                color: "white",
                                marginLeft: "10px"
                            }}
                                onClick={showModalTemplate}
                            >select</button>
                            <input className="border rounded-md" style={{
                                marginLeft: "20px",
                                border: "1px solid gray",
                                padding: "4px"
                            }} value={selectedTemplate?.name} type="text"></input>
                        </div>
                        <div className="py-3">
                            <label>Option-set:</label>
                            <button className="border rounded-md" style={{
                                padding: "4px",
                                borderRadius: "1px solid gray",
                                backgroundColor: "blue",
                                color: "white",
                                marginLeft: "10px"
                            }}
                                onClick={showModalOptionSet}
                            >select</button>
                            <input className="border rounded-md" style={{
                                marginLeft: "10px",
                                border: "1px solid gray",
                                padding: "4px"
                            }} value={selectedOptionSet?.name} type="text"></input>
                        </div>
                    </div>
                </fieldset>
            </div>

            <TemplateModal
                open={isOpenModalTemplate}
                onClose={cancelModalTemplate}
                setSelectedTemplate={setSelectedTemplate}
            ></TemplateModal>
            <OptionSetModal
                open={isOpenOptionSet}
                onClose={cancelModalOptionSet}
                selectedOptionSet={setSelectedOptionSet}
            ></OptionSetModal>
        </div>
    )
}

const TemplateModal = (props: {
    open: boolean;
    onClose: () => void;
    setSelectedTemplate: any;
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
    const { open, onClose, setSelectedTemplate } = props;
    const [listTemplate, setListTemplate] = React.useState([]);
    const onChooseTemplate = (template: TemplateInterface) => {
        setSelectedTemplate(template);
        onClose;
    };

    useEffect(() => {
        if (!open) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
            .then((res) => res.json())
            .then((templates) => {
                setListTemplate(templates);
            });
    }, [open]);

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
                                    <div onClick={() => {
                                        onChooseTemplate(template);
                                    }} key={index} className="flex justify-between items-center template-item">
                                        <span
                                            style={{
                                                marginBottom: "0px",
                                            }}
                                        >
                                            {template.name}
                                        </span>
                                    </div>
                                ))}
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
        </>
    );
};

const OptionSetModal = (props: {
    open: boolean;
    onClose: () => void;
    selectedOptionSet: any;
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
    const { open, onClose, selectedOptionSet } = props;
    const [listOptionSet, setListOptionSet] = React.useState([]);
    const onChooseOptionSet = (option: OptionSetInterface) => {
        onClose;
        selectedOptionSet(option);
    };

    useEffect(() => {
        if (!open) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set`)
            .then((res) => res.json())
            .then((optionsets) => {
                setListOptionSet(optionsets);
            });
    }, [open]);

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
                            <h2>Select an Option-set</h2>
                            <div
                                className="w-full h-full flex white flex-col gap-2"
                                style={{
                                    padding: "20px",
                                }}
                            >
                                {listOptionSet.map((optionset: any, index) => (
                                    <div onClick={() => {
                                        onChooseOptionSet(optionset);
                                    }} key={index} className="flex justify-between items-center template-item">
                                        <span
                                            style={{
                                                marginBottom: "0px",
                                            }}

                                        >
                                            {optionset.name}
                                        </span>
                                    </div>
                                ))}
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
        </>
    );
};