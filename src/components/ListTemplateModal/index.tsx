import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";

export interface ListTemplateModalInterface {
  open: boolean;
  onClose: () => void;
  onSelect: (layer: any) => void;
}

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

const ListTemplateModal = (props: ListTemplateModalInterface) => {
  const { open, onClose, onSelect } = props;
  const [listTemplate, setListTemplate] = React.useState([]);
  const [listLayer, setListLayer] = React.useState([]);
  useEffect(() => {
    if (!open) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
      .then((res) => res.json())
      .then((templates) => {
        setListTemplate(templates);
      });
  }, [open]);

  const handleShowLayers = (template: any) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/template/${template.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((layers) => {
        setListLayer(layers);
      });
  };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={boxStyle}>
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
                        onSelect(layer);
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
          onClick={onClose}
        >
          Cancel
        </button>
      </Box>
    </Modal>
  );
};

export default ListTemplateModal;
