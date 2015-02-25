
var operations = ['add', 'subtract', 'multiply', 'divide'];
var highestNumber = 10000;
var randomOperator, num1, num2,result;
var isDivision = false;
var score = 0;

function buildFormula()
{
	num1 = Math.floor((Math.random() * highestNumber) + 1);
	num2 = Math.floor((Math.random() * num1) + 1);
	randomOperator = operations[(Math.floor((Math.random() * operations.length) + 1))];
	buildQuiz();
}

function buildQuiz()
{
	switch(randomOperator)
	{
		case 'add':
			result = num1 + num2;	
			buildLayout('+');
		break;
		case 'subtract':			
			result = num1 - num2;	
			buildLayout('-');
		break;
		case 'multiply':
			result = num1 * num2;	
			buildLayout('x');
		break;
		case 'divide':
			result = Math.round(parseFloat(num1 / num2) * 100) / 100;	
			buildLayout('/');
		break;
	}
}
function buildLayout(operator){
	isDivision = false;
	var html = '<ul class="list-group"><li class="list-group-item">';
	if(operator == '/'){
		html += '<div class="row"><div class="col-md-5 well well-lg formulaText">' + num1 + '</div><div class="col-md-2 well well-lg formulaText">' + operator  + '</div><div class="col-md-5 well well-lg formulaText">' +  num2 +'</div></div>';
		html+= '<div class="row"><div class="col-md-12">Round to two decimal places.</div></div>';
		$('#formula').html(html);
		isDivision = true;
	}
	else{
		html +='<div class="row"><div class="col-md-5 well well-lg formulaText">' + num1 + '</div><div class="col-md-2 well well-lg formulaText">' + operator  + '</div><div class="col-md-5 well well-lg formulaText">' +  num2 +'<div></div>'
		$('#formula').html(html);
	}
	html = '</li></ul>';
}
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
function checkAnswer(e){
	var userSubmittedValue = $('#result').val();
	$('#btnSubmit').hide();
	
	if(isDivision){
		userSubmittedValue = Math.round(parseFloat(userSubmittedValue) * 100) / 100;
	}
	else{
		userSubmittedValue = parseInt(userSubmittedValue);
	}
	
	if(result == userSubmittedValue){
		score = score + 1;		
		socket.emit('UpdateScore', score);
	}
	else{
		score = score - 1;
		socket.emit('UpdateScore', score);
	}
	$('#result').val('')
	$('#score').html(score);
}