const baseUrl = "https://cars-project-six.vercel.app"; const modeBtn = document.querySelector(".mode");

const  hero_img_block = document.querySelector(".hero_img-block");
const  choose_car_btn = document.querySelectorAll(".choose_car_btn");
 const choose_car_list = document.querySelector(".choose_car_list");
 const cardListRender = (e, t) => {
    choose_car_list.innerHTML = e
      .map(
        (e) =>
          `<li class="choose_car_item">            <h3 value="${t}/${e.id}" class="choose_car_sub">${e.model}</h3>            <p class="choose_car_des">Economy Car</p>            <div class="choose_car_img">              <img src="${e.image}" alt="ford car" />            </div>            <div class="choose_car_characters">              <p class="choose_car_character">5 Seats</p>              <p class="choose_car_character">Automatic</p>              <p class="choose_car_character">${e.year}</p>              <p class="choose_car_character">${e.priceEstimate}</p>            </div>          </li>`
      )
      .join("");
  },
  getCarlList = (e) => {
    fetch(`${baseUrl}/${e}`)
      .then((e) => e.json())
      .then((t) => {
        cardListRender(t, e);
      });
  };
getCarlList("bmw"),
  choose_car_btn.forEach((e) => {
    e.addEventListener("click", (e) => {
      getCarlList(e.target.value);
      for (let e of choose_car_btn) e.classList.remove("active__btn");
      e.target.classList.add("active__btn");
    });
  });
const carModal = document.querySelector(".car_modal"),
  carModalInfo = document.querySelector(".car_modal_info"),
  closeCarModal = document.querySelector(".car_modal_close");
choose_car_list.addEventListener("click", (e) => {
  const t = e.target.closest(".choose_car_item");
  if (!t) return;
  const r = t.querySelector(".choose_car_sub").textContent,
    c = t.querySelector("img").src,
    n = t.querySelectorAll(".choose_car_character")[2].textContent,
    a = t.querySelectorAll(".choose_car_character")[3].textContent;
  (carModalInfo.innerHTML = `    <h2>${r}</h2>    <img src="${c}" alt="${r}" style="width:100%;border-radius:12px;margin:20px 0;">    <p><strong>Year:</strong> ${n}</p>    <p><strong>Price:</strong> ${a}</p>  `),
    carModal.classList.add("active");
}),
  closeCarModal.addEventListener("click", () => {
    carModal.classList.remove("active");
  }),
  carModal.addEventListener("click", (e) => {
    e.target === carModal && carModal.classList.remove("active");
  });
const viewAllBtn = document.getElementById("viewAll");
viewAllBtn.addEventListener("click", async () => {
  const e = ["bmw", "mercedes", "chevrolet", "lexus"],
    t = [];
  for (const r of e) {
    const e = await fetch(`${baseUrl}/${r}`),
      c = await e.json();
    t.push(...c);
  }
  cardListRender(t, "all");
  for (let e of choose_car_btn) e.classList.remove("active__btn");
});
const slidesContainer = document.querySelector(".slides");
let autoSlide,
  banners = [],
  currentIndex = 0;
const bannerRender = (e) => {
    (banners = e),
      (slidesContainer.innerHTML = banners
        .map(
          (e, t) =>
            `      <div class="slide ${
              0 === t ? "active" : ""
            }">        <img src="${e.image}" alt="${
              e.model
            }">        <div class="intro_content">          <h2 class="intro_title">${
              e.model
            }</h2>          <p class="intro_text">Rent cars as you are comfortable and where you are comfortable.</p>        </div>      </div>`
        )
        .join("")),
      startSlider();
  },
  startSlider = () => {
    clearInterval(autoSlide), (autoSlide = setInterval(() => nextSlide(), 3e3));
  },
  updateSlidePosition = () => {
    const e = 100 * -currentIndex;
    slidesContainer.style.transform = `translateX(${e}%)`;
  },
  nextSlide = () => {
    (currentIndex = (currentIndex + 1) % banners.length), updateSlidePosition();
  },
  prevSlide = () => {
    (currentIndex = (currentIndex - 1 + banners.length) % banners.length),
      updateSlidePosition();
  };
document.querySelector(".slider_btn.next").addEventListener("click", () => {
  nextSlide(), startSlider();
}),
  document.querySelector(".slider_btn.prev").addEventListener("click", () => {
    (currentIndex = (currentIndex - 1 + banners.length) % banners.length),
      updateSlidePosition(),
      startSlider();
  }),
  fetch(`${baseUrl}/banners`)
    .then((e) => e.json())
    .then((e) => bannerRender(e));


modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

