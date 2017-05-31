let note = (function(form) {

    return (
        function() {
            location.href = "#second/1";
            let $parent = $("#slide2");
            $parent.empty();

            for (let key in localStorage) {
                if (key.substring(0, 6) == "sticky") {
                    let value = localStorage.getItem(key); // получаем JSON строку
                    let obj = JSON.parse(value); // преобразуем строку JSON в объект 
                    stickyAddDoom(obj);
                }
            }

            $("#write").on("click", deleteSticky);

            form.select("Choice_Color", $parent, ["LightGoldenRodYellow", "PaleGreen", "LightPink", "LightBlue"]);
            form.labelInput("Enter_text", $parent);

            let addSticky = $("<button ></button>").html("addSticky").attr('id', "addSticky").addClass("formdiv formLabel");
            addSticky.on("click", createSticky);
            $parent.append(addSticky);

            function createSticky() {
                let select = document.getElementById("Choice_Color");
                let index = select.selectedIndex;
                let color = select[index].innerHTML; // получаем значение опшэна
                let text = document.getElementById("Enter_text").value // введенный текст
                let obj = new Element(color, text);

                localStorage.setItem(obj.id, JSON.stringify(obj)); // добавляем в local Storage // преобразует значение JavaScript в строку JSON
                let div = stickyAddDoom(obj); // добавляем в doom
            }

            class Element {
                constructor(color, text) {
                    this.id = function() {
                        let currentDate = new Date();
                        return "sticky" + currentDate.getTime();
                    }();
                    this.color = color;
                    this.text = text;
                }
            }

            function stickyAddDoom(obj) {
                let writeNode = document.getElementById("write");
                let div = document.createElement("div");
                div.id = obj.id;
                div.innerHTML = obj.text;
                div.className = "child";
                div.style.backgroundColor = obj.color;
                writeNode.appendChild(div);
            }

            function deleteSticky(e) { // объект event,сгенерированный щелчком передается в функцию
                if (e.target.tagName.toLowerCase() == "div") { // является ли то что сгенерировало событие "div"
                    let id = e.target.id // target - это элемент на котором вы щелкнули,и который сгенерировал событие event 
                    let sticky = document.getElementById(id);
                    localStorage.removeItem(id); // удаляем из local Storage
                    sticky.remove(); // удаляем из DOOM
                }
            }
        }
    )
}(form))