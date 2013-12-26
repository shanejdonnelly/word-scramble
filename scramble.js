$(document).ready(function(){

    var interval;

    $('.container').on('click', '#submit', function(){
        var 
        word = $('#word').val(),
        $this = $(this),
        width = $(window).width(),
        height = $(window).height(),
        anagrams = [],
        dups = 0,
        iterations = 0,
        interval;
        
       //find out how wide the word will be, so we can keep it from running off the page 
        $this.append('<h1 style="display:none;" id="test">'+ word + '</h1>'); 
        
        interval = setInterval(function(){doit()}, 1);

        function doit(){
                var scrambled = scramble(word),
                as_string = scrambled.join(''),
                word_width = $('#test').outerWidth(),
                word_height = $('#test').outerHeight(),
                left = rand(5, width - (word_width + 5)),
                top = rand(5, height - (word_height + 5)),
                bg = (rand(0,10) === 3) ? "background:"+ rand_hex() +";z-index:" + iterations + ";color:#fff" : "";

                if(anagrams.indexOf(as_string) === -1){
                    $this.parent().append('<h1 style="position:fixed;top:'+ top +'px;left:'+ left +'px;'+ bg +'">' + as_string + '</h1>'); 
                    iterations++;
                    anagrams.push(as_string);
                }
                else{
                    dups++;
                    if(dups > 100){clearInterval(interval);console.log('done')}
                    return false;
                }
                 
            }
    });

    function scramble(w){
        var word = w;
        var chars = word.split('');
        var num_chars = chars.length;

        for(var x = 0; x < num_chars-1; x++){
            var rand_int = rand(0,num_chars-1),
            temp_char = chars[x];
            chars[x] = chars[rand_int];
            chars[rand_int] = temp_char;    
        }

        return chars;

    }

    function rand(min, max){
        var rand =  Math.random() * (max - min) + min;
        return Math.round(rand);
    } 

    function rand_hex(){
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16); 
    }

});
