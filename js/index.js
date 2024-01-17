$(document).ready( function() {


})

$("#subNow").click( function() {

	console.log($("#phone").val());
	if($("#phone").val()) {
		window.location.href="SMS.html";
	}
	else{
		alert("Continue with the Gmail.");
	}
})