let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";
function optenerClientes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url:ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            mostrarClientes(data)
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

function mostrarClientes(data){
    let tablaCliente = "<table>";
    tablaCliente += "<thead>";
    tablaCliente += "<tr>";
    tablaCliente += "<td>" + "ID" + "</td>";
    tablaCliente += "<td>" + "NOMBRE" + "</td>";
    tablaCliente += "<td>" + "EMAIL" + "</td>";
    tablaCliente += "<td>" + "AGE" + "</td>";
    tablaCliente += "<td>" + "PASSWORD" + "</td>";
    tablaCliente += "<td>" + "BUTTON" + "</td>";
    tablaCliente += "</tr>";
    tablaCliente += "<thead>";
    for(i = 0; i < data.length; i++){
        tablaCliente += "<tr>";
        tablaCliente += "<td>" + data[i].idClient + "</td>";
        tablaCliente += "<td>" + data[i].name + "</td>";
        tablaCliente += "<td>" + data[i].email + "</td>";
        tablaCliente += "<td>" + data[i].age + "</td>";
        tablaCliente += "<td>" + data[i].password + "</td>";
        tablaCliente += "<td> <button onclick='borrarCliente("+data[i].idClient+")'>Borrar</button>";
        tablaCliente += "</tr>";
    }
    tablaCliente += "</table>";
    $("#verTabla").append(tablaCliente);
}

function crearCliente(){
    let myData = {
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Client/save",
            type:"POST",
            data:dataToSend,
            contentType:"application/json",
            datatype:"JSON",
            success:function(data){
                console.log(data);
                $("#verTabla").empty();
                $("#idClient").val("");
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                $("#password").val("");
                alert("Se ha creado cliente exitosamente")
                optenerClientes();
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

function traerUnCliente(){
    let id = $("#idClient").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url: ruta + "/api/Client" + "/" + id,
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            optenerClientes();
            if(data != null){
                $("#idClient").val(data.idClient);
                $("#name").val(data.name);
                $("#email").val(data.email);
                $("#age").val(data.age);
                $("#password").val(data.password);
            }else{
                alert("no se encuentra registrado")
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

function modificarCliente(){
    let myData = {
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*",
        },
        url: ruta + "/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            optenerClientes();
            alert("Se ha actualizado cliente exitosamente");
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

function borrarCliente(idRecibido){
    let id = idRecibido
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*",
        },
        url: ruta + "/api/Client" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            optenerClientes();
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