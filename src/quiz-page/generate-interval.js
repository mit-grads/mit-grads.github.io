export class GenerateInterval {
    constructor(scale) {
        this.scale = scale.slice();
    }
    getRandomInterval() {
        const number = Math.floor(Math.random() * this.scale.length);
        const randomInterval = this.scale[number];
        this.scale.splice(number, 1);
        return randomInterval;
    }
    removeInterval(interval) {
        const index = this.scale.indexOf(interval);
        
        this.scale.splice(index, 1);
    }
}