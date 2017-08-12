var Canvas=document.querySelector('canvas');
Canvas.width=window.innerWidth;
Canvas.height=window.innerHeight-300;
w=innerWidth;
h=Canvas.height;
var c= Canvas.getContext('2d');
var start=w/2-300;
var l;
var incorrectstart=180;




var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $timeout) {
    $scope.demo= "John";

    var words=["rat", "cat", "bat", 'mat','fun','happy','sad','nostalgic','angry'];
    $scope.incorrectLetters=[];
    $scope.correctLetters=[];
    $scope.guesses=6;
    $scope.displayWord='';
    $scope.input={
    	letter:''
    }

    var selectRandomWord=function(){
    	var index=Math.round(Math.random()*words.length)
    	return words[index];
    }

    var newGame = function(){
    	$scope.incorrectLetters=[];
	    $scope.correctLetters=[];
	    $scope.guesses=6;
	    $scope.displayWord='';
	    c.clearRect(200,200, 400,400);
	    c.clearRect(500,200, 1000,400);
	    selectedWord=selectRandomWord();
	    c.fillStyle='#979493';
		c.fillRect(start,50,600,50);
		c.moveTo(250,200);
		c.lineTo(250,350);
		c.lineTo(350,350);
		c.lineTo(350,200);
		c.stroke();

	    
	    var tempdisplayWord='';
	    for(var i=0;i<selectedWord.length;i++)
	    {
	    	tempdisplayWord+='*';
	    }
	    $scope.displayWord=tempdisplayWord;
	    c.font="40px Arial";
	    c.fillText("You Have to Guess: "+ $scope.displayWord,500,300);

    }
    $scope.letterChosen = function(){
    	//check if letter was already used before
		for(var i=0;i<$scope.correctLetters.length;i++)
		{
			if($scope.correctLetters[i].toLowerCase()==$scope.input.letter.toLowerCase())
			{
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLetters.length;i++)
		{
			if($scope.incorrectLetters[i].toLowerCase()==$scope.input.letter.toLowerCase())
			{
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for(var i=0;i<selectedWord.length;i++)
		{
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase())
			{
				$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
				correct=true;
			}
		}
		if(correct)
		{
			$scope.correctLetters.push($scope.input.letter.toLowerCase());
			c.clearRect(500,200, 1000,400);
			c.font="40px Arial";
	    	c.fillText("You Have to Guess: "+ $scope.displayWord,500,300);
		}
		else
		{

			$scope.incorrectLetters.push($scope.input.letter.toLowerCase());
			$scope.guesses-=1;
			l=start+$scope.guesses*100+100;
			c.font="30px Arial";
			c.fillText($scope.input.letter,290,220+(25*($scope.guesses)));
			c.moveTo(289,220+(25*($scope.guesses))-10);
			c.lineTo(310,220+(25*($scope.guesses))-10);
			c.stroke();

			animate()


		}
		$scope.input.letter="";
		if($scope.guesses==0)
		{
			$timeout(function(){
				newGame();
			},1000);
			
		}
		if($scope.displayWord.indexOf("*")==-1)
		{
			$timeout(function(){
				newGame();
			},1000);

		}

		function animate()
		{
			requestAnimationFrame(animate);

			c.fillStyle='#ffcccc';
			c.fillRect(l-2,50,2,50);
			if(l>start+$scope.guesses*100 && l<start+603)
			{
				l-=2;
			}
			c.fillStyle='#000000';
			c.font="30px Arial";
			if($scope.guesses<6)
			{
				c.fillText($scope.guesses,start+$scope.guesses*100+45,85);
			}

			

		}



    }
    newGame();

});



