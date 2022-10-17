let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";

function optenerBarcos(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Boat/all", 
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTablaBarcos").empty();
            mostrarBarcos(data)
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

function mostrarBarcos(data){
    let tablaBarco = "<table>";
    tablaBarco += "<thead>";
    tablaBarco += "<tr>";
    tablaBarco += "<td>" + "ID" + "</td>";
    tablaBarco += "<td>" + "BRAND" + "</td>";
    tablaBarco += "<td>" + "YEAR" + "</td>";
    tablaBarco += "<td>" + "NAME" + "</td>";
    tablaBarco += "<td>" + "DESCRIPTION" + "</td>";
    tablaBarco += "<td>" + "BUTTON" + "</td>";
    tablaBarco += "</tr>";
    tablaBarco += "<thead>";
    for(i = 0; i < data.length; i++){
        tablaBarco += "<tr>";
        tablaBarco += "<td>" + data[i].id + "</td>";
        tablaBarco += "<td>" + data[i].brand + "</td>";
        tablaBarco += "<td>" + data[i].year + "</td>";
        tablaBarco += "<td>" + data[i].name + "</td>";
        tablaBarco += "<td>" + data[i].description + "</td>";
        tablaBarco += "<td> <button onclick='borrarBarco("+data[i].id+")'>Borrar</button>";
        tablaBarco += "</tr>";
    }
    tablaBarco += "</table>";
    $("#verTabla").append(tablaBarco);
}

function crearBarco(){
    let myData = {
        id:$("#id").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        name:$("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/save", 
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(data){
                console.log(data);
                $("#verTabla").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description").val("");
                $("#name").val("");
                alert("Se ha creado bote exitosamente")
                optenerBarcos();
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

function traerUnBarco(){
    let id = $("#id").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*",
        },
        url:ruta + "/api/Boat" + "/" + id,
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            $("#verTabla").empty();
            optenerBarcos();
            if(data != null){
                $("#id").val(data.id);
                $("#brand").val(data.brand);
                $("#year").val(data.year);
                $("#name").val(data.name);
                $("#description").val(data.description);
            }else{
                alert("no se encuentra registrado");
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

function modificarBarco(){
    let myData = {
        id:$("#id").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        name:$("#name").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*"
        },
        url:ruta + "/api/Boat/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(data){
                $("#verTabla").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description").val("");
                $("#name").val("");
                optenerBarcos();
                alert("Se ha actualizado barco exitosamente");
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

function borrarBarco(idRecibido){
     let id=idRecibido
    $.ajax({
        url:ruta + "/api/Boat" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(data){
            $("#verTabla").empty();
            optenerBarcos();
            alert("Se ha eliminado bote exitosamente")

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

function llenarLista(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success: function(data){
            console.log(data);
            let listaCategoria = document.getElementById("listCategory");
            for(i=0; i<data.length; i++){
                let lista = document.createElement('option');
                lista.innerHTML = data[i].name + "(" + data[i].description + ")";
                lista.value = data[i].id;
                listaCategoria.appendChild(lista);
            }
        }
    })

}