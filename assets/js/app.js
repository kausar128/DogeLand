$( document ).ready(function() {
    breedList();
});

function randomDog(){
	$(".random-dog").load("https://dog.ceo/api/breeds/image/random", function(responseTxt, statusTxt, xhr){
	  if(statusTxt == "success")
		this.setAttribute("src", JSON.parse(responseTxt).message);
	  if(statusTxt == "error")
		$("#jackpot .error-message")[0].innerText = JSON.parse(responseTxt).message;
	});
}

function breedList() { 
  $.ajax({url : "https://dog.ceo/api/breeds/list/all", success : function (result) {
	  let listOfBreeds = result.message;
	  $.each(listOfBreeds, function(key, value) {
	    let levelOne = "", levelTwo = "", apiParam ="";
		if(value.length){
			levelOne = $("<a class='level-one list-group-item list-group-item-action'></a>").text(key);
			for(let i=0; i < value.length; i++){
				/*if there are sub-breeds, then the API call uses the breed name like "main-breed/sub-breed". ex. Bulldog/English , Bulldog/Boston, Bulldog/French */
				apiParam = key + "/" + value[i];
				levelTwo = $("<a class='level-two list-group-item list-group-item-action' onclick=\"getImageByBreed('"+apiParam+"')\"></a>").text(value[i]);
				levelOne[0].append(levelTwo[0]);
			}
			$(".all-breeds")[0].append(levelOne[0]);
		}
		else{
			apiParam = key;
			let levelOne = $("<a class='level-one list-group-item list-group-item-action' onclick=\"getImageByBreed('"+apiParam+"')\"></a>").text(key);
			$(".all-breeds")[0].append(levelOne[0]);
		}
	  }); 
  }});
}

function getImageByBreed(breedName){
	let apiURL = "https://dog.ceo/api/breed/" + breedName + "/images/random";
	$(".dog-by-breed").load(apiURL, function(responseTxt, statusTxt, xhr){
	  if(statusTxt == "success")
		this.setAttribute("src", JSON.parse(responseTxt).message);
	  if(statusTxt == "error")
	  $("#breedlist .error-message")[0].innerText = JSON.parse(responseTxt).message;
	});
}