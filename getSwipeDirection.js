var xDown = null;                                                        
var yDown = null;    
var dir;

var swipeDirection=(function(){

    function handleTouchStart(evt) {                                         
        xDown = evt.touches[0].clientX;                                      
        yDown = evt.touches[0].clientY;                                      
};                                                


    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
                    return;
                }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {
                                   /* left swipe */
                                    dir='l';
                                } else {
                                    /* right swipe */
                                    dir='r';
                                }                       
                } else {
                    if ( yDiff > 0 ) {
                                    // up swipe 
                                    dir='u'; 
                                } else { 
                                    // down swipe 
                                    dir='d';}}
     
        xDown = null;
        yDown = null;                                             
};
    function init(){

        window.addEventListener('touchstart', handleTouchStart, false);        
        window.addEventListener('touchmove', handleTouchMove, false);
    }
    return{
        init:init
    }
})();
