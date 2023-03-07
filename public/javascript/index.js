const form = document.querySelector(".form");
const modalBody = document.querySelector(".modal-body");
const urlRecord = document.querySelector(".urlRecord");
const urlAddress = "http://127.0.0.1:3000/";
const modal = document.querySelector(".modal");

const fetchUtils = async (method, body = null, route = "") => {
  const API = urlAddress + route;
  let response = await fetch(API, {
    method,
    body,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
  });
  return response;
};

const formSubmit = async (e) => {
  e.preventDefault();
  modalBody.innerHTML = null;
  let orginUrl = form.elements.orgin_url.value.trim();
  // 空白偵測
  if (!orginUrl) {
    alert("網址不可為空");
    return;
  }
  // 發送原始網址
  const body = JSON.stringify({
    orginUrl,
  });
  const response = await fetchUtils("POST", body);

  // 透過json() 瀏覽器才能讀取回傳的資料
  let resultUrl = await response.json();
  modalBodyContent(resultUrl);
  // 底下紀錄更新
  await recordGet();
};

const recordGet = async () => {
  const response = await fetchUtils("GET", null, "urls");
  const result = await response.json();
  recordUpdate(result);
};

const recordUpdate = (result) => {
  urlRecord.innerHTML = "";
  result.forEach((url) => {
    urlRecord.innerHTML += `
    <a
      href="#"
      class="list-group-item list-group-item-action urlGroup"
      aria-current="true"
      data-short="${url.shortUrl}"
    >
     ${url.orginUrl}
    </a>`;
  });
};

const modalBodyContent = (response) => {
  if (response.status === "fail") {
    modalBody.innerHTML = response.message;
  } else {
    const result = response.result;
    modalBody.innerHTML = `
      <img
        class="rounded mx-auto d-block mb-3"
        src="./public/ExportedContentImage_00.png"
        style="width:40%"
      />
      <a
        href="#"
        class="text-center d-block copy"
      >
        http://127.0.0.1:3000/${result.shortUrl}
      </a>
      <p class="text-center">
        點擊網址即可複製
      </p>
    `;
    // document.querySelector(".copy").addEventListener("click", copyUrl);
  }
};

// 下面兩組function 可以合併使用但目前沒想法ＱＱ
const copyUrl = async (e) => {
  e.preventDefault();
  if (!e.target.matches(".copy")) return;
  const short = document.querySelector(".copy").textContent.trim();
  try {
    await navigator.clipboard.writeText(short);
    alert("複製成功");
  } catch (error) {
    console.log(error);
  }
};

const recordCopy = async (e) => {
  e.preventDefault();
  if (e.target.matches(".urlGroup")) {
    const short = e.target.dataset.short;
    try {
      await navigator.clipboard.writeText(`${urlAddress}${short}`);
      alert("複製成功");
    } catch (error) {
      console.log(error);
    }
  }
};

form.addEventListener("submit", formSubmit);
urlRecord.addEventListener("click", recordCopy);
modal.addEventListener("click", copyUrl);
