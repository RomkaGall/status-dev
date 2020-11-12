$(document).ready(function () {

    // var options =  {
    //     onComplete: function(cep) {
    //       $(t)
    //     }
    //   };

      $('.input--tel').mask('+0 (000) 000 00 00');

    $(document).on('click', '.submit_form', function(e) {
        e.preventDefault()
        
        let validate = false;

        $(this).parent().find('input').each(function () {
            if($(this).val() === '') {
                $(this).addClass('error')
                $(this).next().removeClass('hidden')
                console.log(1)
            } else {
                console.log(2)
                $(this).removeClass('error')
                $(this).next().addClass('hidden')
            }
        })

        if($(this).parent().find('input.error').length > 0 ) {
            validate = false
        } else {
            validate = true
        }

        if (validate) {
            $(this).parent().addClass('hidden').next().removeClass('hidden')
        }
    })
});