const form = document.querySelector(".form");

const formSubmit = async (e) => {
  e.preventDefault();
  const API = "http://127.0.0.1:3000/";
  const orginUrl = form.elements.orgin_url.value;
  const response = await fetch(API, {
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
  const resultUrl = await response.json();
  console.log(resultUrl);
};

form.addEventListener("submit", formSubmit);
