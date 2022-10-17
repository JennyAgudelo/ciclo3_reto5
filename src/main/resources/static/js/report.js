let ruta = "http://localhost:8080";
//let ruta = "http://129.80.231.113:8080";

function consultaPorFecha(){
    //let dateA = document.getElementById("fechaInicial");
    //let dateB = document.getElementById("fechaFina");
    //dateOne.toString();
    //dateTwo.toString();
    //let dateOne =dateA.value;
   // let dateTwo =dateB.value;
    //console.log(dateA.value);
    //console.log(dateB.value);
    let dateOne = $("#fechaInicial").val();
    let dateTwo = $("#fechaFinal").val();
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-dates" + "/"  + dateOne + "/" + dateTwo,
        type: "GET",
        //contentType:"application/json",
        datatype:"JSON",
        success: function(data) {
            console.log(data);
            $("#verTabla").empty();
            $("#fechaInicioa").val("");
            $("#fechaFina").val("");
            let myTable = "<table>";
            myTable += "<span>" + "Información de Reserva" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "ID" + "</td>";
            myTable += "<td>" + "STARTDATE" + "</td>";
            myTable += "<td>" + "DEVOLUTIONDATE" + "</td>";
            myTable += "<td>" + "STATUS" + "</td>";
            myTable += "<td>" + "BOAT" + "</td>";
            myTable += "<td>" + "CLIENT" + "</td>";
            myTable += "<td>" + "SCORE" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
            for (let i = 0; i < data.length; i++) {
                myTable += "<tr>";
                myTable += "<td>" + data[i].idReservation + "</td>";
                myTable += "<td>" + data[i].startDate + "</td>";
                myTable += "<td>" + data[i].devolutionDate + "</td>";
                myTable += "<td>" + data[i].status + "</td>";
                if (data[i].boat.category != null)
                    myTable += "<td>" + data[i].boat.name + "(" + data[i].boat.category.name + " - " + data[i].boat.category.description + ")" + "</td>";
                else
                    myTable += "<td>" + data[i].boat.name + "(" + "Sin categoria asignada" + ")" + "</td>";
                myTable += "<td>" + data[i].client.name + "</td>";
                if (data[i].score != null)
                    myTable += "<td>" + data[i].score.stars + "</td>";
                else
                    myTable += "<td>" + "Sin puntuación" + "</td>";
                myTable += "</tr>";
            }
            $("#verTabla").append(myTable);
            alert("Consulta exitosa")
        },
        error: function (xhr, status) {
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function (xhr, status) {
            console.log("Petición completada");
        }
    })
}

function consultaPorEstado(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-status",
        type: "GET",
        contentType:"application/json",
        datatype:"JSON",
        success: function(data) {
            console.log(data);
            $("#verTabla").empty();
            $("#fechaFinal").val("");
            $("#fechaFinal").val("");
            let myTable = "<table>";
            myTable += "<span>" + "Información Estado Reservas" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "COMPLETED" + "</td>";
            myTable += "<td>" + "CANCELLED" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
            myTable += "<tr>";
            myTable += "<td>" + data.completed + "</td>";
            myTable += "<td>" + data.cancelled + "</td>";
            myTable += "</tr>";
            $("#verTabla").append(myTable);
            alert("Consulta exitosa")
        },
        error: function (xhr, status) {
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function (xhr, status) {
            console.log("Petición completada");
        }
    })
}

function consultaPorClientes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-clients",
        type: "GET",
        contentType:"application/json",
        datatype:"JSON",
        success: function(data) {
            console.log(data);
            $("#verTabla").empty();
            let myTable = "<table>";
            myTable += "<span>" + "Información Top Clientes" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "CLIENT" + "</td>";
            myTable += "<td>" + "RESERVAS" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
            for(let i=0; i<data.length; i++){
                myTable += "<tr>";
                myTable += "<td>" + data[i].client.name + "</td>";
                myTable += "<td>" + data[i].total + "</td>";
                myTable += "</tr>";
            }
            $("#verTabla").append(myTable);

            let myTable2 = "<table>";
            myTable2 += "<span>" + "RESERVAS" + "</span>";
            myTable2 += "<thead>";
            myTable2 += "<tr>";
            myTable2 += "<td>" + "CLIENT" + "</td>";
            myTable2 += "<td>" + "STARTDATE" + "</td>";
            myTable2 += "<td>" + "DEVOLUTIONDATE" + "</td>";
            myTable2 += "<td>" + "STATUS" + "</td>";
            myTable2 += "<td>" + "BOAT" + "</td>";
            myTable2 += "<td>" + "SCORE" + "</td>";
            myTable2 += "</tr>";
            myTable2 += "</thead>";
            for(let i=0; i<data.length; i++){
                for(let j=0; j<data[i].client.reservations.length; j++){
                    myTable2 += "<tr>";
                    myTable2 += "<td>" + data[i].client.name + "</td>";
                    myTable2 += "<td>" + data[i].client.reservations[j].startDate + "</td>";
                    myTable2 += "<td>" + data[i].client.reservations[j].devolutionDate + "</td>";
                    myTable2 += "<td>" + data[i].client.reservations[j].status + "</td>";
                    if(data[i].client.reservations[j].boat.category != null)
                        myTable2 += "<td>" + data[i].client.reservations[j].boat.name + "(" + data[i].client.reservations[j].boat.category.name + " - " + data[i].client.reservations[j].boat.category.description + ")" +"</td>";
                    else
                        myTable2 += "<td>" + data[i].client.reservations[j].boat.name + "(" + "sin categoria asignada" + ")" + "</td>";
                    if(data[i].client.reservations[j].score != null)
                        myTable2 += "<td>" + data[i].client.reservations[j].boat.score.stars + "</td>";
                    else
                        myTable2 += "<td>" + "sin puntuación" + "</td>";
                    myTable2 += "</tr>";
                }
            }
            myTable2 += "</table>";
            $("#verTabla").append(myTable2);

            let myTable3 = "<table>";
            myTable3 += "<span>" + "Mensajes Asociados" + "</span>";
            myTable3 += "<thead>";
            myTable3 += "<tr>";
            myTable3 += "<td>" + "CLIENT" + "</td>";
            myTable3 += "<td>" + "MESSAGETEXT" + "</td>";
            myTable3 += "<td>" + "BOAT" + "</td>";
            myTable3 += "</tr>";
            myTable3 += "</thead>";
            for(let i=0; i<data.length; i++){
                for(let j=0; j<data[i].client.messages.length; j++){
                    myTable3 += "<tr>";
                    myTable3 += "<td>" + data[i].client.name + "</td>";
                    myTable3 += "<td>" + data[i].client.messages[j].messageText + "</td>";
                    if(data[i].client.messages[j].boat.category != null)
                        myTable3 += "<td>" + data[i].client.messages[j].boat.name + "(" + data[i].client.messages[j].boat.category.name + " - " + data[i].client.messages[j].boat.category.description + ")" +"</td>";
                    else
                        myTable3 += "<td>" + data[i].client.messages[j].boat.name + "(" + "sin categoria asignada" + ")" + "</td>";
                    myTable3 += "</tr>";
                }
            }
            myTable3 += "</table>";
            $("#verTabla").append(myTable3);
            alert("Consulta exitosa")
        },
        error: function (xhr, status) {
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function (xhr, status) {
            console.log("Petición completada");
        }
    })
}