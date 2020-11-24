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
            "lng" : 30.325623,
            "picker": "img/design/map_picker.svg",
            "tooltip": 'Пулковское шоссе, дом 14  лит. Г'
        },
        {
            "lat": 59.798348, 
            "lng" : 30.274001,
            "picker": "img/design/map_picker1.svg",
            "tooltip": 'Пулковское шоссе, дом 22  лит. Г'
        },
        {
            "lat": 59.762123, 
            "lng" : 30.356293,
            "picker": "img/design/map_picker2.svg",
            "tooltip": 'Пулковское шоссе, дом 33  лит. Г'
        },
        {
            "lat": 59.782123, 
            "lng" : 30.346293,
            "picker": "img/design/map_picker.svg",
            "tooltip": 'Пулковское шоссе, дом 444  лит. Г'
        }
    ]

    function fromLatLngToPoint(latLng, map) {
        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    }

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

                const prevSlide = swiper.$el.find('.swiper-slide').eq(swiper.activeIndex - 1);
                const nextSlide = swiper.$el.find('.swiper-slide').eq(swiper.activeIndex + 1);

                if ( prevSlide.find('.video_container').length ) {
                    prevSlide.find('.banner__control').removeClass('pause')
                    prevSlide.find('.video_container')[0].pause()
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
                mainMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
                    icon: coordinates[0].picker,
                    map: map,
                });
                const latLng = new google.maps.LatLng(coordinates[1].lat, coordinates[1].lng);

                curMarker = new google.maps.Marker({
                    position: latLng,
                    icon: coordinates[1].picker,
                    map: map,
                });

                google.maps.event.addListener(curMarker, 'mouseover', function () {
                    var point = fromLatLngToPoint(curMarker.getPosition(), map);
                    $('#marker-tooltip').html(coordinates[swiper2.realIndex + 1].tooltip).css({
                        'left': point.x,
                        'top': point.y,
                        'display': 'flex'
                    })
                });
                
                google.maps.event.addListener(mainMarker, 'mouseout', function () {
                    $('#marker-tooltip').hide();
                });

                google.maps.event.addListener(mainMarker, 'mouseover', function () {
                    var point = fromLatLngToPoint(mainMarker.getPosition(), map);
                    $('#marker-tooltip').html(coordinates[0].tooltip).css({
                        'left': point.x,
                        'top': point.y,
                        'display': 'flex'
                    })
                });
                
                google.maps.event.addListener(mainMarker, 'mouseout', function () {
                    $('#marker-tooltip').hide();
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

                mainMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng),
                    icon: coordinates[0].picker,
                    map: map,
                });
                curMarker = new google.maps.Marker({
                    position: latLng,
                    icon: coordinates[swiper2.realIndex + 1].picker,
                    map: map,
                });

                google.maps.event.addListener(curMarker, 'mouseover', function () {
                    var point = fromLatLngToPoint(curMarker.getPosition(), map);
                    $('#marker-tooltip').html(coordinates[swiper2.realIndex + 1].tooltip).css({
                        'left': point.x,
                        'top': point.y,
                        'display': 'flex'
                    })
                });
                
                google.maps.event.addListener(curMarker, 'mouseout', function () {
                    $('#marker-tooltip').hide();
                });

                google.maps.event.addListener(mainMarker, 'mouseover', function () {
                    var point = fromLatLngToPoint(mainMarker.getPosition(), map);
                    $('#marker-tooltip').html(coordinates[0].tooltip).css({
                        'left': point.x,
                        'top': point.y,
                        'display': 'flex'
                    })
                });
                
                google.maps.event.addListener(mainMarker, 'mouseout', function () {
                    $('#marker-tooltip').hide();
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
        // pagination: {
        //   el: '.swiper-pagination6',
        //   type: 'progressbar'
        // },
        // autoplay: {
        //     delay: 3000,
        // },
        navigation: {
            prevEl: '.progress .swiper-button-prev',
            nextEl: '.progress .swiper-button-next'
        },
        on : {
            slideChange: function(i) {
                // swiper6.$el.find('.swiper-pagination-bullet').eq(swiper6.realIndex).addClass('swiper-pagination-bullet-active')
                // $('.progress .swiper-pagination-bullet').eq(swiper6.realIndex).siblings().removeClass('swiper-pagination-bullet-active')
                $('.progress .section__block_item').eq(swiper6.realIndex).slideDown('fast')
                $('.progress .section__block_item').eq(swiper6.realIndex).siblings().not('.slider_controls').slideUp('fast')


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
        $('.popup--plan .popup__download').attr('href', `img/content/${plan}`)

        console.log(swiper3)
        swiper3.autoplay.stop();
    })

    $(document).on("click", ".close", function () {
        $(".popup").removeClass("show");
        swiper3.autoplay.start();
    });

    $(document).on("click touchstart", function (e) {
        if (
            !$(e.target).closest('*[data-toggle="modal"]').length &&
            !$(e.target).closest(".popup__content").length 
        ) {
            $(e.target).removeClass("show");
            swiper3.autoplay.start();    
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

    // change video on desktop/mobile
    $('.video_container').each(function () {
        
        const video = $(this);

        const WindowWidth = $(window).width();

        if (WindowWidth < 768) {
            //It is a small screen
            if($(this).data('mobile')) {
                video.append(`<source src='${$(this).data('mobile')}' type='video/mp4' >`);
            } else {
                video.append(`<source src='${$(this).data('desktop')}' type='video/mp4' >`);
            }
            
        } else {
            //It is a big screen or desktop

            if($(this).data('desktop')) {
                video.append(`<source src='${$(this).data('desktop')}' type='video/mp4' >`);
            } else {
                video.append(`<source src='${$(this).data('mobile')}' type='video/mp4' >`);
            }
        }
    })
}); 
