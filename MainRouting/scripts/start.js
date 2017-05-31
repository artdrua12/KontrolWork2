window.onload = function() {

    $("#fullpage").fullpage({ // настройка fullpage
        sectionsColor: [, "yellow"],
        anchors: ["first", "second"],
        scrollBar: true,
        afterLoad: function(link, index) {
            if (index == 2) { admin() }
        }, // после загрузки страницы
        onLeave: function() {
            $("#slide1").empty();
        },
        loopHorizontal: true
            //scrollOverflow: true
    });

    begin.isDatainLocalStorage;
    begin.top5Click($("article"));


    let viewModelmaimBlock = kendo.observable({
        dataSource: arrayFromLocal().map(function(item) {
            item.image = 'url("' + item.image + '")';
            return item;
        }),
        clickImg: modalShow,
    });
    kendo.bind($("#block"), viewModelmaimBlock);


    let viewModelFilter = kendo.observable({
        array: null,
        constArray: arrayFromLocal().map(function(item) {
            item.image = 'url("' + item.image + '")';
            return item;
        }),
        nameValue: "",
        yearNumber: null,
        mileageNumber: null,
        statusValue: null,
        priceNumber: null,
        transmissionValue: null,
        valueEngine: null,

        mileageArray: [1, 10, 100, 1000, 10000],
        valueEngineArray: [800, 900, 1000, 1100, 1200, 1300, 1400],
        valueModelArray: ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"],
        valueModelArrayConst: [
            ["focus", "saf", "ilusij"],
            ["kalina", "brusnica", "minsk"],
            ["camaro", "dracon", "fox"],
            ["911", "panamera", "918"],
            ["2101", "7815", "9180"]
        ],
        autocompleteArray: ["Ford", "Lada", "Chevrole", "Porche", "Vaz", "MAZ", "Audi"],
        modelAdd: "",

        onChange: function() {
            let value = this.get("nameValue");
            newArray = [];
            for (let i = 0; i < this.autocompleteArray.length; i++) {
                if (value == this.autocompleteArray[i]) {
                    this.set("valueModelArray", this.valueModelArrayConst[i]);
                }
            }
        },
        reset: function() {
            this.set("yearNumber", null);
            this.set("mileageNumber", null);
            this.set("statusValue", null);
            this.set("priceNumber", null);
            this.set("transmissionValue", null);
            this.set("valueEngine", null);
            viewModelmaimBlock.set("dataSource", this.get("constArray"));
        },
        addModel: function() {
            this.get("valueModelArray").push(this.get("modelAdd"));
        },
        filter: function() {
            let insertArray = arrayFromLocal();
            let fData = [];
            fData[0] = this.get("nameValue");
            fData[1] = this.get("yearNumber");
            fData[2] = this.get("mileageNumber");
            fData[3] = this.get("statusValue");
            fData[4] = this.get("priceNumber");
            fData[5] = this.get("transmissionValue");
            fData[6] = this.get("valueEngine");

            for (let i = 0; i < fData.length; i++) {
                if (fData[i] != null || "") {
                    let temp = [];
                    for (let k = 0; k < insertArray.length; k++) {
                        let obj = findValue(insertArray[k], fData[i]);
                        if (obj != undefined) {
                            temp.push(obj);
                        }
                    }
                    insertArray = temp;
                }
            }
            this.set("array", insertArray.map(function(item) {
                item.image = 'url("' + item.image + '")';
                return item;
            }));

            viewModelmaimBlock.set("dataSource", this.get("array"));

            function findValue(obj, value) {
                for (let key in obj) {
                    if (obj[key] == value) {
                        return obj;
                    }
                }
            }
        },
    });
    kendo.bind($("#FilterTemplate"), viewModelFilter);



    let $main = $("main");
    let $section = $("section");
    let head = $("header");
    let scrolSave = head.children();
    let variableFiltTemp = $("#filterTemplate");
    let variableMainBlock = $main.children();
    variableFiltTemp.detach(); // скрынвает теплэйт что бы не отображался
    variableMainBlock.detach();
    let buttons = $("section input");
    let curentElement = null;
    let $additionally;
    let modal = $("#modal");

    modal.on("click", modalClose);
    $("#left").on("click", scroll);
    $("#right").on("click", scroll);
    $("#return").click(function() {
        $("#filterTemplate").remove();
        $main.empty();
        head.show(400);
        $("section").animate({
            "flex-grow": "1"
        }, 500);
        setTimeout(function() {
            head.append(scrolSave);
        }, 500);
        $("#view").on("click", resize);
    })

    $("#view").on("click", resize);
    $("#view").on("click", function() {;
        $section.append(variableFiltTemp);
        $main.append(variableMainBlock);
        kendo.bind($("#filterTemplate"), viewModelFilter);
        kendo.bind($("#block"), viewModelmaimBlock);
    });
    $("#apps").on("click", apps);
    $("#insert").on("click", function() {
        location.href = "#second/1";
    });
    $("#insert").on("click", insertForm);
    $("#admin").on("click", function() {
        location.href = "#second";
    });
    $("#clear").on("click", function() {
        localStorage.clear();
        $main.empty();
    });




    function resize() {
        scrolSave.detach();
        head.hide(400);
        $("section").animate({
            "flex-grow": "0",
        }, 500);
        $("#view").off("click", resize);
    };

    function modalShow(e) { // показ окна 
        modal.empty();
        if (curentElement) {
            curentElement.css("opacity", 1);
        }
        let id = $(e.target).closest("fieldset").children().eq(0).html();
        curentElement = $("#" + id); // получаем div чей элемент сгенерировал событие
        increaseClick(id); // увеличивем клики
        modal.css({
            "top": curentElement.offset().top,
            "left": curentElement.offset().left,
            "width": curentElement.width(),
            "height": curentElement.height(),
            "background-color": curentElement.css("background-color"),
            "display": "block"
        })

        let array = arrayFromLocal() //  массив объектов из Local Storage
        let obj = objReturn(id, array);
        modal.append(curentElement.clone()); // вставка данных
        $("#modal .divImg ").animate({ "width": 280, "height": 220 }, 300);
        $additionally = modal.children().filter("div"); // получаем div кликнутого элемента для вставки
        $additionally.append($('<label> </label>').addClass("label").html("Price Euro"));
        $additionally.append($('<label> </label>').addClass("input ").html("" + obj.price + 0.9));
        $additionally.append($('<label> </label>').addClass("label").html("Price RUB"));
        $additionally.append($('<label> </label>').addClass("input ").html("" + obj.price + 0.9));
        modal.append($additionally); // вставка дополнительных данных

        modal.animate({ "width": 400, "height": 500 }, 500);
        modal.animate({ "top": (window.pageYOffset + 150), "left": (window.innerWidth - 400) / 2 }, 700);
        curentElement.css("opacity", 0);

        event.stopPropagation();
    } // end modalShow

    function modalClose(e) {
        modal.animate({ "width": curentElement.width(), "height": curentElement.height() }, 300);
        modal.animate({ "top": curentElement.offset().top, "left": curentElement.offset().left }, 400);
        setTimeout(function() {
            modal.css("display", "none");
            curentElement.css("opacity", 1);
            curentElement = null;
        }, 700);
    } // end modalClose


}; // end load

