let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";
function optenerReservaciones(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta +  "/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            mostrarReservaciones(data)
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

function mostrarReservaciones(data){
    let tablaCliente = "<table>";
    tablaCliente += "<thead>";
    tablaCliente += "<tr>";
    tablaCliente += "<td>" + "ID" + "</td>";
    tablaCliente += "<td>" + "STARTDATE" + "</td>";
    tablaCliente += "<td>" + "DEVOLUTIONDATE" + "</td>";
    tablaCliente += "<td>" + "STATUS" + "</td>";
    tablaCliente += "<td>" + "CLIENT" + "</td>";
    tablaCliente += "<td>" + "BOAT" + "</td>";
    tablaCliente += "<td>" + "BUTTON" + "</td>";
    tablaCliente += "</tr>";
    tablaCliente += "<thead>";
    for(i = 0; i < data.length; i++){
        tablaCliente += "<tr>";
        tablaCliente += "<td>" + data[i].idReservation + "</td>";
        tablaCliente += "<td>" + data[i].startDate + "</td>";
        tablaCliente += "<td>" + data[i].devolutionDate + "</td>";
        tablaCliente += "<td>" + data[i].status + "</td>";
        tablaCliente += "<td>" + data[i].client.name + "</td>";
        tablaCliente += "<td>" + data[i].boat.name + "</td>";
        tablaCliente += "<td> <button onclick='borrarReservacion("+data[i].idReservation+")'>Borrar</button>";
        tablaCliente += "</tr>";
    }
    tablaCliente += "</table>";
    $("#verTabla").append(tablaCliente);
}

function crearReservacion(){
    if(listBoats.value == "" && listClients.value == "" && listStatus.value === ""){
        alert("debe asignar a un barco y un cliente")
    }else{
        let dataBoat = {
            id:listBoats.value,
        }
        let dataClient = {
            idClient:listClients.value,
        }
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:listStatus.value,
            boat:dataBoat,
            client:dataClient,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(data){
                console.log(data);
                $("#verTabla").empty();
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                alert("Se ha creado mensaje exitosamente")
                optenerReservaciones();
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

function traerReservacion(){
    let id = $("#idReservation").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Reservation" + "/" + id,
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            if(data != null){
                $("#idReservation").val(data.idReservation);
                $("#startDate").val(data.startDate);
                $("#devolutionDate").val(data.devolutionDate);
                let tabla = "<table>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>" + "CLIENT" + "</td>";
                tabla += "<td>" + "STATUS" + "</td>";
                tabla += "<td>" + "BOAT" + "</td>";
                tabla += "</tr>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>" + data.client.name + "</td>";
                tabla += "<td>" + data.status + "</td>";
                tabla += "<td>" + data.boat.name + "</td>";
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

function modificarReservacion(){
    if(listBoats.value == "" && listClients.value == "" && listStatus.value == ""){
        alert("debe llenar todos los campos")
    }else{
        let dataBoat = {
            id:listBoats.value,
        }
        let dataClient = {
            idClient:listClients.value,
        }
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:listStatus.value,
            boat:dataBoat,
            client:dataClient,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*"
            },
            url: ruta + "/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(data){
                $("#verTabla").empty();
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                optenerReservaciones()
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

}

function borrarReservacion(idRecibido){
    let id=idRecibido;
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*",
        },
        url: ruta + "/api/Reservation" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            optenerReservaciones();
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