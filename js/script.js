
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' +city;

    $greeting.text('Voce quer morar em '+address+'?');

    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';

    $body.append('<img class="bgimg" src="'+streetViewUrl+'">');

    var nyViewUrl = 'https://api.nytsssimes.com/svc/search/v2/articlesearch.json';

    nyViewUrl += '?' + $.param({
      'api-key': "a17d7862ce024b38af5fddfe6ab7bf08",
      'q': city
    });

    
           $.getJSON( nyViewUrl, function( data ) {
            $nytHeaderElem.text('Informacoes sobre '+city);
              var items = [];
              articles = data.response.docs;
              for (var i = 0; i < articles.length ; i++) {
                  var article = articles[i];
                  $nytElem.append('<li class="article">' +
                    '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                    '<p>'+article.snippet+'<p>'+
                    '</li>');
              }
            })
            .error(function(json){
                 $nytHeaderElem.text('Nao foi possivel obter Informacoes');
            });
   
    //console.log(data);

    
    

    return false;
};

$('#form-container').submit(loadData);
