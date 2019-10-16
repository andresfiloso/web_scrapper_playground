const scrap = document.getElementById("scrap");
scrap.addEventListener("click", () => {
  let host = document.getElementById("host").value;
  let option = document.getElementById("option").value;
  let element = document.getElementById("element").value;
  let prop = document.getElementById("prop").value;
  let value = document.getElementById("value").value;

  content = {
    host: host,
    option: option,
    element: element,
    prop: prop,
    value: value
  };

  let scrappedItems = document.getElementById("scrappedItems");

  fetch("/scrap", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log("algo mas");
      for (let i = 0; i < data.length; i++) {
        div = `
                <div class="card">
                    <div class="card-body">
                    ${data[i]}
                    </div>
                </div>
            `;

        scrappedItems.innerHTML += div;
      }

      const elements = document.querySelectorAll(".card");
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", () => {
          console.log(elements[i]);
          content = elements[i].getElementsByClassName("card-body")[0];
          console.log(content);
          selectedItemsContainer = document.getElementById("selected-elements");
          selectedItemsContainer.innerHTML = content.innerHTML;
        });
      }
    });
});

let whereCheckbox = document.getElementById("whereCheckbox");

whereCheckbox.addEventListener('change', () => {
    where_inputs = Array.from(document.getElementsByClassName("where"));
    if (whereCheckbox.checked == true){
        where_inputs.map((input) => {
            input.style.display = '';
            input.disabled = false
            input.value = 'class'

        });
    }else {
        where_inputs.map((input) => {
            input.style.display = 'none';
            input.disabled = true
            input.value = ''
        });
    }
    
})

