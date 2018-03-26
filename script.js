const storiesURI="https://apex.oraclecorp.com/pls/apex/ofdnewsletter/nwsltr/stories";

function createRadioGroup(name,fn){
    let group=[].slice.call(document.getElementsByClassName(name));
    group.activeIndex=-1;
    group.forEach((v,i)=>{
        v.radioGroup=group;
        v.radioIndex=i;
        v.classList.add("radio");
        v.addEventListener("click",e=>{
            if(group.activeIndex!==i){
                if(group.activeIndex>-1)group[group.activeIndex].classList.remove("selected");
                v.classList.add("selected");
                (fn||(_=>0))(v,i,group.activeIndex,e,name);
                group.activeIndex=i;
            }
        });
    });
    return group;
}

createRadioGroup("btn-route",function(v,i,j,e,name){
    if(j===-1){
        document.getElementById("submit-route").hidden=false;
    } else {
        document.querySelectorAll(".form-route")[j].classList.remove("form-route-active");
    }
    document.querySelectorAll(".form-route")[i].classList.add("form-route-active");
});
createRadioGroup("category");

function formatDate(D){
    return `${D.getFullYear()}-${D.getMonth()}-${D.getDay()}T${D.getHours()}:${D.getMinutes()}:${D.getSeconds()}Z`;
}
function GET(URI,fn){
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": URI,
        "method": "GET",
    }).done(fn);
}
function POST(DATA,URI,fn){
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": URI,
        "method": "POST",
        "headers":{
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        "data": DATA.toString(),
    }).done(fn);
}