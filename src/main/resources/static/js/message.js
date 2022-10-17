let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";
function optenerMensajes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta +  "/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            mostrarMensajes(data)
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se completo la petición");
        }
    });
}

function mostrarMensajes(data){
    let tablaCliente = "<table>";
    tablaCliente += "<thead>";
    tablaCliente += "<tr>";
    tablaCliente += "<td>" + "ID" + "</td>";
    tablaCliente += "<td>" + "MESSAGETEXT" + "</td>";
    tablaCliente += "<td>" + "BOAT" + "</td>";
    tablaCliente += "<td>" + "CLIENT" + "</td>";
    tablaCliente += "<td>" + "BUTTON" + "</td>";
    tablaCliente += "</tr>";
    tablaCliente += "<thead>";
    for(i = 0; i < data.length; i++){
        tablaCliente += "<tr>";
        tablaCliente += "<td>" + data[i].idMessage + "</td>";
        tablaCliente += "<td>" + data[i].messageText + "</td>";
        tablaCliente += "<td>" + data[i].boat.name + "</td>";
        tablaCliente += "<td>" + data[i].client.name + "</td>";
        tablaCliente += "<td> <button onclick='borrarMensaje("+data[i].idMessage+")'>Borrar</button>";
        tablaCliente += "</tr>";
    }
    tablaCliente += "</table>";
    $("#verTabla").append(tablaCliente);
}

function crearMensaje(){
    if(listBoats.value == "" && listClients.value == ""){
        alert("debe asignar a un barco y un cliente")
    }else{
        let dataBoat = {
            id:listBoats.value,
        }
        let dataClient = {
            idClient:listClients.value,
        }
        let myData = {
            idMessage:$("#idMessage").val(),
            messageText:$("#messageText").val(),
            boat:dataBoat,
            client:dataClient,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(data){
                console.log(data);
                $("#verTabla").empty();
                $("#idMessage").val("");
                $("#messageText").val("");
                alert("Se ha creado mensaje exitosamente")
                optenerMensajes();
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Se completo la petición");
            }
        });
    }

}

function traerUnMensaje(){
    let id = $("#idMessage").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Message" + "/" + id,
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            if(data != null){
                $("#idMessage").val(data.idMessage);
                $("#messageText").val(data.messageText);
                let tabla = "<table>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>" + "BOAT" + "</td>";
                tabla += "<td>" + "CLIENT" + "</td>";
                tabla += "<td>" + "MESSAGETEXT" + "</td>";
                tabla += "</tr>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>" + data.boat.name + "</td>";
                tabla += "<td>" + data.client.name + "</td>";
                tabla += "<td>" + data.messageText + "</td>";
                tabla += "</tr>";
                tabla += "</table>";
                $("#verTabla").append(tabla);
            }else{
                alert("este ID no se encuentra registrado")
            }
            alert("Petición exitosa")
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Se completo la petición");
        }
    });
}

function modificarMensaje(){
    let myData = {
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
                $("#verTabla").empty();
                $("#idMessage").val("");
                $("#messageText").val("");
                optenerMensajes();
                alert("Se ha actualizado mensaje exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("La petición se ha completado");
            }
        });
}

function borrarMensaje(idRecibido){
    let id=idRecibido;
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*",
        },
        url: ruta + "/api/Message" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            optenerMensajes();
            alert("Se ha eliminado exitosamente")

        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("La petición se ha completado");
        }
    });
}

function llenarBarcos(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            let listabarcos = document.getElementById("listBoats");
            for(i=0; i<respuesta.length; i++){
                let list = document.createElement('option');
                if(respuesta[i].category != null){
                    list.innerHTML = respuesta[i].name + "(" + respuesta[i].category.name + "-" + respuesta[i].category.description + ")";
                    list.value = respuesta[i].id;
                    listabarcos.appendChild(list);
                }else{
                    list.innerHTML = respuesta[i].name + "(" + "sin categoria asignada" + ")";
                    list.value = respuesta[i].id;
                    listabarcos.appendChild(list);
                }

            }
        }
    })

}
function llenarClientes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            let listaClientes = document.getElementById("listClients");
            for(i=0; i<respuesta.length; i++){
                let list = document.createElement('option');
                list.innerHTML = respuesta[i].name;
                list.value = respuesta[i].idClient;
                listaClientes.appendChild(list);
            }
        }
    })

}
function ejecutarBasicos(){
    llenarBarcos();
    llenarClientes();
}