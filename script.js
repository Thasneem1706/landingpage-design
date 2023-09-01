function onFormSubmit( that, event ) {
    event.preventDefault();
        let data = {};
        let formData = $( 'form' ).serializeArray();
        let serviceDetails = [];
          formData.forEach((prop) => {
            if(prop.name === 'service'){
             serviceDetails.push(prop.value);
            }
            else{
                data[prop.name] = prop.value;
            }
          })
        data.service = serviceDetails.join(',');
        data.page_name = "Quote";
        $.ajax({
            url: "https://werkmen.com/easylinkus-api/api/contact.php",
            method: "POST",
            data : JSON.stringify(data),
            success: function(response) {
                $('#toast-notification').text(response.message);
                $('#toast-notification').addClass('notification-success');
                $('#toast-notification').fadeIn();
                clearForm();
                $('.modal').modal('toggle');
                setTimeout(function() {
                    $('#toast-notification').text('');
                    $('#toast-notification').removeClass('notification-success'); 
                    $('#toast-notification').hide();
                }, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#toast-notification').text("Something went wrong");
                $('#toast-notification').show();
                clearForm();
                $('.modal').modal('toggle');
                setTimeout(function(){
                    $('#toast-notification').text('');
                    $('#toast-notification').hide();
                },1000);
            },
         })
};

function clearForm(){
    $(':input')
    .not(':button, :submit, :reset')
    .val('')
    .prop('checked', false)
    .prop('selected', false);
}
