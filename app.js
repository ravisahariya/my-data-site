// ===== LOGIN/LOGOUT =====
function logout(){
  location.href="index.html";
}

// ===== STORAGE =====
function getData(){
  return JSON.parse(localStorage.getItem("duty")||"[]");
}

function setData(d){
  localStorage.setItem("duty",JSON.stringify(d));
}

// ===== HOURS CALC =====
function hours(i,o){
  return (new Date("1970-01-01T"+o)-new Date("1970-01-01T"+i))/3600000;
}

// ===== SAVE =====
function saveData(){

  let d=getData();

  d.push({
    date:date.value,
    in:in.value,
    out:out.value,
    shift:shift.value,
    double:double.checked,
    hrs:hours(in.value,out.value)
  });

  setData(d);
  loadData();
}

// ===== DELETE =====
function del(i){
  let d=getData();
  d.splice(i,1);
  setData(d);
  loadData();
}

// ===== EDIT =====
function edit(i){
  let d=getData()[i];

  date.value=d.date;
  in.value=d.in;
  out.value=d.out;
  shift.value=d.shift;
  double.checked=d.double;

  del(i);
}

// ===== LOAD LIST =====
function loadData(){

  let d=getData();
  let list=document.getElementById("list");
  list.innerHTML="";

  let searchTxt=search.value.toLowerCase();
  let month=monthFilter.value;

  let total=0,count=0;

  d.forEach((x,i)=>{

    if(searchTxt && !x.date.includes(searchTxt) && !x.shift.toLowerCase().includes(searchTxt)) return;
    if(month && !x.date.startsWith(month)) return;

    total+=x.hrs;
    count++;

    let div=document.createElement("div");
    if(x.double) div.classList.add("ot");

    div.innerHTML=`
    ${x.date} | ${x.shift} | ${x.hrs} hrs
    <button onclick="edit(${i})">✏️</button>
    <button onclick="del(${i})">❌</button>
    `;

    list.appendChild(div);
  });

  total.innerText=total.toFixed(2);
  document.getElementById("count").innerText=count;
}

// ===== MONTH DROPDOWN =====
function fillMonths(){
  let m=monthFilter;
  for(let i=1;i<=12;i++){
    let mm=i.toString().padStart(2,"0");
    m.innerHTML+=`<option value="2026-${mm}">2026-${mm}</option>`;
  }
}

// ===== DOWNLOAD CSV =====
function downloadCSV(){
  let d=getData();
  let csv="Date,Shift,Hours\n";

  d.forEach(x=>{
    csv+=`${x.date},${x.shift},${x.hrs}\n`;
  });

  let blob=new Blob([csv]);
  let a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="duty.csv";
  a.click();
}

fillMonths();
loadData();
