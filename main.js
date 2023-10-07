let enviar =document.querySelector("#enviar__info")
let informacion=document.querySelectorAll(".info")
let tarjetas=document.querySelector(".tarjetas")
let modal = document.querySelector(".modales")
let boton = document.querySelector(".boton")
let ordenar = document.querySelector(".ordenar")

let cont =1
let cambiar
let biblioteca = JSON.parse(localStorage.getItem("biblioteca"))

mostrarTarjeta()

function mostrarTarjeta(){
    if(biblioteca){

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

            let autores = document.createElement("p")
            autores.textContent=`Autor:${element.autor}`
            

            let año = document.createElement("p")
            año.textContent=`Año:${element.año}`

            let estado = document.createElement("p")
            estado.textContent=`Estado:${element.estado}`

            let botonEstado = document.createElement("button");
            botonEstado.classList.add("btn","btn-success")
            botonEstado.textContent="Cambiar Estado"
            // let prestar = document.createElement("p")
            // prestar.textContent=`Prestado A:${element.prestar}`

            
            div2.appendChild(h)
            div2.appendChild(autores)
            div2.appendChild(año)
            div2.appendChild(estado)
            div2.appendChild(botonEstado)

            // div2.appendChild(prestar)


            
            div.appendChild(img)
            div.appendChild(div2)
            
            tarjetas.appendChild(div)

          
        });
        cambiar=document.querySelectorAll(".btn-success")
}
    for (let i = 0; i < cambiar.length; i++) {
        cambiar[i].addEventListener("click",()=>{
            if (biblioteca[i].estado == "Disponible"){
                
                biblioteca[i].estado="Prestado"
                
            }else{
                biblioteca[i].estado="Disponible"
            }
            borrar()
            mostrarTarjeta()
        })
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
            estado:"Disponible",
            prestar:null,
            url:informacion[3].value
            }
        )
        console.log(biblioteca)
        borrar()
        
    }else{
        biblioteca=[{
            titulo:informacion[0].value,
            autor:informacion[1].value,
            año:informacion[2].value,
            estado:"Disponible",
            prestar:null,
            url:informacion[3].value
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
            let titleA = a.titulo.toLowerCase()
            let titleB = b.titulo.toLowerCase()
            if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
        })
    }
    else if (valor == "2") {
        biblioteca.sort((a, b) => a.año - b.año);
    }
    else if(valor == "3"){
        biblioteca.sort((a,b)=>{
            let titleA = a.autor.toLowerCase()
            let titleB = b.autor.toLowerCase()
            if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
        })
    }

    console.log(biblioteca);
    borrar()
    mostrarTarjeta()



})

