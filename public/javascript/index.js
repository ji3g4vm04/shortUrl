const form = document.querySelector(".form");
const modalBody = document.querySelector(".modal-body");
const urlHistory = document.querySelector(".urlHistory");
const urlAddress = "http://127.0.0.1:3000/";

const formSubmit = async (e) => {
  e.preventDefault();
  let orginUrl = form.elements.orgin_url.value.trim();
  if (!orginUrl) {
    alert("網址不可為空");
    return;
  }
  let response = await fetch(urlAddress, {
    method: "POST",
    body: JSON.stringify({
      orginUrl,
    }),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
  });
  let resultUrl = await response.json();
  console.log(resultUrl);
  modalBodyContent(resultUrl);
};

const modalBodyContent = (response) => {
  modalBody.innerHTML = "...";
  if (response.status === "fail") {
    modalBody.innerHTML = response.message;
  } else {
    const result = response.result;
    console.log(result);
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
    document.querySelector(".copy").addEventListener("click", copyUrl);
  }
};

const copyUrl = async (e) => {
  e.preventDefault();
  const short = document.querySelector(".copy").textContent.trim();
  try {
    await navigator.clipboard.writeText(short);
    alert("複製成功");
  } catch (error) {
    console.log(error);
  }
};

const hsitoryCopy = async (e) => {
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
urlHistory.addEventListener("click", hsitoryCopy);
