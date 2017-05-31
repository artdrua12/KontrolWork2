let fabricaClass = (function() {

    class CarFabrica {

        constructor(array = []) { //  по умолчанию равен пустому массиву
            this.id = setTimeout(function() {
                (new Date()).getTime();
            }, 1);
            this.name = array[0];
            this.model = array[1];
            this.year = array[2];
            this.mileage = array[3];
            this.status = array[4];
            this.transmission = array[5];
            this.valueEngine = array[6];
            this.price = array[7];
            this.image = array[8];
            this.click = 0;
        }

        randCar() {

            this.name = randElement(["Ford", "Lada", "Chevrole", "Porche", "Vaz", "MAZ", "Audi"]);
            this.model = randElement(["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"]);
            this.year = randElement([1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000]);
            this.mileage = randElement([1, 10, 100, 1000, 10000]);
            this.status = randElement(["new", "used"]);
            this.transmission = randElement(["automat", "mechanics"]);
            this.valueEngine = randElement([800, 900, 1000, 1100, 1200, 1300, 1400]);
            this.price = randElement([2000, 1500, 12000, 700, 40000, 78000])
            this.image = "images/randFabrica/" + randElement(["1.png", "2.png", "3.png", "4.png", "5.png"]);

            function randElement(array) {
                return array[Math.floor(Math.random() * array.length)];
            }
        }
    }
    return function(array) {
        return new CarFabrica(array);
    }
}())