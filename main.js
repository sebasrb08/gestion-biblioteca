let enviar =document.querySelector("#enviar__info")
let informacion=document.querySelectorAll(".info")
console.log(informacion)
let tarjetas=document.querySelector(".tarjetas")
let biblioteca = JSON.parse(localStorage.getItem("biblioteca"))

enviar.addEventListener("click",()=>{
    if(biblioteca){
        
        biblioteca.push(
            {
            titulo:informacion[0].value,
            autor:informacion[1].value,
            año:informacion[2].value,
            disponible:(informacion[3].value== "Si")? true:false,
            prestar:"camper",
            url:informacion[5]
            }
        )
        console.log(biblioteca)

    }else{
        biblioteca=[{
            titulo:informacion[0].value,
            autor:informacion[1].value,
            año:informacion[2].value,
            disponible:(informacion[3].value== "Si")? true:false,
            prestar:"camper",
            url:informacion[5].value
        }]
        console.log(biblioteca)
    }
    localStorage.setItem("biblioteca",JSON.stringify(biblioteca))
    biblioteca.forEach(element => {

        let div = document.createElement("div")
        div.classList.add("card")
        let img = document.createElement("img")
        img.classList.add("card-img-top")
        img.src=element.url

        let div2 = document.createElement("div")
        div2.classList.add("card-body")

        let h = document.createElement("h5")
        h.classList.add("card-title")
        h.textContent=element.titulo

        let p = document.createElement("h5")
        p.classList.add("card-text")
        p.textContent=element.autor

        div2.appendChild(h)
        div2.appendChild(p)

        div.appendChild(img)
        div.appendChild(div2)
        
        tarjetas.appendChild(div)




    });
    

})