module.exports = class TrafficLight {
    constructor() {
        this.carsInCriticalSections = [];
    }

    /**
     * Notifies the RedLight that a car is entering a critical piece
     * @param {Car} car - The car entering the critical piece
     */
    enterCriticalSection(car) {
        if (this.carsInCriticalSections.includes(car)) {
            this.carsInCriticalSections = this.carsInCriticalSections.filter((el) => {
                return el.carId !== car.carId;
            });
        }
        this.carsInCriticalSections.push(car)
        console.log(car.name + ": enterCriticalSection: Cars in Critical Sections: " + this.carsInCriticalSections.length);
    }

    leftIntersection(car) {
        this.carsInCriticalSections = this.carsInCriticalSections.filter((el) => {
            return el.carId !== car.carId;
        });
        this.releaseCars();



        console.log(car.name + ": leftIntersection: Cars in Critical Sections: " + this.carsInCriticalSections.length);

    }

    releaseCars() {
        let nextCar = this.carsInCriticalSections.shift();
        if (nextCar) {
            let path = nextCar.collisionPath;

            for (let nextCar in this.carsInCriticalSections) {
                if (!this.carsInCriticalSections[nextCar].willCollide(nextCar.collisionPath)) {
                    this.carsInCriticalSections[nextCar].continue();
                }
            }
            nextCar.continue();
        }
    }

    isRed(car) {
        let scanCars = this.carsInCriticalSections.filter((el) => {
            return el.carId !== car.carId;
        });
        if (scanCars.length > 0) {
            return true;
        } else {
            return false;
        }
        //     let path = car.collisionPath;

        //     for (let critCar in scanCars) {
        //         let collisions = scanCars.filter((el) => {
        //             return el.willCollide(path);
        //         });

        //         if (collisions.length > 0) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }
    }

}