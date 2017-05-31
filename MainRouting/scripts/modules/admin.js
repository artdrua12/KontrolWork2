var admin = function admin() {

    $(function() {
        $("#slide1").kendoGrid({
            dataSource: { // источник всех данных
                data: arrayFromLocal(), // получаем массив из локал сторадж
                pageSize: 5, // количество отображений на 1 листе 
                create: function(options) {
                    let obj = new CarFabrica(options.data);
                    let array = arrayFromLocal();
                    array.push(obj);
                    localStorage.setItem("localStorage", JSON.stringify(array)); // заносим массив в локал сторадж  
                },
                update: function(options) {
                    alert("update");
                    let array = arrayFromLocal();
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id == options.data.id) {
                            array[i].Value = options.data.Value;
                        }
                    }
                    localStorage.setItem("localStorage", JSON.stringify(array));
                    options.success(options.data);
                },
                destroy: function(options) {
                    alert("destroy");
                    let array = arrayFromLocal();
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id === options.data.id) {
                            array.splice(i, 1);
                            break;
                        }
                    }
                    localStorage.setItem("localStorage", JSON.stringify(array));
                    options.success(array);
                },

                schema: {
                    model: {
                        id: "id",
                        fields: { // поля при нажати кнопки добавить
                            name: {
                                type: "string"
                            },
                            model: {
                                type: "string"
                            },
                            year: {
                                type: "number"
                            },
                            mileage: {
                                type: "number"
                            },
                            status: {
                                type: "string"
                            },
                            transmission: {
                                type: "string"
                            },
                            valueEngine: {
                                type: "number"
                            },
                            price: {
                                type: "number"
                            },
                            image: {
                                type: "string"
                            }
                        }
                    }
                }
            }, // end dataSource

            toolbar: ["create"], // кнопка добавить
            filterable: { // фильтр
                mode: "row"
            },
            resizable: true, // изменение размера колонки
            height: 700, // ширина
            scrollab: true, // прокрутка
            pageable: true, // если не помещаетс то перехож
            sortable: true, // сортировка
            groupable: true, // для группировки

            columns: [{ title: "id", field: "id" },
                { title: "name", field: "name" }, /* field: "name" указываем источник для коткретного title */
                { title: "model", field: "model" },
                { title: "year", field: "year" },
                { title: "mileage", field: "mileage" },
                { title: "status", field: "status" },
                { title: "transmission", field: "transmission" },
                { title: "valueEngine", field: "valueEngine" },
                { title: "price", field: "price" },
                { title: "click", field: "click" },
                { title: "image", field: "image", template: "<img width='100px' src ='#=image#'>" },
                { title: "settings", command: ["edit", "destroy"] }
            ],
            editable: "inline", //добавляет редартируемый функционал
        });
    })
}