///////////////////////////////--------------------------------------OTHER FUNCTION-------------------------------------------------///////////////////////////
function objReturn(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == value) {
            return array[i];
        }
    }
}

function increaseClick(id) {
    let array = arrayFromLocal() // получаем массив
    let obj = objReturn(id, array); // получаем объект
    obj.click = obj.click + 1; // увеличиваем клики
    localStorage.setItem("localStorage", JSON.stringify(array)); // заносим новый массив в локал сторадж(перезаписываем)  
}


function divCreate(e) {
    let array = arrayFromLocal();
    for (let i = 0; i < e.target.id; i++) {
        let obj = array[i];

        let div = $('<div>  </div>').css({ 'background-color': randElement(["green", "yellow", "gray", "pink", "white", "wheat"]) });
        let id = $('<div> id объявления </div>').html(obj.id).addClass("divInside").appendTo(div);
        let img = $('<div>  </div>').addClass("divImg").css('backgroundImage', "url(" + obj.image + ")").appendTo(div);
        let name = $('<div> </div>').html("Марка: " + obj.name).addClass("divInside").appendTo(div);
        let model = $('<div> </div>').html("Модель: " + obj.model).addClass("divInside").appendTo(div);
        let year = $('<div> </div>').html("Год выпуска: " + obj.year).addClass("divInside").appendTo(div);
        let price = $('<div> </div>').html("Цена: " + obj.price + " pуб<br>" + (obj.price / 2).toFixed(0) + " y.e<br>" + (obj.price / 2.2).toFixed(0) + " euro").addClass("divInside").appendTo(div);
        let mileage = $('<div> </div>').html("Пробег: " + obj.mileage + " км").addClass("divInside").appendTo(div);
        div.addClass("flexChild flex").appendTo("#main");
    }
}

