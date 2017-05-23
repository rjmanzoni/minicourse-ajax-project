
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

    var nyViewUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

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

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';

    $.ajax( {
      url: wikiUrl,
      dataType: 'jsonp',
      success: function(response) {
         var articleList = response[1];
         for(var i = 0 ; i < articleList.length; i++){
           article = articleList[i];
           var url ='https://en.wikipedia.org/wiki'+article;
           $wikiElem.append('<li><a href="'+article+'">'+article+'</a></li>');
         };
      }
    }
  );



    return false;
};

$('#form-container').submit(loadData);
