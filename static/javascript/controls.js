var state = 'stop';

function buttonPlayPress() {
    if(state === 'stop'){
        state = 'play';
        $('#button_play > i')
            .removeClass('fa-play')
            .addClass('fa-pause')
            .css('color', 'green');

    }else if(state === 'resume'){
        state = 'play';
        $('#button_play > i')
            .removeClass('fa-play')
            .addClass('fa-pause')
            .css('color', 'green');

    }else if(state === 'play'){
        state = 'resume';
        $('#button_play > i')
            .removeClass('fa-pause')
            .addClass('fa-play')
            .css('color', 'green');
    }
}

function buttonStopPress(){
    state = 'stop';
    $("#button_play > i")
        .removeClass('fa-pause')
        .addClass('fa-play').
        css('color', 'black');
}
