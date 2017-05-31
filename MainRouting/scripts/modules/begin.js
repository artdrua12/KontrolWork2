let begin = (function() {
    let array = arrayFromLocal();


    function objMax() {
        let last = array.length - 1;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[last].click < array[i].click) {
                let temp = array[i];
                array[i] = array[last];
                array[last] = temp;
            };
        };
        return array.pop();
    };

    return {
        isDatainLocalStorage: function() {
            if (!localStorage.getItem("localStorage")) { // проверяем есть ли значения в локал сторадж
                let array = [];
                for (let i = 0; i < 20; i++) {
                    let obj = fabricaClass();
                    obj.randCar();
                    array.push(obj);
                }
                localStorage.setItem("localStorage", JSON.stringify(array)); // заносим массив в локал сторадж  
            }
        },

        top5Click: function(arrayArticle) {
            for (let i = 0; i < 5; i++) { //  топ 5 кликов объявлений
                let maxObj = objMax();
                //let ins = $("article").eq(i);
                let ins = arrayArticle[i];
                let id = $('<div> id объявления </div>').html(maxObj.id).addClass("divInside").appendTo(ins);
                let img = $('<div>  </div>').addClass("divImg").css('backgroundImage', "url(" + maxObj.image + ")").appendTo(ins);
                let name = $('<div> </div>').html("Name: " + maxObj.name).addClass("divInside").appendTo(ins);
            }
        }
    }
}())