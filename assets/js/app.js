function saveData(evt) {
            if (!($("#merchant_name").val() && $("#merchant_type").val() && $("#merchant_offer").val() && $("#merchant_location").val() && $('#merchant_file')[0].files[0])) {
            $("body").snackbar({
                content: "الرجاء ادخال جميع التفاصيل",
                show: function() {

                }
            })
            return false;
        };

        var formData = new FormData();
        formData.append('avatar', $('#merchant_file')[0].files[0]);


        $.ajax({
            url: 'user/upload',
            type: 'post',
            cache: false,
            data: formData,
            enctype: 'multipart/form-data',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR) {
                if (typeof data.error === 'undefined') {
                    // Success so call function to process the form
                    //submitForm(event, data);

                $.post('/merchant', {
                    name: $("#merchant_name").val(),
                    type: $("#merchant_type").val(),
                    offer: $("#merchant_offer").val(),
                    location: $("#merchant_location").val(),
                    img: data.url
                }, function() {
                    alert('done')
                })

                    console.log(data, textStatus);
                } else {
                    // Handle errors here
                    console.log('ERRORS: ' + data.error);
                }


            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                // STOP LOADING SPINNER
            }


        })

}

$(document).ready(function() {

    $('.selectpicker').selectpicker({
        style: 'btn-info',
        size: 4
    });


})