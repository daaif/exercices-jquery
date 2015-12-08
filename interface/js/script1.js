
// Cette fonction est déja défini dans script.js
// ...

function zoomImage(path){
    var image = new Image();
    image.onload = function(){
      loadImage(path);
    };
    image.onerror = function(){
      path = './images/default.png';
      loadImage(path);
    };
    image.src = path;
    function loadImage(path){
      var $img = $('<img>' ).attr('src', path);
      var height = Math.max(innerHeight, $('body' ).height());
      var $container = $('<div>' ).css({
        width: '100%',
        height: height,
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'rgba(0,0,0,0.4)',
        cursor: 'pointer'
      } ).click(function(){
          $(this ).remove();
      });
      $img.css({
        position: 'absolute',
        top:'10%',
        left: '38%',
        width: '24%',
        height: 'auto',
        cursor: 'default'
      });
      $container.append($img ).appendTo($('body'));
    }
  };