function scroll(e) {
    let $a = $("article").eq(1).offset().left; // от начала экрана до 2 элемента
    let $b = $("article").eq(0).offset().left; // от начала экрана до 1 элемента
    let $c = $a - $b; // растояние сдвига
    let $article = $("header article");

    function left() {
        let $del = $article.eq(0).detach(); // delete first element
        $article.last().after($del); // adding to the end of the first element
        $("#scrolling").css("left", "0px");
    }

    function right() {
        let $del = $article.eq(2).detach(); // delete first element
        let $firstElm = $article.last();
        $article.first().before($firstElm); // last make to first
        $article.eq(2).after($del);
        $("#scrolling").css("left", "0px");
    }

    if (e.target.id == "left") {
        $("#scrolling").animate({ left: -$c }, 320);
        setTimeout(left, 400);
    }
    if (e.target.id == "right") {
        $("#scrolling").animate({ left: $c }, 320);
        setTimeout(right, 400);
    }
}

function arrayFromLocal() {
    let jsonArray = localStorage.getItem("localStorage");
    return array = JSON.parse(jsonArray);
}

function apps() {
    let $main = $("main");
    $main.empty();
    let button = $("<button ></button>").html("notes").attr('id', "notes").addClass("formdiv formLabel  button");
    button.on("click", note);
    $main.append(button);
}

function insertForm() {
    let parent = $("#slide2");
    let mainArr = arrayFromLocal();

    function count(name) {
        let count = 0;
        for (let i = 0; i < mainArr.length; i++) {
            if (mainArr[i].name == name) {
                count++;
            }
        }
        return count;
    }

    $("").kendoChart({
        series: [{
            type: "pie",
            data: [{
                category: "Ford",
                value: count("Ford")
            }, {
                category: "Lada",
                value: count("Lada")
            }, {
                category: "Chevrole",
                value: count("Chevrole")
            }, {
                category: "Porche",
                value: count("Porche")
            }, {
                category: "MAZ",
                value: count("MAZ")
            }, {
                category: "Vaz",
                value: count("Vaz")
            }, {
                category: "Audi",
                value: count("Audi")
            }]
        }]
    });





    form.createForm(parent); // запускаем форму и указываем родителя для вставки
    //далее идет автокомплит
    let nameArray = ["Ford", "Lada", "Chevrole", "Porche", "Vaz", "MAZ", "Audi"];
    $("#name").autocomplete({
        source: nameArray
    });
    let modelArray = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    $("#model").autocomplete({
        source: modelArray
    });
    let priceArray = ["2000", "1500", "12000", "1700", "40000", "72000"];
    $("#price").autocomplete({
        source: priceArray
    });
}