class Card {
    constructor(name, cost){
        this.name = name;
        this.cost = cost;
    }
}
// Carta del tipo Unidad
class Unit extends Card {
    constructor(name, cost, power, resilience){
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }
    // método de ataque
    attack(target){
        if (target instanceof Unit) {
            target.resilience -= this.power;
            console.log(`* ${this.name} atacó a ${target.name} restando ${this.power} de resiliencia.`);
        }
        else {
            throw new Error ("El objetivo debe ser una unidad!")
        }
    }
}

//Carta de tipo Efecto 
class Effect extends Card {
    constructor(name, cost, text, stat, magnitude){
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }

    //método para aumentar o reducir, resiliencia o poder de una Unidad
    play(target) {
        if( target instanceof Unit ) {
            if(this.stat == "poder"){
                target.power+= this.magnitude;
                console.log(`* ${this.text}, ahora ${target.name} tiene poder ${target.power}`);
            }else if(this.stat == "resiliencia"){
                target.resilience+= this.magnitude;
                console.log(`* ${this.text}, ahora ${target.name} tiene resiliencia ${target.resilience}`);
            }else{
                console.log("El stat no es correcto")
            }
        } else {
            throw new Error( "El objetivo debe ser una unidad!" );
        }
    }
}
// Efectos
const alg_duro = new Effect("Algoritmo duro", 2, "aumentar la resistencia del objetivo en 3", "resiliencia", 3);
const rech_promesa = new Effect("Rechazo de promesa no controlada", 1, "reducir la resistencia del objetivo en 2", "resiliencia", -2);
const prog_pareja = new Effect("Programacion en pareja", 3, "aumentar el poder del objetivo en 2", "poder", 2);

//Turno 1
let ninja_rojo = new Unit("Ninja Cinturon Rojo", 3, 3, 4);
alg_duro.play(ninja_rojo);

//Turno 2
let ninja_negro = new Unit("Ninja Cinturon Negro", 4, 5, 4);
rech_promesa.play(ninja_negro);

//Turno 3
prog_pareja.play(ninja_rojo);
ninja_rojo.attack(ninja_negro);
