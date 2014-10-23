document.addEventListener('DOMContentLoaded', function(){


	document.getElementById('submit').addEventListener("click", function(){
		var url = 'http://api.wunderground.com/api/c435be30cca8cd2e/forecast10day/q/37217.json';
		getJSONP(url, 'forecastFunction');


		
	});
});

function getJSONP(url, cbName){
	  var $script = document.createElement('script');
	  $script.src = url + '?callback=' + cbName;
	  document.body.appendChild($script);
}

function forecastFunction(data){
	var weatherData = data.forecast.txt_forecast.forecastday
	for (var i = 0; i < 10; i++){
		var $ul = document.getElementById("itemColumn");
		var $img = document.createElement('img');
		$img.setAttribute('src', weatherData[i].icon_url);
		$ul.appendChild($img);
		
 	  	var $li = document.createElement("li");
		$li.innerHTML = weatherData[i].title + " with " + weatherData[i].fcttext
		$ul.appendChild($li);
		i = i + 1
	}
	
}   	


