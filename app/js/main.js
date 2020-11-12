$(document).ready(function () {
     
});

// map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map__container"), {
    zoom: 12,
    center: new google.maps.LatLng(59.7945845, 30.3308036),
    mapTypeId: "terrain",
  });

  curMarker = new google.maps.Marker({})
}


document.addEventListener('DOMContentLoaded', () => {
    // map
    const coordinates = [
        {
            "lat": 59.832050,
            "lng" : 30.325623
        },
        {
            "lat": 59.798348, 
            "lng" : 30.274001
        },
        {
            "lat": 59.762123, 
            "lng" : 30.356293
        },
        {
            "lat": 59.782123, 
            "lng" : 30.346293
        }
    ]
    // Loop through the results array and place a marker for each
    // set of coordinates.  
    // const mapCoordinates = function (results) {
    //   for (let i = 0; i < results.length; i++) {
    //     const coordsLat = results[i].lat;
    //     const coordsLng = results[i].lng;
    //     const latLng = new google.maps.LatLng(coordsLat, coordsLng);
    //     new google.maps.Marker({
    //       position: latLng,
    //       icon: "../img/design/map_picker.svg",
    //       map: map,
    //     });
    //   }
    // };
    
    
    // mapCoordinates(coordinates)

      // add custom bullets
      const createBullets = () => {
        let sliderCount;

        $('.custom_bullets').each(function () {
            sliderCount = $(this).find('.swiper-slide').length

            for (let i = 0; i < sliderCount; i++) {
                $(this).find('.swiper_bullets').append(`<span class="swiper-pagination-bullet"></span>`)
            }

            $(this).find('.swiper-pagination-bullet').eq(0).addClass('swiper-pagination-bullet-active')

            $(document).on('click',  '.custom_bullets .swiper-pagination-bullet', function() {
                let slider = $(this).parents('.custom_bullets').data('swiper')
                $(this).addClass('swiper-pagination-bullet-active').siblings().removeClass('swiper-pagination-bullet-active')
                const index = $(this).index()

                switch (slider) {
                    case 'swiper':
                        swiper.slideTo(index)
                        break;
                    case 'swiper2':
                        swiper2.slideTo(index)
                        break;
                    case 'swiper3':
                        swiper3.slideTo(index)
                        break;
                    case 'swiper4':
                        swiper4.slideTo(index)
                        break;
                    case 'swiper5':
                        swiper5.slideTo(index)
                        break;
                    case 'swiper6':
                        swiper6.slideTo(index)
                        break;
                    case 'swiper7':
                        swiper7.slideTo(index)
                        break;
                
                    default:
                        break;
                }
             });
        })
    }
    createBullets()

    $(document).on('click','.menu_toggle', function() {
        $(this).toggleClass("open");
        $('.mobile_menu').toggleClass('active')
        $('.menu').toggleClass('show')
        $('body, html').toggleClass('no_scroll');
    })

    $(document).on('click','.menu__link', function() {
        $('.menu_toggle').removeClass('open')
        $('.menu').removeClass('show')
        $('body, html').removeClass('no_scroll');
    })

    // sliders
    var swiper = new Swiper('.banner__slider', {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
            nextEl: '.swiper-button-next'
        },
        on : {
            slideChange: function(i) {
                swiper.$el.find('.swiper-pagination-bullet').eq(swiper.realIndex).addClass('swiper-pagination-bullet-active')
                $('.banner__slider .swiper-pagination-bullet').eq(swiper.realIndex).siblings().removeClass('swiper-pagination-bullet-active')

                const id = swiper.$el.find('.swiper-slide').eq(swiper.activeIndex - 1).find('.youtube_player').attr('id')
                swiper.$el.find('.banner__control').removeClass('pause')

                if ( id !== undefined) {
                    jQuery(`#${id}`).YTPPause()
                }
            }
        }
    });
    var swiper2 = new Swiper('.map__slider', {
        pagination: {
          el: '.swiper-pagination2',
          type: 'progressbar'
        },
        navigation: {
            nextEl: '.map__slider .swiper-button-next'
        },
        autoplay: {
            delay: 3000,
        },
        on : {
            init: function(){
                curMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
                    icon: "../img/design/map_picker.svg",
                    map: map,
                });

                if($(window).width() < 768) {
                    map.setZoom(11);
                }
            },
            slideChange: function(i) {
                swiper2.$el.find('.swiper-pagination-bullet').eq(swiper2.realIndex).addClass('swiper-pagination-bullet-active')
                $('.map__slider .swiper-pagination-bullet').eq(swiper2.realIndex).siblings().removeClass('swiper-pagination-bullet-active')

                // clear markers
                curMarker.setMap(); 


                const latLng = new google.maps.LatLng(coordinates[swiper2.realIndex + 1].lat, coordinates[swiper2.realIndex + 1].lng);
                curMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
                    icon: "../img/design/map_picker.svg",
                    map: map,
                });
                curMarker = new google.maps.Marker({
                    position: latLng,
                    icon: "../img/design/map_picker.svg",
                    map: map,
                });
            }
        }
    });

    let plan;

    var swiper3 = new Swiper('.apartments__slider', {
        pagination: {
          el: '.swiper-pagination3',
          type: 'progressbar'
        },
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.apartments__slider .swiper-button-next'
        },
        on : {
            init: function (i) {
                const title = i.slides[i.activeIndex].dataset['title']
                const profit = i.slides[i.activeIndex].dataset['profit']
                const year = i.slides[i.activeIndex].dataset['year']
                const month = i.slides[i.activeIndex].dataset['month']
                const area = i.slides[i.activeIndex].dataset['area']
                const sum = i.slides[i.activeIndex].dataset['sum']
                plan = i.slides[i.activeIndex].dataset['plan']
                // const image = 

                i.$el.find('.slider_title').text(title)
                i.$el.find('.slider_info_text').text(`Доход в год: ${profit} ₽`)

                $('.apartments__block_title').text(title)
                $('.apartments__values_item--year .value').text(`${year} ₽`)
                $('.apartments__values_item--month .value').text(`${month} ₽`)
                $('.apartments__values_item--area .value').text(`${area} ₽`)
                $('.apartments__values_item--sum .value').text(`${sum} ₽`)
                
            },
            slideChange: function(i) {
                swiper3.$el.find('.swiper-pagination-bullet').eq(swiper3.realIndex).addClass('swiper-pagination-bullet-active')
                $('.apartments__slider .swiper-pagination-bullet').eq(swiper3.realIndex).siblings().removeClass('swiper-pagination-bullet-active')

                const title = i.slides[i.activeIndex].dataset['title']
                const profit = i.slides[i.activeIndex].dataset['profit']
                const year = i.slides[i.activeIndex].dataset['year']
                const month = i.slides[i.activeIndex].dataset['month']
                const area = i.slides[i.activeIndex].dataset['area']
                const sum = i.slides[i.activeIndex].dataset['sum']
                plan = i.slides[i.activeIndex].dataset['plan']

                i.$el.find('.slider_title').text(title)
                i.$el.find('.slider_info_text').text(`Доход в год: ${profit} ₽`)

                $('.apartments__block_title').text(title)
                $('.apartments__values_item--year .value').text(`${year} ₽`)
                $('.apartments__values_item--month .value').text(`${month} ₽`)
                $('.apartments__values_item--area .value').text(`${area} ₽`)
                $('.apartments__values_item--sum .value').text(`${sum} ₽`)
            }
        }
    });

    var swiper4 = new Swiper('.infrastructure__slider', {
        pagination: {
          el: '.swiper-pagination4',
          type: 'progressbar'
        },
        navigation: {
            nextEl: '.infrastructure__slider .swiper-button-next'
        },
        autoplay: {
            delay: 3000,
        },
        on : {
            slideChange: function(i) {
                swiper4.$el.find('.swiper-pagination-bullet').eq(swiper4.realIndex).addClass('swiper-pagination-bullet-active')
                $('.infrastructure__slider .swiper-pagination-bullet').eq(swiper4.realIndex).siblings().removeClass('swiper-pagination-bullet-active')
            }
        }
    });

    var swiper5 = new Swiper('.team__slider', {
        slidesPerView: 4,
        spaceBetween: 50,
        // autoHeight: true,
        autoplay: {
            delay: 3000,
        },
        on : {
            init: function () {

                if($(window).width() > 1180) {

                    const sliderOffset = $('.team__content').offset().left
                    $('.team__slider .swiper-slide').eq(0).css('margin-left', sliderOffset) 
                }
            }
        },
        breakpoints: {
            
            320: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: true,
                initialSlide: 1,
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 50,
                centeredSlides: true,
                initialSlide: 1,
            },
            1024: {
                slidesPerView: 4,
                centeredSlides: false
            }
          }
    });

    var swiper6 = new Swiper('.progress__slider', {
        pagination: {
          el: '.swiper-pagination6',
          type: 'progressbar'
        },
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.progress__slider .swiper-button-next'
        },
        on : {
            slideChange: function(i) {
                swiper6.$el.find('.swiper-pagination-bullet').eq(swiper6.realIndex).addClass('swiper-pagination-bullet-active')
                $('.progress__slider .swiper-pagination-bullet').eq(swiper6.realIndex).siblings().removeClass('swiper-pagination-bullet-active')
            }
        }
    });

    var swiper7 = new Swiper('.gallery__slider', {
        slidesPerView: 'auto',
        spaceBetween: 60,
        initialSlide: 1,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination7',
          type: 'progressbar'
        },
        navigation: {
            nextEl: '.gallery__slider .swiper-button-next'
        },
        on : {
            init: function (i) {
                i.$el.find('.swiper-pagination-bullet').eq(i.realIndex).addClass('swiper-pagination-bullet-active')
            },
            slideChange: function(i) {
                i.$el.find('.swiper-pagination-bullet').eq(i.realIndex).addClass('swiper-pagination-bullet-active')
                $('.gallery__slider .swiper-pagination-bullet').eq(i.realIndex).siblings().removeClass('swiper-pagination-bullet-active')
                
            },
            click: function (i) {
                if(i.clickedIndex === undefined) {
                    return
                }
                i.slideTo(i.clickedIndex)
            }
        },
        breakpoints: {
            
            320: {
                spaceBetween: 20
            },
            1024: {
                spaceBetween: 60
            }
          }
    });

    // $(document).on('click', '.gallery__slider ' function () {

    // })

    
    // sliders end

    // tabs
      $(document).on('click', '.tab__nav_item', function () {
        $(this).addClass('active').siblings().removeClass('active')  
        $(`*[data-tab]`).not('.tab__nav_item').removeClass('active');
        $(`*[data-tab='${$(this).data('tab')}']`).addClass('active');
      })
    // tabs end
    
    $(document).on('click', '.apartments__show_plan', function () {
        $(".popup--plan").addClass("show");        
        $('.popup--plan .popup__image').attr('src', `img/content/${plan}`)
    })

    $(document).on("click", ".close", function () {
        $(".popup").removeClass("show");
    });

    $(document).on("click touchstart", function (e) {
        if (
            !$(e.target).closest('*[data-toggle="modal"]').length &&
            !$(e.target).closest(".popup__content").length 
        ) {
            $(e.target).removeClass("show");
        }

        e.stopPropagation();
    });

    $(document).on('click', '.modal_form', function () {
        $('.popup--form').addClass('show')
    })

    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()

    let innerHeight = $(window).innerHeight() - 62
    
    if ($(window).width() > 768) {
        innerHeight = $(window).innerHeight() - 80
    }

    $('.banner').css('height', `${innerHeight}px`)

    $('.contacts__form').on('submit', function () {
        $('.popup--success').addClass('show')
    })
}); 
