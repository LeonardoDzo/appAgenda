function calendario() {
    $(function () {
 
        var CalLoading = true;
        $('#fullcalendar').fullCalendar({

            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
            editable: true,
            allDaySlot: true,
            selectable: true,
            
            events: '/Home/getClientes/',
            eventClick: function (calEvent, jsEvent, view) {
                Delete(calEvent.id, calEvent.title);
            },
            dayClick: function (date, allDay, jsEvent, view) {
                Save(date);
            }
        });
        
    });
}

function Save(date) {
    var newDate = $.fullCalendar.formatDate(date, 'dd/MM/yyyy');
    swal({
        title: "Asignar Cliente!",
        text: "Escribe el nombre del Cliente:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder:"Escribe un nombre"
    },
    function (inputValue) {
        if (inputValue === false) return false;

        if (inputValue === "") {
            swal.showInputError("Necesitas escribir un Nombre!");
            return false
        }

        var dataRow = {
            'Name': inputValue,
            'startDate': newDate
        }
        $.ajax({
            type: 'POST',
            url: "/Home/Save",
            data: dataRow,
            success: function (response) {
                if (response == 'True') {
                    $('#fullcalendar').empty();
                    calendario();
                    swal("Nice!", "Cliente: "+ inputValue+" asignado al día " + newDate, "success");
                }
                else {
                    swal("OPSSS!", "Parece que ya existe un Cliente en este dia", "error");
                }
            },
            error: function (response) {
                swal("OPSSS!", "Sucedio un error, intentalo de nuevo", "error");
            }
        });
        
    });

}

function Delete(ID, Name) {

    var dataRow = {
        'ID': ID
    }


    swal({
        title: "Estas seguro?" ,
        text: "Quitaras el cliente " + Name + " del dia!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, eliminalarlo!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'POST',
                url: "/Home/Delete",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(dataRow)
                  
                });      
            calendario();
            swal("Deleted!", "El cliente ha sido eliminado", "success");
        
        } else {
            swal("Cancelled", "Tu cliente esta a salvo :)", "error");
        }
    });
    
}