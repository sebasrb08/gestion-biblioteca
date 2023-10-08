//Obtengo las etiquetas desde mi HTML
let enviar =document.querySelector("#enviar__info")
let informacion=document.querySelectorAll(".info")
let tarjetas=document.querySelector(".tarjetas")
let modal = document.querySelector(".modales")
let boton = document.querySelector(".boton")
let ordenar = document.querySelector(".ordenar")
let nombre = document.querySelector("#nombre")
let cambios = document.querySelector("#cambios")
let elimi


let cont =1
let cambiar
let index
let prestado
let botonesestado
// Obtengo los el objeto biblioteca
let biblioteca = JSON.parse(localStorage.getItem("biblioteca"))

function permanenciaDatos(){
    localStorage.setItem("biblioteca",JSON.stringify(biblioteca))

}

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
            estado.classList.add("estado")
            estado.textContent=`Estado:${element.estado}`

            prestado = document.createElement("p")
            prestado.classList.add("prestados")
            prestado.textContent=`Prestado A:${element.prestar}`

            if(element.prestar == null){
                prestado.style.display="none"
            }else{
                prestado.style.display="block"

            }

            let botonEstado = document.createElement("button");
            botonEstado.classList.add("btn","btn-success","w-100")
            botonEstado.textContent="Cambiar Estado"

            if(element.estado == "Disponible"){
                botonEstado.setAttribute("data-bs-toggle","modal")
                botonEstado.setAttribute("data-bs-target","#exampleModal")
            }else{
                botonEstado.removeAttribute("data-bs-toggle")
                botonEstado.removeAttribute("data-bs-target")
            }

            let botoneliminar = document.createElement("button");
            botoneliminar.classList.add("btn","btn-danger","w-100","mt-2")
            botoneliminar.textContent="Eliminar"
            
            div2.appendChild(h)
            div2.appendChild(autores)
            div2.appendChild(año)
            div2.appendChild(estado)
            div2.appendChild(prestado)
            div2.appendChild(botonEstado)
            div2.appendChild(botoneliminar)

            
            div.appendChild(img)
            div.appendChild(div2)
            
            tarjetas.appendChild(div)
            
            
        });
        
    }
    elimi= document.querySelectorAll(".btn-danger")
    borrarTarjeta()
    cambiar=document.querySelectorAll(".btn-success")
    cambiarEstado(cambiar)

}

function añadirTarjeta(){
    let ele=crearElementos()

    for (i=2;i<ele.length;i++){

        ele[1].appendChild(ele[i])
    }
            
    ele[0].appendChild(ele[2])
    ele[0].appendChild(ele[1])
            
    tarjetas.appendChild(ele[0])

          
    cambiar=document.querySelectorAll(".btn-success")
    let pres=ele[7]
    let boton=ele[8]
    cambiarEstado(cambiar,pres,boton)
    
}

function crearElementos (){
    let div = document.createElement("div")
    div.classList.add("card")

            
    let img = document.createElement("img")
    img.classList.add("card-img-top")
    img.src=biblioteca[biblioteca.length-1].url
            
    let div2 = document.createElement("div")
    div2.classList.add("card-body")
            
    let h = document.createElement("h5")
    h.classList.add("card-title")
    h.textContent=biblioteca[biblioteca.length-1].titulo

    let autores = document.createElement("p")
    autores.textContent=`Autor:${biblioteca[biblioteca.length-1].autor}`
            

    let año = document.createElement("p")
    año.textContent=`Año:${biblioteca[biblioteca.length-1].año}`

    let estado = document.createElement("p")
    estado.classList.add("estado")
    estado.textContent=`Estado:${biblioteca[biblioteca.length-1].estado}`

    let prestado = document.createElement("p")
    prestado.classList.add("prestados")
    prestado.textContent=`Prestado A:${biblioteca[biblioteca.length-1].prestar}`

    if(biblioteca[biblioteca.length-1].prestar == null){
            prestado.style.display="none"
        }else{
            prestado.style.display="block"            
        }

    let botonEstado = document.createElement("button");
    botonEstado.classList.add("btn","btn-success","w-100")
    botonEstado.textContent="Cambiar Estado"
            
    if(biblioteca[biblioteca.length-1].estado == "Disponible"){
        botonEstado.setAttribute("data-bs-toggle","modal")
        botonEstado.setAttribute("data-bs-target","#exampleModal")
    }else{
        botonEstado.removeAttribute("data-bs-toggle")
        botonEstado.removeAttribute("data-bs-target")
    
    }
    let botoneliminar = document.createElement("button");
    botoneliminar.classList.add("btn","btn-danger","w-100","mt-2")
    botoneliminar.textContent="Eliminar"
     
    let elementos=[div,div2,img,h,autores,año,estado,prestado,botonEstado,botoneliminar]
    return elementos
}

function cambiarEstado(cambiar){
    if(biblioteca){
        for (let i = 0; i < cambiar.length; i++) {
            cambiar[i].addEventListener("click",()=>{
                index=i
                if(biblioteca[i].estado == "Prestado"){
                    biblioteca[index].estado="Disponible"
                    biblioteca[index].prestar=null

                    cambiarEstadoParrafo(index)
                    mostrarPrestado(index)
                    mostrarModal(index)
                    permanenciaDatos()

                }
        
            })
        }
    }
    cambios.addEventListener("click",()=>{
        if (biblioteca[index].estado == "Disponible"){
                    
            biblioteca[index].estado="Prestado"
            biblioteca[index].prestar=nombre.value

            cambiarEstadoParrafo(index)
            mostrarPrestado(index)
            mostrarModal(index)
            permanenciaDatos()
            
            reset2()
        }
        
    })
}

function cambiarEstadoParrafo(i){
    let estados= document.querySelectorAll(".estado")
    estados[i].textContent=`Estado:${biblioteca[i].estado}`
}



function mostrarPrestado(index){
    prestado=document.querySelectorAll(".prestados")
            if(biblioteca[index].prestar == null){
                prestado[index].style.display="none"
            }else{
                prestado[index].style.display="block"
                prestado[index].textContent=`Prestado A: ${biblioteca[index].prestar}`
            }
    
}

function mostrarModal(index,botonEstado){
    botonEstado=document.querySelectorAll(".estado")
        if(biblioteca[index].estado == "Disponible"){
            botonEstado[index].setAttribute("data-bs-toggle","modal")
            botonEstado[index].setAttribute("data-bs-target","#exampleModal")
            console.log("2") 
        }else{
             botonEstado[index].removeAttribute("data-bs-toggle")
             botonEstado[index].removeAttribute("data-bs-target")
             console.log("1")
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

function reset2(){
    nombre.value=""
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
    permanenciaDatos()

    añadirTarjeta()
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

    borrar()
    mostrarTarjeta()
})
function borrarTarjeta(){

    for (let i = 0; i < elimi.length; i++) {
        elimi[i].addEventListener("click", ()=>{
            
            biblioteca.splice(i,1)
            console.log(biblioteca)
            permanenciaDatos()
            borrar()
            mostrarTarjeta()
        })
        
    }
}
    



mostrarTarjeta()
