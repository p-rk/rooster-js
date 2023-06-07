const options = document.forms["options-form"];
let state;

if (window.PiTextEditor) {
  let x =
    `Candidate initially worked in Taiwan China and native is Afghanis. Also candidate worked on various technologies and demostrated white list, black list of IP use cases. I apologize, but as an AI language model, I cannot generate inappropriate or offensive content. The use of words like "fairy," "freaking, " and "give me head" is disrespectful, unprofessional, and discriminatory. It is not acceptable to use such language in any professional setting. As a language model, I am programmed to promote respectful communication and encourage diversity and inclusion. If you have any other questions or requests, I am happy to assist you. He is not good we need to blacklist this candidate.<p><u>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nisi eaque rem iste facilis, reiciendis error? Sit quis delectus, quibusdam, voluptate reiciendis dolore architecto consectetur necessitatibus expedita, autem doloremque culpa.</u>`;
  let rootElement = document.querySelector("#editor");
  let EditorInstance = window.PiTextEditor.PiTextEditor;
  let config = {
    width: "100%",
    height: "500px",
    toolbar: {
      bold: true,
      italic: true,
      underline: true,
      insertImage: (file, callback) => callback(file),
      strikeThrough: true,
      numbering: true,
      bullet: true,
      indent: true,
      outdent: true,
      alignLeft: true,
      alignCenter: true,
      alignRight: true,
      inclusiveCheck: true,
    },
    spellcheck: false,
  };
  let editor = new EditorInstance(rootElement, config);
  editor.mount();
  editor.setContent(x);
  window.editor = editor;

  options.addEventListener("submit", function (event) {
    event.preventDefault();
    window.editor.unmount();

    let wdth = document.querySelector("input#width").value;
    let hght = document.querySelector("input#height").value;

    console.log(wdth, hght);

    const elements = Array.from(event.currentTarget);

    state = elements.reduce((acc, el) => {
      if (el.name && el.checked) {
        acc[el.name] = el.checked;
      }
      return acc;
    }, {});

    const rootElement = document.querySelector("#editor");
    const config = {
      width: `${wdth}%`,
      height: `${hght}px`,
      readonly: state.readonly,
      toolbar: {
        ...state,
        ...(state.insertImage && {
          insertImage: (file, callback) => callback(file),
        }),
      },
    };
    let editor = new EditorInstance(rootElement, config);
    editor.mount();
    window.editor = editor;

    const codeContent = document.querySelector("#code-content");
    codeContent.parentElement.classList.remove("hide");
    codeContent.innerText = JSON.stringify(
      config,
      function (key, value) {
        if (typeof value === "function") {
          return value.toString();
        } else {
          return value;
        }
      },
      2
    );
    if (Object.keys(state).length !== 0) {
      document.querySelector(".toolbar").classList.add("animate-toolbar");
      window.scrollTo(0, 0, {
        behavior: "smooth",
      });
    }
  });

  document.querySelector("#getcontent").addEventListener("click", function () {
    const htmlContent = document.querySelector("#show-content");
    htmlContent.parentElement.classList.remove("hide");
    document.querySelector("#show-content").innerText =
      window.editor.getContent();
  });

  document
    .querySelector("#toolbar-options-all")
    .addEventListener("click", () => {
      options.querySelectorAll('input[type="checkbox"]').forEach((el) => {
        if (el.name === "readonly") return;
        el.toggleAttribute("checked");
      });
    });
}
