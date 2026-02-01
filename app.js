let tapCount=0;

document.getElementById("secretIcon")?.addEventListener("click",()=>{
tapCount++;
if(tapCount===1995){
alert("Saved User: Admin\nPass: 778892");
}
});

function login(){
let u=user.value;
let p=pass.value;

if(u==="Admin" && p==="778892"){
voice.play();
setTimeout(()=>location="dashboard.html",700);
}else{
alert("Wrong Login");
}
}

function logout(){
location="index.html";
}

function calcHours(i,o){
let diff=(new Date("1970-01-01T"+o)-new Date("1970-01-01T"+i))/3600000;
return diff;
}

function saveData(){
let hours=calcHours(in.value,out.value);

db.collection("duty").add({
date:date.value,
in:in.value,
out:out.value,
shift:shift.value,
post:post.value,
double:double.checked,
hours:hours
}).then(loadData);
}

function loadData(){
let list=document.getElementById("list");
list.innerHTML="";
let total=0;

db.collection("duty").get().then(snap=>{
snap.forEach(doc=>{
let d=doc.data();
total+=d.hours;

let div=document.createElement("div");
div.className="row";

if(d.double) div.classList.add("highlight");

div.innerHTML=`
${d.date} | ${d.shift} | ${d.hours} hrs
<button onclick="del('${doc.id}')">❌</button>
`;

list.appendChild(div);
});

document.getElementById("total").innerText=total;
});
}

function del(id){
if(confirm("Delete entry?")){
db.collection("duty").doc(id).delete().then(loadData);
}
}

loadData();
