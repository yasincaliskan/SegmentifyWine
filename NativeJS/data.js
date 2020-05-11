var cardItem = "";
var discount = 0;
var file = 'sample_products.json';
$.getJSON(file, function(data) {

    for(var i=0; i<data.length; i++){
    cardItem += "<div class='item'><div class='addition'>";
    if(data[i].oldPrice){
    cardItem += "<div class='discount'>-"+calculateDiscount(data[i].oldPrice, data[i].price)+"%</div>";
    } 
    if(data[i].params.likeCount){
    cardItem += "<div class='like'><i class='far fa-heart'> "+data[i].params.likeCount+"</i></div>";
    }
    if(data[i].params.isNew){
    cardItem += "<div class='new'><small> NEW </small></div>";
    }
    cardItem += "</div><div class='pad15'>";

    cardItem += "<img src='"+data[i].imageS+"'>";
    // cardItem += "<div style='background:url("+data[i].imageS+") no-repeat;width:200px;height:200px;padding-left:30px;'><i class='far fa-heart'>"+data[i].params.likeCount+"</i></div>";
    cardItem += "<p><b>"+data[i].name+"</b></p>";
    cardItem += "<p>"+data[i].params.rebsorte+"</p>";
    cardItem += "<p><b>"+data[i].priceText+ "</b> <small><del> "+data[i].oldPriceText+"</del></small></p>";
    cardItem += "<p><small>"+data[i].params.basePrice+"</small></p></div></div>";
    }

    cardItem += "</div>";
    $("#items").html(cardItem);
});

function calculateDiscount(oldPrice, newPrice){
    discount = Math.floor((oldPrice - newPrice) / oldPrice * 100);
    return discount;
}




