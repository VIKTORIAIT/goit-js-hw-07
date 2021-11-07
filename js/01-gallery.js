import { galleryItems } from "./gallery-items.js";

let isModalVisible = false;

const instance = basicLightbox.create(
  `
    <img src="" width="800" height="600">
`,
  {
    onShow: () => {
      isModalVisible = true;
      document.addEventListener("keydown", keyUpFunc);
    },
    onClose: () => {
      isModalVisible = false;
      document.removeEventListener("keydown", keyUpFunc);
    },
  }
);

function keyUpFunc(event) {
  if (event.key !== "Escape" || !isModalVisible) return;

  instance.close();
}

const gallery = document.querySelector(".gallery");

const items = galleryItems
  .map((item) => {
    return `<div class="gallery__item"> 
<a class="gallery__link" href="${item.original}">
<img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>
</div>`;
  })
  .join("");

gallery.insertAdjacentHTML("afterbegin", items);

gallery.addEventListener("click", (event) => {
  event.preventDefault();
  const originalImg = event.target.dataset.source;

  instance.element().querySelector("img").setAttribute("src", originalImg);
  instance.show();
});
