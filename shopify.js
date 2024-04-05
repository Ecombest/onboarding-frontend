let campaign;
let template;
const MAX_DIMENSION = 600;
const domain = "https://singular-carefully-mink.ngrok-free.app";
const fetchCampaign = async (campaignId) => {
  const response = await fetch(`${domain}/campaign/${campaignId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch campaign");
    }
    return response;
  });
  return response.json();
};
const getTemplateById = async (id) => {
  const response = await fetch(`${domain}/template/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch template");
    }
    return response;
  });
  return response.json();
};

const getLayer = async (templateId) => {
  const response = await fetch(`${domain}/layer/template/${templateId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch layer");
    }
    return response;
  });
  return response.json();
};

const getOption = async (optionSetId) => {
  const response = await fetch(`${domain}/option/set/${optionSetId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch option");
    }
    return response;
  });
  return response.json();
};

const getFunc = async (options) => {
  const response = await fetch(`${domain}/function/option-ids`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
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

const main = async (campaignId) => {
  const campaign = await fetchCampaign(campaignId);
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

async function draw(optionId, file, canvasImg) {
  const listCurrentFunction = funcs.filter((func) => func.optionId === optionId).map((func) => func.layerId);
  const listCurrentLayer = layers.filter((layer) => listCurrentFunction.includes(layer.id));
  if (!file) {
    return;
  } else {
    for (const currentLayer of listCurrentLayer) {
      const img = await new Promise((resolve, reject) => {
        fabric.Image.fromURL(URL.createObjectURL(file), (img) => {
          img.scaleX = currentLayer.width / img.width;
          img.scaleY = currentLayer.height / img.height;
          img.top = currentLayer.top;
          img.selectable = false;
          img.left = currentLayer.left;
          canvasImg.add(img);
          // canvasImg.sendToBack(img);
          canvasImg?.renderTop();
          resolve(img);
        });
      });
    }
  }
}
async function render(objectRes, canvasTag) {
  const tag = document.getElementById("content");
  if (!objectRes) return;

  template = objectRes.template;
  layers = objectRes.layer;
  options = objectRes.options;
  funcs = objectRes.func;
  campaign = objectRes.campaign;
  const container = document.createElement("div");
  container.id = "container";
  container.style.width = `${MAX_DIMENSION}px`;
  container.style.height = `${MAX_DIMENSION}px`;
  container.style.overflow = "hidden";
  tag.appendChild(container);
  container.appendChild(canvasTag);

  if (template.width > template.height) {
    if (template.width > MAX_DIMENSION) {
      width = MAX_DIMENSION;
      height = (MAX_DIMENSION * template.height) / template.width;
    } else {
      width = template.width;
      height = template.height;
    }
  } else {
    if (template.height > MAX_DIMENSION) {
      height = MAX_DIMENSION;
      width = (MAX_DIMENSION * template.width) / template.height;
    } else {
      width = template.width;
      height = template.height;
    }
  }
  const canvasImg = await new fabric.Canvas(canvasTag.id);
  const oImg = await new Promise((resolve, reject) => {
    fabric.Image.fromURL(template.imageUrl, (img) => {
      resolve(img);
    });
  });

  const { width: OImgWidth, height: OImgHeight } = oImg.getOriginalSize();
  oImg.selectable = false;
  oImg.scaleX = template.width / OImgWidth;
  oImg.scaleY = template.height / OImgHeight;

  canvasImg.setWidth(OImgWidth);
  canvasImg.setHeight(OImgHeight);

  canvasImg.add(oImg);
  canvasImg.sendToBack(oImg);

  tag.style.display = "flex";
  tag.style.maxWidth = "1000px";
  tag.style.flexDirection = "row";
  tag.style.justifyContent = "space-between";
  tag.style.alignItems = "center";
  const optionListTag = document.createElement("div");
  optionListTag.id = "option-list";
  tag.appendChild(optionListTag);

  options.map((item) => {
    const optionOverlay = document.createElement("div");
    const optionTextGroup = document.createElement("div");
    const optionTitle = document.createElement("h3");
    optionTitle.style.margin = "0";
    optionTitle.innerText = item.label;
    optionTextGroup.appendChild(optionTitle);
    const optionDescription = document.createElement("p");
    optionDescription.style.margin = "0";
    optionDescription.innerHTML = item.helpText;
    optionTextGroup.appendChild(optionDescription);
    optionOverlay.appendChild(optionTextGroup);
    optionOverlay.style.width = "300px";
    optionOverlay.style.display = "flex";
    optionOverlay.style.justifyContent = "space-between";
    optionOverlay.style.alignItems = "center";
    optionOverlay.style.padding = "10px";
    optionOverlay.style.border = "1px dashed #000";
    optionOverlay.style.marginBottom = "10px";
    optionOverlay.style.borderRadius = "5px";

    const option = document.createElement("label");
    option.innerText = "Choose Image";
    option.htmlFor = item.id;
    option.style.width = "max-content";
    option.style.height = "max-content";
    option.style.cursor = "pointer";
    option.style.padding = "10px 18px";
    option.style.display = "block";
    option.style.backgroundColor = "#000";
    option.style.color = "#fff";
    option.style.borderRadius = "5px";
    const optionInput = document.createElement("input");
    optionInput.id = item.id;
    optionInput.type = "file";
    optionInput.style.display = "none";
    optionOverlay.appendChild(option);
    optionOverlay.appendChild(optionInput);
    optionInput.onchange = async (e) => {
      await draw(item.id, e.target.files?.[0], canvasImg);
    };
    optionListTag.appendChild(optionOverlay);
    canvasImg?.renderAll();

    const canvasContainer = document.getElementsByClassName("canvas-container")[0];
    canvasContainer.style.transformOrigin = "0 0";
    canvasContainer.style.transform = `scale(${width / template.width})`;
  });
}

(async () => {
  let canvasTag;
  let objectRes;
  const tag = document.getElementsByTagName("personalize-form")[0];
  const contentTag = document.createElement("div");
  contentTag.id = "content";

  canvasTag = document.createElement("canvas");
  canvasTag.id = "canvas";
  tag.appendChild(contentTag);

  objectRes = await main(10);
  await render(objectRes, canvasTag);

  //   optionTag.appendChild(campaignInput);
})();
