var variableW = setInterval(function() {
    news();
}, 180000);

function news(){

    $.get("https://cors-anywhere.herokuapp.com/https://www.tagesschau.de/xml/rss2", function(data) {
        var $XML = $(data);
        var count = 0;

        // empty newsslider before filling it with new data
        document.getElementById("newsslider").innerHTML = '';

        $XML.find("item").each(function() {
            if(count <= 4){
                var $this = $(this),
                    item = {
                        title:       $this.find("title").text(),
                        description: $this.find("description").text()
                    };            
                    $('#newsslider').append('<div class="slide"><p><strong>' + item.title + '</strong><hr style="margin:-0.25em!important; visibility: hidden;" />' + item.description + '</p></div>');
            }
            count++;
        });
    });

}