$(document).ready(function() {
	var nextIsClicked = false;
	$('#next-btn').on('click', function() {
		if (nextIsClicked)
			return;
		else
			nextIsClicked = true;

		$('.row').fadeTo("fast", 0.01, function() {
			var url1 = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
			$.getJSON(url1, function(json) {
				$('.card-block p span').html(json["quoteText"]);
				if (json["quoteAuthor"] !== "")
					var quoteAuthor = json["quoteAuthor"]
				else
					var quoteAuthor = "Anonymous";
				$('.card-footer p').html(quoteAuthor);
				$('#tweet-btn')
					.attr('href', 'https://twitter.com/intent/tweet?hashtags=Quotes%2CFrases&text='
					+ encodeURIComponent('"' + json["quoteText"].trim() 
					+ '" -' + quoteAuthor));
				setTimeout(function() {
					$('.row').fadeTo("slow", 1);
				}, 200);
				nextIsClicked = false;
			});

		});
		var cardContent = $('.card-block p span').html();

		$('body').css("background-color", getRandomColor());
		setTimeout(function() {
			if (cardContent == $('.card-block p span').html()) {
				$('#next-btn').click();
			}

		}, 3000);
	});
	$('#next-btn').click();
});

function getRandomColor() {
	var colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"];
	return colors[Math.floor(Math.random() * colors.length)]
}