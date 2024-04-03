let campaign;
let template;
const MAX_DIMENSION = 800;
const fetchCampaign = async (campaignId) => {
  const response = await fetch(`http://192.168.1.222:3000/campaign/${campaignId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch campaign");
    }
    return response;
  });
  return response.json();
};
const getTemplateById = async (id) => {
  const response = await fetch(`http://192.168.1.222:3000/template/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch template");
    }
    return response;
  });
  return response.json();
};

const getLayer = async (templateId) => {
  const response = await fetch(`http://192.168.1.222:3000/layer/template/${templateId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch layer");
    }
    return response;
  });
  return response.json();
};

const getOption = async (optionSetId) => {
  const response = await fetch(`http://192.168.1.222:3000/option/set/${optionSetId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch option");
    }
    return response;
  });
  return response.json();
};

const getFunc = async (options) => {
  const response = await fetch(`http://192.168.1.222:3000/function/option-ids`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      optionIds: options.map((option) => option.id),
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch option");
    }
    return response;
  });
  return response.json();
};

const main = async () => {
  const campaign = await fetchCampaign(8);
  const template = await getTemplateById(campaign.templateId);
  const layer = await getLayer(campaign.templateId);
  const options = await getOption(campaign.optionSetId);
  const func = await getFunc(options);
  return {
    campaign: campaign,
    template: template,
    layer: layer,
    options: options,
    func: func,
  };
};

(async () => {
  let width;
  let height;
  let canvasTag;

  canvasTag = document.createElement("canvas");
  canvasTag.id = "canvas";
  optionTag = document.createElement("div");
  optionTag.id = "option";

  objectRes = await main();
  template = objectRes.template;
  layers = objectRes.layer;
  options = objectRes.options;
  funcs = objectRes.func;
  campaign = objectRes.campaign;
  // console.log(campaign);
  if (template.width > template.height) {
    if (template.width > MAX_DIMENSION) {
      width = MAX_DIMENSION;
      height = (MAX_DIMENSION * template.height) / template.width;
    } else {
      width = template.width;
      height = template.height;
    }
    const tag = document.getElementsByTagName("personalize-form")[0];
    const container = document.createElement("div");
    container.id = "container";
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.overflow = "hidden";
    tag.appendChild(container);
    container.appendChild(canvasTag);
  } else {
    if (template.height > MAX_DIMENSION) {
      height = MAX_DIMENSION;
      width = (MAX_DIMENSION * template.width) / template.height;
    } else {
      width = template.width;
      height = template.height;
    }
    const tag = document.getElementsByTagName("personalize-form")[0];
    const container = document.createElement("div");
    container.id = "container";

    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.style.overflow = "hidden";
    tag.appendChild(container);
    container.appendChild(canvasTag);
  }
  canvasTag.width = width;
  canvasTag.height = height;

  const canvasImg = new fabric.Canvas(canvasTag.id);
  fabric.Image.fromURL(template.imageUrl, (oImg) => {
    const { width, height } = oImg.getOriginalSize();
    oImg.selectable = false;
    oImg.scaleX = template.width / width;
    oImg.scaleY = template.height / height;
    canvasImg.add(oImg);
    canvasImg.sendToBack(oImg);
  });

  // canvasImg?.renderAll();
  const canvasContainer = document.getElementsByClassName("canvas-container")[0];

  canvasContainer.style.transformOrigin = "0 0";
  canvasContainer.transform = `scale(0.5)`;
  canvasContainer.width = template.width;
  canvasContainer.height = template.height;

  canvasImg?.renderAll();
  const tag = document.getElementsByTagName("personalize-form")[0];
  const optionListTag = document.createElement("input");
  optionListTag.id = "option-list";
  optionListTag.type = "file";

  function draw(optionId, file) {
    const listCurrentFunction = funcs.filter((func) => func.optionId === optionId).map((func) => func.layerId);
    const listCurrentLayer = layers.filter((layer) => listCurrentFunction.includes(layer.id));
    if (!file) {
      return;
    } else {
      listCurrentLayer.forEach((currentLayer) => {
        fabric.Image.fromURL(URL.createObjectURL(file), function (oImg) {
          const { width, height } = oImg.getOriginalSize();
          oImg.scaleX = currentLayer.width / width;
          oImg.scaleY = currentLayer.height / height;
          oImg.top = currentLayer.top;
          oImg.left = currentLayer.left;
          oImg.selectable = false;
          canvasImg.add(oImg);
        });
      });
    }
  }
  canvasImg?.renderAll();

  options.map((item) => {
    const option = document.createElement("label");
    option.innerText = "Chosse Image"
    option.style = {
      width: "max-content",
      height: "max-content",
      cursor: "pointer",
      padding: "10px 18px",
      display: "block",
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: "5px",
    }
    const optionListTag = document.createElement("input");
    optionListTag.id = "option-list";
    optionListTag.type = "file";
    tag.appendChild(option)
    tag.appendChild(optionListTag);
    optionListTag.onchange = (e) => {
      draw(item.id, e.target.files?.[0]);
    }
  })
})();
