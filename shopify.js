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

const main = async () => {
  const campaign = await fetchCampaign(8);
  const template = await getTemplateById(campaign.templateId);
  return template;
};

(async () => {
  let width;
  let height;
  let canvasTag;

  canvasTag = document.createElement("canvas");
  canvasTag.id = "canvas";

  template = await main();
  console.log(template);
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

  canvasImg?.renderAll();
  const canvasContainer = document.getElementsByClassName("canvas-container")[0];

  canvasContainer.style.transformOrigin = "0 0";
  canvasContainer.transform = `scale(0.5)`;
  canvasContainer.width = template.width;
  canvasContainer.height = template.height;
})();
