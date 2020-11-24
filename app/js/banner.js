jQuery(function(){

    if($(window).width() > 1024) {
        $('.youtube_player').each(function () {
            const id = $(this).attr('id')
            
            jQuery(`#${id}`).YTPlayer({
                onReady: function( player ) {
                    $(player).parents('.banner__content').find('.player_overlay').fadeOut(400)
                }           
            });
        })
    }
   
    
  });

  
function progressLoop(video, progress) {
    setInterval(function () {
        if(video.currentTime > 0) {
            progress.value = Math.round((video.currentTime / video.duration) * 100);
        }
    });
}

$(document).on('click', '.banner__control', function () {
    const video = $(this).parents('.swiper-slide').find('.video_container').get(0)
    const progress = $(this).parents('.swiper-slide').find('.video_progress').get(0)
    $(this).toggleClass('pause')

    if($(this).hasClass("pause")) {
        video.play()
        progressLoop(video, progress)
    } else {
        video.pause()
    }
})
$('.banner .swiper-slide').eq(0).find('.banner__control').click()