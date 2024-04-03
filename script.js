const base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// There is some issue with this API it is changed 


const dropdowns= document.querySelectorAll('.dropdown select')
const fromCurr= document.querySelector('.from select')
const toCurr= document.querySelector('.to select')
const msg = document.querySelector('.msg')
let btn = document.querySelector('form button');

for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(currCode,countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name=="from" && currCode =="USD"){
            newOption.selected="USD";
        }
        else if(select.name=="to" && currCode=="INR")
        {
            newOption.selected="INR";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })

}

const updateFlag = (elem)=>{
    let currCode = elem.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = elem.parentElement.querySelector('img')
    img.src= newSrc;

}
const updateExchngRate= async ()=>{

    let amt = document.querySelector('.amount input');
    let amtVal = amt.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amt.value= 1;
    }
    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()]
    let totalAmount = amtVal*rate;

    msg.innerText=  `${amtVal} ${fromCurr.value} = ${totalAmount} ${toCurr.value}`

}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    updateExchngRate();
            

})
window.addEventListener('load',()=>updateExchngRate());
