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

  $(document).on('click', '.banner__control', function () {
    $(this).toggleClass('pause')
  })