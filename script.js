Date.prototype.getWeek = function() {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};


const today = new Date();
const thisday = today.getDay();
const monday = new Date(today);
monday.setDate(today.getDate() - (thisday === 0 ? 6 : thisday - 1));

const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
});

// Example usage:

var adkavis = 1;
var tomivis = 1;
var kubkovis = 1;
var krskovis = 1;
var riskovis = 1;
var olkovis = 1;
var tozickavis = 1;
var sudyvis = 0;
var lichyvis = 0;


var days = ["nedela","pondelok","utorok","streda","stvrtok","piatok","sobota"]
var listclass = ["tomi","adka","krsko","kubko","risko","tozicka","olko"]
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
var tozicka = document.getElementsByClassName("tozicka");
var aktualnybutton = document.getElementById("aktualnybutton");
var classevents = 0;

var names = ["tomi","risko","krsko","adka","kubko","tozicka","olko"]
const daysoftheweek = ["pondelok","utorok","streda","stvrtok","piatok","sobota","nedela"]
const daysics = ["Po","Út","St","Čt","Pá","So","Ne"]
var den = 0;

var AllClasses = [];
async function readClasses() {
    for (let i = 0; i < names.length; i++) {
        var name = names[i];
        var nameofjson = name + ".json"
        const response = await fetch(nameofjson);
        const classes = await response.json();
        console.log(classes);
        AllClasses.push(classes);
        addingEvents(name,classes)
    }
    console.log(AllClasses);
}

function display(actualdisplay){
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
    if (tozickavis == 0){
        classevents = document.getElementsByClassName("tozicka");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        }
    }
    if (actualdisplay != 1) {
        classevents = document.getElementsByClassName("seasonal");
        for (let j = 0; j < classevents.length; j++){
            classevents[j].style.display="none";
        } 
    }
    
    if (actualdisplay == 1) {
        for (let i = 0; i < AllClasses.length; i++) {
            const classes = AllClasses[i];
            for (let j = 0; j < classes.length; j++) {
                const timetableclass = classes[j];
                if (timetableclass.length == 8) {
                    var actualvis = 0;
                    for (let k = 0; k < timetableclass[7].length; k++) {
                        if (dates.includes(timetableclass[7][k])) {
                            console.log("matubyt");
                            actualvis = 1;
                            break;
                        }
                    }
                    if (actualvis == 0) {
                        const Eventbyname=document.getElementsByClassName(names[i]+j)
                        for (let l = 0; l < Eventbyname.length; l++) {
                            const OneEventbyname = Eventbyname[l];
                            OneEventbyname.style.display="none";
                        }
                    }
                }
            }
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
    display(1);
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
function tozickachange(){
    if (tozickavis == 0){
        tozickavis=1;
    }
    else {
        tozickavis=0;
    }
    display();
}

function actual() {
    const div = document.createElement("div");
    div.id= "timeline";
    if (today.getHours() > 21){
        if (thisday + 1 > 4) {
            daydiv = days[1] + "div";
        }
        else{
            daydiv = days[thisday+1] + "div";
        }
    }
    else{
        if (thisday > 4) {
            daydiv = days[1] + "div";
        }
        else{
            daydiv = days[thisday] + "div";
        }
    }
    console.log(daydiv);

    document.getElementById(daydiv).appendChild(div);
    actualtime()
} 
function actualtime(){
    const hourscolumn = today.getHours()*6;
    var timelinecolumn = hourscolumn -8*6 + 1 + Math.floor(today.getMinutes()/ 10);
    console.log(today);
    if (timelinecolumn < 1){
        timelinecolumn=1;
    }
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
Date.prototype.getWeek = function() {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};










function addingEvents(name,classes) {
    for (let i = 0; i < classes.length; i++) {
        
        const Class = classes[i];
        if (name == "olko" && Class[2] == "prednaska") {
            continue;
        }
        const event = document.createElement("p");
        var cssClasses = "event ";
        cssClasses += Class[2]+" "; //prednaska laebo cviko
        cssClasses += name+i +" ";  //css classa pridavanie
        cssClasses += name + " ";   // meno cloveka
        if (Class[6] == "sudy") {
            cssClasses +="sudy "; 
        }
        else if (Class[6] == "lichy") {
            cssClasses += "lichy ";
        }
        else{
            cssClasses += "all ";
        }
        event.style.gridColumn=Class[4]; //column a span
        event.textContent=Class[0]; // nazov eventu
        if (Class.length == 8) {
            if (Class[7].length < 5) {
                cssClasses += "seasonal " ;
            } 
        }
        
        if (Class[5].length == 1) {  ////   !!!!!!!!!!!!!!!!!!!! aktualny pozrie datumy a sudy lichy fixne dni
            const dayindex = daysics.indexOf(Class[5][0]);
            if (Class[4][0] != "-") {
                if (dayindex < 5 && dayindex != -1) {
                    event.classList=cssClasses;   // davanie class do css eventom
                    const dayId = daysoftheweek[dayindex]+"div";
                    document.getElementById(dayId).appendChild(event);
                }
            }
            
        } 
        else {
            for (let j = 0; j < Class[5].length; j++) {
                cssClasses += name + i + "_" + j + " ";
                const dayindex = daysics.indexOf(Class[5][j]);
                if (Class[4][0] != "-") {
                    if (dayindex < 5 && dayindex != -1) {
                        event.classList=cssClasses;   // davanie class do css eventom
                        const dayId = daysoftheweek[dayindex]+"div";
                        document.getElementById(dayId).appendChild(event);
                    }
                }
            }
        }
    }
    aktualnybuttonpress();
}
readClasses();

console.log(dates);
actual();

