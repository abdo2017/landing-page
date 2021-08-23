const sections = document.querySelectorAll("main section");
const ul = document.querySelector("ul#navbar__list");

// util functions
const util = {
  inView: (element) => {
    let rect = element.getBoundingClientRect();
    return (
      rect.top <= 50 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  removeActiveSection: () => {
    sections.forEach((section) => {
      section.classList.remove("your-active-class");
    });
  },
};
//creat li
sections.forEach((section) => {
  const dataContent = section.getAttribute("data-nav");
  const sectionID = section.getAttribute("id");
  const li = document.createElement("li");
  const liContent = document.createTextNode(dataContent);
  li.classList.add(sectionID);
  li.appendChild(liContent);
  ul.appendChild(li);
});

//scroll listener on window object
window.addEventListener("scroll", () => {
  // control active class to sections
  sections.forEach((section) => {
    if (util.inView(section)) {
      util.removeActiveSection();
      section.classList.add("your-active-class");
    }
  });

  // select active link in the navbar when scrolling
  let currentActiveSectionId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      currentActiveSectionId = section.getAttribute("id");
    }
  });

  const lis = document.querySelectorAll("ul li");
  lis.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(currentActiveSectionId)) {
      li.classList.add("active");
    }
  });
});

// doing scroll into view for the links in the navbar...
for (let i = 0; i < sections.length; i += 1) {
  const lis = document.querySelectorAll("li");
  lis[i].addEventListener("click", () => {
    sections[i].scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });
}
