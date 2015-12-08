/**
 * Created by aziz on 03/12/2015.
 */

  var gif = gif || false, indent = indent ? true : false ;

  var regTag = /((<[^<]+)(<\/[^>]+>))/ig;


  var $reset = $('<button>' )
          .html('Reset' )
          .css({color:'red'})
          .addClass('btn')
          .attr('title','Equivalent au bouton rafraichir du navigateur.')
          .click(function(){
      window.location.reload();
  });
  var $refresh = $('<button>' )
          .html('Refresh' )
          .css({right: '140px', color: 'green'})
          .addClass('btn')
          .attr('title','Affiche le code HTML actuel de div#ce.')
          .click(function(){
            var content = $('#exercice .markup').html();
              if(indent){
                  content = content.replace(regTag,
                                  function(match, p1){
                                    console.log('yes');
                                        return '\n\t\t' + p1 ;
                                  });
              }
              $('#exercice .code code' ).text(content);
              $.ajax(scriptPath, {dataType: 'text'}).done(function(data){
                $('#reponse' ).text(data);
                Prism.highlightAll();
              });

          });
  var $zoomImageLink = $('<button>' )
        .addClass('btn' )
        .css({right: '280px', color: '#a80639'} )
        .html('Voir le rsultat')
        .attr('title','Affiche un aperçu du résultat attendu.')
        .click(function(){
          zoomImage(Num);
        });

  var $navigateNext = $('<button>' )
        .addClass('btn' )
        .css({right: '420px', color: '#000', fontWeight: 'bolder', width: '80px'} )
        .html('Next &rightarrow; ')
        .attr('title','Suivant.')
        .click(function(){
          var num = ++Num < 10 ?  '0' + Num : Num;
          var url = 'exercice_' + num + '.html';
          $.ajax( url, {method: 'HEAD'} ).done(function(){
            location.href = url;
          } );
        });

  var $navigatePrev = $('<button>' )
        .addClass('btn' )
        .css({right: '510px', color: '#000', fontWeight: 'bolder', width: '80px'} )
        .html('&leftarrow; Prev')
        .attr('title','Précédent.')
        .click(function(){
          var num = --Num < 10 ?  '0' + Num : Num;
          var url = 'exercice_' + num  + '.html';
          $.ajax( url, {method: 'HEAD'} )
            .done(function(){
              location.href = url;
          });
        });

  var $navigateHome = $('<button>' )
        .addClass('btn' )
        .css({right: '600px', color: '#000', fontWeight: 'bolder', width: '80px'} )
        .html('Home')
        .attr('title','Home page.')
        .click(function(){
          var url = '../index.html';
          location.href = url;
        });


  $('body' ).append(
          $reset,
          $refresh,
          $zoomImageLink,
          $navigateNext,
          $navigatePrev,
          $navigateHome
  );
  $refresh.click();

  $('.enonce' ).mouseenter(function(){
      $('.barre' ).animate({opacity:1}, 300);
  }).mouseleave(function(){
      $('.barre' ).animate({opacity:0.5}, 300);
  } );
  $('.barre' ).click(function(){
      $('.enonce div:first' ).toggle(300);
  });

  function zoomImage(num, path){
    if(!num) return;
    var ext = gif ? '.gif' : '.png';
    path = path || '../images/exercice-' + num + ext;
    var image = new Image();
    image.onload = function(){
      loadImage(path);
    };
    image.onerror = function(){
      path = '../images/default.png';
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
        left: '10%',
        width: '80%',
        height: 'auto',
        cursor: 'default'
      });
      $container.append($img ).appendTo($('body'));
    }
  };



