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

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      
    function validate(value) {
        const $result = $("#result");
        $result.text("");
        
        return validateEmail(value)
    }
      
    $(".validateEmail").on("click", function (e) {
        e.preventDefault()
        const value = $(this).parent().find('input[type="email"]').val()
        const error = $(this).parent().next()

        if(validate(value)) {
            error.addClass('hidden')
        } else {
            error.removeClass('hidden')
        }
        
    });

    $('.validateEmail_input').on('focus', function () {
        $(this).parent().next().addClass('hidden')
    })

    // function SmoothVerticalScrolling(e, time, where) {
    //     var eTop = e.getBoundingClientRect().top;
    //     var eAmt = eTop / 100;
    //     var curTime = 0;
    //     while (curTime <= time) {
    //         window.setTimeout(SVS_B, curTime, eAmt, where);
    //         curTime += time / 100;
    //     }
    // }
    
    // function SVS_B(eAmt, where) {
    //     if(where == "center" || where == "")
    //         window.scrollBy(0, eAmt / 2);
    //     if (where == "top")
    //         window.scrollBy(0, eAmt);
    // }

    // $(document).on('click', '.menu__link', function () {
    //     const myelement = document.querySelector(`${$(this).find('span').attr("data-href")}`)
    //     console.log(myelement)
    //     SmoothVerticalScrolling(myelement, 400, "top");
    // })

    // Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  }
});
});