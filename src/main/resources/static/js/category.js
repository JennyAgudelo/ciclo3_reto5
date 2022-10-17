let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";
function optenerCategorias(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta +  "/api/Category/all", 
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            mostrarCategorias(data)
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

function mostrarCategorias(data){
    let tablaCliente = "<table>";
    tablaCliente += "<thead>";
    tablaCliente += "<tr>";
    tablaCliente += "<td>" + "ID" + "</td>";
    tablaCliente += "<td>" + "NOMBRE" + "</td>";
    tablaCliente += "<td>" + "DESCRIPTION" + "</td>";
    tablaCliente += "<td>" + "BUTTON" + "</td>";
    tablaCliente += "</tr>";
    tablaCliente += "<thead>";
    for(i = 0; i < data.length; i++){
        tablaCliente += "<tr>";
        tablaCliente += "<td>" + data[i].id + "</td>";
        tablaCliente += "<td>" + data[i].name + "</td>";
        tablaCliente += "<td>" + data[i].description + "</td>";
        tablaCliente += "<td> <button onclick='borrarCategoria("+data[i].id+")'>Borrar</button>";
        tablaCliente += "</tr>";
    }
    tablaCliente += "</table>";
    $("#verTabla").append(tablaCliente);
}

function crearCategoria(){
    let myData = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url:ruta + "/api/Category/save", 
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(data){
                console.log(data);
                $("#verTabla").empty();
                $("#id").val("");
                $("#name").val("");
                $("#description").val("");
                optenerCategorias();
                alert("Se ha creado categoria exitosamente")
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

function traerUnaCategoria(){
    let id = $("#id").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Category" + "/" + id,
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            optenerCategorias();
            $("#id").val(data.id);
            $("#name").val(data.name);
            $("#description").val(data.description);
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

function modificarCategoria(){
    let myData = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
                $("#verTabla").empty();
                $("#id").val("");
                $("#name").val("");
                $("#description").val("");
                optenerCategorias();
                alert("Se ha actualizado categoria exitosamente");
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

function borrarCategoria(idRecibido){
    let id=idRecibido
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            optenerCategorias();
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