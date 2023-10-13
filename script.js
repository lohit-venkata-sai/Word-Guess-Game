let inp1,inp2,inp3;
const correct=['','',''];
let R_guess=H_score=0;
const counts=[0,0,0];
let warnings = document.getElementById('warnings');
//console.log(correct);
const words ={
    "CAT": "A common household pet.",
    "DOG": "Known as man's best friend.",
    "SUN": "A bright, hot ball in the sky.",
    "SEA": "Large body of saltwater.",
    "MAP": "Used for navigation, shows roads and places.",
    "RED": "The color of ripe tomatoes.",
    "SUN": "A source of light and warmth.",
    "SKI": "Winter sport on snow.",
    "ANT": "Tiny insect known for hard work.",
    "CAP": "Worn on the head for protection.",
    "CAR": "Vehicle for transportation.",
    "TEA": "A popular hot beverage.",
    "DOT": "A small round mark or spot.",
    "FOX": "A cunning mammal.",
    "PEN": "Used for writing on paper.",
    "BAT": "Nocturnal flying mammal.",
    "SIP": "To drink in small quantities.",
    "RAT": "A small rodent.",
    "MUG": "A cylindrical-shaped cup.",
    "BEE": "Insect known for producing honey.",
    };
let letters;
var keys = Object.keys(words);
function random(){
    if (keys.length == 0) {
        //console.log("No more words available");
        document.getElementById('hint').textContent='';
        warnings.textContent= 'You guessed all the words';
        warnings.innerHTML += '<br> 🎉🥳 You Won the Game! 🥳🎉 <br> Play Again';
        document.getElementById('badge1').textContent='WON';
        document.getElementById('badge2').textContent='WON';
        document.getElementById('badge3').textContent='WON';
        return;
    }
       let hiddenIndex = Math.trunc(Math.random()*keys.length);
       let hidden_word = keys[hiddenIndex];
       console.log(hidden_word);
       letters = Array.from(hidden_word,a=>a);
       console.log(letters);
       //console.log(Object.keys(words));
       //console.log(Object.values(words));
       keys.splice(hiddenIndex, 1);
       document.getElementById('hint').innerHTML=words[hidden_word];
}
random();
document.getElementById('btn1').addEventListener('click',function(){
        inp1 = document.getElementById('ip1').value;
        inp1 = inp1.toUpperCase();
        checkInput(inp1,counts, 0, 'badge1', correct);
    })
document.getElementById('btn2').addEventListener('click',function(){
        inp2 = document.getElementById('ip2').value;
        inp2 = inp2.toUpperCase();
        checkInput(inp2, counts, 1, 'badge2', correct);
    })
document.getElementById('btn3').addEventListener('click',function(){
        inp3 = document.getElementById('ip3').value;
        inp3 = inp3.toUpperCase();
        checkInput(inp3, counts, 2, 'badge3', correct);
    })
function right_guess()
{
    //console.log('right_guess called');
    if(correct[0] && correct[1] && correct[2])
    {
        warnings.textContent= 'You guessed the right word!';
        warnings.style.backgroundColor ='#A8DF8E';
        R_guess++;
        document.getElementById('Rguess').textContent= R_guess;
        document.getElementById('Next').style.display='block';
        if(R_guess > H_score)
        {
            H_score = R_guess;
            document.getElementById('highscore').textContent= H_score;
        }
        document.getElementById('btn1').disabled = true;
        document.getElementById('btn2').disabled = true;
        document.getElementById('btn3').disabled = true;
        correct[0]=false;
        correct[1]=false;
        correct[2]=false;
        counts[0]=0;
        counts[1]=0;
        counts[2]=0;
    }
}
document.getElementById('restart').addEventListener('click',function(){
    R_guess=0;
    document.getElementById('Rguess').textContent= R_guess;
    clear();
    keys = Object.keys(words);
    random();
});
document.getElementById('Next').addEventListener('click',function(){
    clear();
    random();
});

function clear(){
    inp3 = document.getElementById('ip3').value='';
    inp2 = document.getElementById('ip2').value='';
    inp1 = document.getElementById('ip1').value=''; 

    document.getElementById('btn1').disabled = false;
    document.getElementById('btn2').disabled = false;
    document.getElementById('btn3').disabled = false;

    document.getElementById('badge3').textContent='status';  
    document.getElementById('badge2').textContent='status';  
    document.getElementById('badge1').textContent='status';

    document.getElementById('Next').style.display='';
    warnings.style.backgroundColor ='';
    warnings.style.color ='';
    warnings.textContent= '.....';
}
function lost(){
            document.getElementById('badge1').textContent='lost';
            document.getElementById('badge2').textContent='lost';
            document.getElementById('badge3').textContent='lost';
            warnings.textContent= 'Exceeded your chances!! you lost the game';
            document.getElementById('btn1').disabled = true;
            document.getElementById('btn2').disabled = true;
            document.getElementById('btn3').disabled = true;
            warnings.innerHTML += '<br> Click Play Again';
            document.getElementById('Next').style.display='none';
            warnings.style.backgroundColor ='red';
            warnings.style.color ='white';
            counts[0]= 0;
            counts[1]= 0;
            counts[2]= 0;
            correct[0]= false;
            correct[1]= false;
            correct[2]= false;
            //right_guess();
}

function checkInput(inp, count, letterIndex, badge, correctArr) {
    if (inp == '' || !isNaN(inp)) {
        warnings.textContent = 'null and numbers are not allowed';
        return;
    } 
    else if (count[letterIndex] < 3) 
    {
        warnings.textContent = '.....';
        if (inp === letters[letterIndex]) 
        {
            console.log('yes');
            document.getElementById(badge).textContent = '✅';
            correctArr[letterIndex] = true;
        } 
        else 
        {
            console.log('no');
            document.getElementById(badge).textContent = '❌';
            count[letterIndex]++;
            correctArr[letterIndex] = false;
        }
            right_guess();
    } 
    else if(count[letterIndex]>=3)
    {
        //console.log('just called');
        correctArr[letterIndex] = false;
        lost();
    }
}