document.querySelectorAll(".select-wrapper").forEach($element => handleDropdownUI($element));

function handleDropdownUI($element) {
  generateOptionsForCustom($element);
  const $inputElement = $element.querySelector("input");
  const $selectElement = $element.querySelector("select");
  $inputElement.value = "";

  $inputElement.addEventListener("input", () => generateOptionsForCustom($element));
  addArrowListener($element);

  $element.querySelector(".select-custom").addEventListener("click", e => {
    e.stopPropagation();
    clickDropDown($element);
  });

  $element.querySelector(".select-options").addEventListener("click", e => chooseOption(e, $element));
  $element.querySelector(".select-options").addEventListener("pointermove", e => {
    if (e.target.tagName === "LI") setSelectedItem(e.target, $element);
  });

  $selectElement.addEventListener("change", e => {
    $inputElement.value = e.target.value ?? $element.querySelector(`.select-options [data-value=${e.target.value}]`).textContent;
  });
}

function addArrowListener($element) {
  $element.querySelector("input").addEventListener("keydown", e => {
    if (!(e.key === "ArrowDown" || e.key === "ArrowUp")) return;
    handleArrowEvents($element, e.key === "ArrowDown");
  });
}

function clickDropDown($element) {
  const $inputElement = $element.querySelector("input");
  const $selectElement = $element.querySelector("select");
  $inputElement.value = "";
  $selectElement.value = "";

  generateOptionsForCustom($element);
  openDropDown($element);

  document.addEventListener("click", () => {
    if ($selectElement.value === "") $element.querySelector("input").value = "";
    closeDropDown($element);
  }, {once: true});
}

function setSelectedItem($item, $element) {
  $element.querySelector(".selected")?.classList.remove("selected");
  $item?.classList.add("selected");
  $item?.scrollIntoView({block: "nearest"});
}

function handleArrowEvents($element, down) {
    const $currentlySelected = $element.querySelector("li.selected") ?? $element.querySelector("li:hover");
    let $new;
    if ($currentlySelected) {
      $new = down ? $currentlySelected.nextSibling : $currentlySelected.previousSibling;
    } else if (down) {
      $new = $element.querySelector(".select-options li:first-child");
    } else {
      //do nothing
    }
    if ($new) setSelectedItem($new, $element);
}

function chooseOption(e, $element) {
  e.stopPropagation();
  const $option = e.target;
  $element.querySelector("select").value = $option.dataset.value;

  $element.querySelector("select").dispatchEvent(new Event("change"));
  closeDropDown($element);
}

function openDropDown($element) {
  $element.querySelector(".select-custom").classList.add("opened");
}

function closeDropDown($element) {
  $element.querySelector(".select-custom").classList.remove("opened");
}

function generateOptionsForCustom($element) {
  const searchString = $element.querySelector("input").value;
  const $options = [...$element.querySelectorAll("select option:not([disabled])")]
    .filter($option => $option.textContent.toLowerCase().startsWith(searchString.toLocaleLowerCase()));
  const $optionList = $element.querySelector(".select-custom .select-options");

  $optionList.innerHTML = "";
  $options.forEach($option => {
    $optionList.insertAdjacentHTML("beforeend", `<li data-value="${$option.value}">${$option.textContent}</li>`);
  });
}