let enviar =document.querySelector("#enviar__info")
let informacion=document.querySelectorAll(".info")
let tarjetas=document.querySelector(".tarjetas")
let modal = document.querySelector(".modales")
let boton = document.querySelector(".boton")
let ordenar = document.querySelector(".ordenar")


let cont =1

let biblioteca = JSON.parse(localStorage.getItem("biblioteca"))

console.log(informacion[3].value)
mostrarTarjeta()

function mostrarTarjeta(){
    if(biblioteca){

        biblioteca.forEach(element => {
            let div = document.createElement("div")
            div.classList.add("card")
            div.setAttribute("data-bs-toggle","modal")
            div.setAttribute("data-bs-target","#exampleModal")
            
            let img = document.createElement("img")
            img.classList.add("card-img-top")
            img.src=element.url
            
            let div2 = document.createElement("div")
            div2.classList.add("card-body")
            
            let h = document.createElement("h5")
            h.classList.add("card-title")
            h.textContent=element.titulo

            let autores = document.createElement("p")
            autores.textContent=`Autor:${element.autor}`
            

            let año = document.createElement("p")
            año.textContent=`Año:${element.año}`

            let disponible = document.createElement("p")
            disponible.textContent=`Disponible:${element.disponible}`

            let prestar = document.createElement("p")
            prestar.textContent=`Prestado A:${element.prestar}`
            
            
            div2.appendChild(h)
            div2.appendChild(autores)
            div2.appendChild(año)
            div2.appendChild(disponible)
            div2.appendChild(prestar)


            
            div.appendChild(img)
            div.appendChild(div2)
            
            tarjetas.appendChild(div)

          
        });
        
    }
}

function borrar(){
    div=document.querySelectorAll(".card")
    console.log(div)
    div.forEach(element => {
        tarjetas.removeChild(element)
    });
}

function reset(){
    for (let index = 0; index < informacion.length; index++) {
        informacion[index].value = ""

    }
    
}


enviar.addEventListener("click",()=>{
    if(biblioteca){
        
        biblioteca.push(
            {
            titulo:informacion[0].value,
            autor:informacion[1].value,
            año:informacion[2].value,
            disponible:(informacion[3].value== "1")? true:false,
            prestar:"camper",
            url:informacion[5].value
            }
        )
        console.log(biblioteca)
        borrar()
        
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


    mostrarTarjeta()
    reset()

})


boton.addEventListener("click",()=>{
    let valor=ordenar.value
    if(valor == "1"){
        biblioteca.sort((a,b)=>{
            let titleA = a.titulo
            let titleB = b.titulo
            if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
        })
    }
    borrar()
    mostrarTarjeta()

})
