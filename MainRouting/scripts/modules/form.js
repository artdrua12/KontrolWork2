let form = (function() {

    return {
        labelInput: function(name, parent) {
            let $div = $("<div></div>").addClass("formdiv flex  ");
            $div.append($("<label></label>").html(name).addClass("flexChild formLabel"));
            $input = $("<input>").attr({ type: "text", id: name }).addClass("flexChild input");
            $div.append($input);
            if (name == "image") {
                $input.on("click", url);
            }
            parent.append($div);
        },


        radio: function(name, parent, array) {

            let $div = $("<div></div>").addClass("formdiv flex ");
            $div.append($("<label></label>").html(name).addClass("flexChild formLabel"));
            $divradio = $("<div></div>").attr({ type: "text", id: name }).addClass("flexChild formInput flex");

            for (let i = 0; i < array.length; i++) {
                $divradio.append($("<input>").addClass("formInput").attr({ type: "radio", id: array[i], value: array[i], name: name }));
                $divradio.append($("<label></label>").html(array[i]).addClass("formLabel").attr("for", array[i]));
            }
            $div.append($divradio);
            parent.append($div);
        },

        select: function(name, parent, array) {
            let $div = $("<div></div>").addClass("formdiv flex ");
            $div.append($("<label></label>").html(name).addClass("flexChild formLabel"));
            $select = $("<select></select>").addClass("flexChild formInput").attr("id", name);
            for (let i = 0; i < array.length; i++) {
                $select.append($('<option ></option>').html(array[i]));
            }
            $div.append($select);
            parent.append($div);
        },

        createForm: function(parent) {
            parent.empty();
            let obj = fabricaClass();
            for (key in obj) {
                if (key === "id") {
                    continue;
                }
                if (key === "year") {
                    this.select(key, parent, [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000]);
                    continue;
                }
                if (key === "mileage") {
                    this.select(key, parent, [1, 10, 100, 1000, 10000]);
                    continue;
                }
                if (key === "status") {
                    this.radio(key, parent, ["new", "used"]);
                    continue;
                }
                if (key === "transmission") {
                    this.radio(key, parent, ["automat", "mechanics"]);
                    continue;
                }
                if (key === "valueEngine") {
                    this.select(key, parent, [800, 900, 1000, 1100, 1200, 1300, 1400]);
                    continue;
                }
                if (key === "image") {
                    this.labelInput(key, parent);
                    continue;
                }
                this.labelInput(key, parent);
            }

            let insert = $("<button ></button>").html("adding").attr('id', "insert").addClass("formdiv formInput");
            insert.on("click", addObject);
            parent.append(insert);
        }
    } // end return

    function addObject() {
        let array = arrayFromLocal();
        let dataArray = [];
        let i = 0;
        for (key in array[0]) {
            if (key === "id") {
                continue;
            }
            dataArray[i++] = $("#" + key + "").val();
        }
        let obj = fabricaClass(dataArray);
        array.push(obj);
        localStorage.setItem("localStorage", JSON.stringify(array)); // заносим новый массив в локал сторадж(перезаписываем) 
        alert("Добавлен новый объект");
    }

    function url(e) {
        $inputUrl = $("<input>").attr({ type: "file", id: "your-files" }).addClass("flexChild formInput");
        $load = $("<button ></button>").html("Загрузить").addClass("flexChild formInput");
        $("#slide2").append($inputUrl, $load);

        $load.on("click", function() {
            var control = document.getElementById("your-files");
            file = control.files[0];

            let fileReador = new FileReader();
            fileReador.onloadend = function(e) {
                let data = e.target.result; // закодированная картинка 
                $("#image").val(data);
            }
            fileReador.readAsDataURL(file);
        });
    }

}())