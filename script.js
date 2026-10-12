Date.prototype.getWeek = function() {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

// Example usage:
const today = new Date();
var adkavis = 1;
var tomivis = 1;
var kubkovis = 1;
var krskovis = 1;
var riskovis = 1;
var olkovis = 1;
var sudyvis = 0;
var lichyvis = 0;

var days = ["nedela","pondelok","utorok","streda","stvrtok","piatok","sobota"]
var listclass = ["tomi","adka","krsko","kubko","risko","olko"]
var classa= ""
var events =document.getElementsByClassName("event")
var sude = document.getElementsByClassName("sudy");
var liche = document.getElementsByClassName("lichy");
var tomi = document.getElementsByClassName("tomi");
var sudytomi = document.getElementsByClassName("tomi lichy");
var lichytomi = document.getElementsByClassName("tomi sudy");
var risko = document.getElementsByClassName("risko");
var krsko = document.getElementsByClassName("krsko");
var kubko = document.getElementsByClassName("kubko");
var adka = document.getElementsByClassName("adka");
var olko = document.getElementsByClassName("olko");
var aktualnybutton = document.getElementById("aktualnybutton");
var classevents = 0;


function display(){
    for (let a = 0; a < events.length; a++){
            events[a].style.display="block";
        }
    for (let i = 0; i < listclass.length; i++) {
        
        if (sudyvis == 0){
            classa = "sudy "+ listclass[i];
            console.log(classa);
        }
        else{
            classa = "lichy " + listclass[i];
            console.log(classa);
        }
        classevents = document.getElementsByClassName(classa);
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (tomivis == 0){
        classevents = document.getElementsByClassName("tomi");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (kubkovis == 0){
        classevents = document.getElementsByClassName("kubko");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (riskovis == 0){
        classevents = document.getElementsByClassName("risko");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (krskovis == 0){
        classevents = document.getElementsByClassName("krsko");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (adkavis == 0){
        classevents = document.getElementsByClassName("adka");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (olkovis == 0){
        classevents = document.getElementsByClassName("olko");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
}

function aktualnybuttonpress(){
    if(today.getWeek() % 2 == 1){
        lichyvis=1;
        sudyvis=0;
    }
    else{
        lichyvis=0;
        sudyvis=1;
    }
    aktualnybutton.style.background="gray";
    sudybutton.style.background="lightgray";
    lichybutton.style.background="lightgray";
    display();
}
function sudybuttonpress(){
    lichyvis=0;
    sudyvis=1;
    aktualnybutton.style.background="lightgray";
    sudybutton.style.background="gray";
    lichybutton.style.background="lightgray";
    display();
}
function lichybuttonpress(){
    lichyvis=1;
    sudyvis=0;
    aktualnybutton.style.background="lightgray";
    sudybutton.style.background="lightgray";
    lichybutton.style.background="gray";
    display();
}
function tomichange(){
    if (tomivis == 0){
        tomivis=1;
    }
    else {
        tomivis=0;
    }
    display();
}
function adkachange(){
    if (adkavis == 0){
        adkavis=1;
    }
    else {
        adkavis=0;
    }
    display();
}
function krskochange(){
    if (krskovis == 0){
        krskovis=1;
    }
    else {
        krskovis=0;
    }
    display();
}
function riskochange(){
    if (riskovis == 0){
        riskovis=1;
    }
    else {
        riskovis=0;
    }
    display();
}
function kubkochange(){
    if (kubkovis == 0){
        kubkovis=1;
    }
    else {
        kubkovis=0;
    }
    display();
}
function olkochange(){
    if (olkovis == 0){
        olkovis=1;
    }
    else {
        olkovis=0;
    }
    display();
}

function actual() {
    const div = document.createElement("div");
    div.id= "timeline";
    day = today.getDay();
    if (today.getHours() > 21){
        daydiv = days[day+1] + "div";
    }
    else{
        daydiv = days[day] + "div";
    }
    console.log(daydiv);

    document.getElementById(daydiv).appendChild(div);
    actualtime()
} 
function actualtime(){
    const hourscolumn = today.getHours()*6;
    const timelinecolumn = hourscolumn -8*6 + 1 + Math.floor(today.getMinutes()/ 10);
    console.log(today);
    document.getElementById("timeline").style.gridColumn=timelinecolumn;
}
/*
if (adka[0].style.display == "none"){
        for (let i = 0; i < adka.length; i++){
            adka[i].style.display="block";
        }
    }
    else {
        for (let i = 0; i < adka.length; i++){
            adka[i].style.display="none";
        }
    }
    
function add() {
    const p = document.createElement("p");
    p.classList.add("event");
    p.textContent="hello";
    document.getElementById("pondelokdiv").appendChild(p);
} */
aktualnybuttonpress();
actual();
