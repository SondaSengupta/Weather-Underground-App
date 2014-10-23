document.addEventListener('DOMContentLoaded', function(){


	document.getElementById('submit').addEventListener("click", function(){
		var zipcodeInput = document.forms[0].zipcodeInput.value;
		var url = 'http://api.wunderground.com/api/c435be30cca8cd2e/forecast10day/q/' + zipcodeInput +'.json';
		getJSONP(url, 'forecastFunction');
		var $ul = document.getElementById("dayList");
		$ul.innerHTML = "";
		
	});

	document.getElementById('currentLocation').addEventListener("click", function(){
		navigator.geolocation.getCurrentPosition(positionSuccess, positionFailure);
	});
});

function getJSONP(url, cbName){
	  var $script = document.createElement('script');
	  $script.src = url + '?callback=' + cbName;
	  document.body.appendChild($script);
}

function forecastFunction(data){
	if (data.response.error){
		alert("Invalid Zipcode. Please reinput.");
	} else {
		var weatherData = data.forecast.txt_forecast.forecastday

		for (var i = 0; i < 10; i++){
			var $ul = document.getElementById("dayList");
			var $img = document.createElement('img');
			$img.setAttribute('src', weatherData[i].icon_url);
			$ul.appendChild($img);
			
	 	  	var $li = document.createElement("li");
			$li.innerHTML = weatherData[i].title + " with " + weatherData[i].fcttext;
			$ul.appendChild($li);
			i = i + 1;
		}
		
	}
}  

function positionSuccess(position){
	var latitude = position.coords.latitude
	var longitude = position.coords.longitude
	var url = 'http://api.wunderground.com/api/c435be30cca8cd2e/forecast10day/q/' + latitude + ','+ longitude +'.json';
	getJSONP(url, 'forecastFunction');
	var $ul = document.getElementById("dayList");
	$ul.innerHTML = "";
}

function positionFailure(){
	alert("Unable to recieve location. Please type zipcode instead.");
}
