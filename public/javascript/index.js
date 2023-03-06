const form = document.querySelector(".form");
const modalBody = document.querySelector(".modal-body");

const formSubmit = async (e) => {
  e.preventDefault();
  const API = "http://127.0.0.1:3000/";
  let orginUrl = form.elements.orgin_url.value;
  let response = await fetch(API, {
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

const copyUrl = (e) => {
  e.preventDefault();
  const copy = document.querySelector(".copy");
  const range = document.createRange();
  range.selectNode(copy);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
};

form.addEventListener("submit", formSubmit);
