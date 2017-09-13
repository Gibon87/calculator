(function () {
	//buttons blueprint
	var Button = {
		init: function(width, height){
			this.width = width + "px" || "50px";
			this.height = height +"px" || "50px";
		},
		insert: function(wrapper, classerino, value){
			this.elem = document.createElement('div');
			this.elem.className = classerino;
			this.elem.style.width = this.width;

			this.a = 0;
			this.b = 0;

			this.elem.style.height = this.height;
			this.elem.innerHTML = value;
			this.sign;

			this.clicked = false;
			this.repeated = false;
			this.swapped = false;


			wrapper.appendChild(this.elem);

			if ( !(classerino === "display") && !(classerino === "bottomDisplay") ){
				this.elem.addEventListener('mousedown', this.mouseDown.bind(this));
				this.elem.addEventListener('mouseup', this.mouseUp.bind(this));
				this.elem.addEventListener('mouseout', this.mouseOut.bind(this));
			}

		},
		mouseDown: function(){
			this.elem.classList.toggle("toggle");
		},
		mouseUp: function(){
			this.elem.classList.toggle("toggle");
		},
		mouseOut: function(){
			if (this.elem.classList.contains("toggle")){
				this.elem.classList.toggle("toggle");
			}
		}
	};

	//0-9 buttons override adding passing value functionality
	var NumberButton = Object.create(Button);

	NumberButton.setup = function(wrapper, classerino, index, value){
		this.insert(wrapper, classerino);
		this.elem = document.getElementsByClassName(classerino)[index];
		this.elem.innerHTML = value;
		this.value = value;
		this.msg = "";
		this.bottomMsg = "";
		this.screen = document.getElementsByClassName('display')[0];
		this.bottomScreen = document.getElementsByClassName('bottomDisplay')[0];
		this.elem.addEventListener('click', this.onClick.bind(this));
	}
	NumberButton.onClick = function(){
		if ( this.bottomScreen.innerHTML.length > 25 ) this.bottomScreen.innerHTML = 0;

		if ( !(this.screen.innerHTML.length > 10) ){
			if ( !(this.screen.innerHTML == "0.") && (this.bottomScreen.innerHTML == 0) ) this.bottomMsg = this.value;
			else this.bottomMsg = this.bottomScreen.innerHTML + this.value;
			this.bottomScreen.innerHTML = this.bottomMsg;

			if( !(this.screen.innerHTML == "0.") && (isNaN(this.screen.innerHTML) || Button.repeated || this.screen.innerHTML == 0) ) {
				this.msg = this.value;
				this.screen.innerHTML = this.msg;
				Button.repeated = false;
			} else {
				this.msg = this.screen.innerHTML + this.value;
				this.screen.innerHTML = this.msg;
			}
		}
		Button.disableDot = false;
	}

	//AC, CE, "="
	var FunctionalityButton = Object.create(Button);

	FunctionalityButton.setup = function(wrapper, classerino, label){
		this.insert(wrapper, classerino);
		this.elem = document.getElementsByClassName(classerino)[0];
		this.elem.innerHTML = label;
		this.label = label;
		this.screen = document.getElementsByClassName('display')[0];
		this.bottomScreen = document.getElementsByClassName('bottomDisplay')[0];
		this.elem.addEventListener('click', this.onClick.bind(this));
	}
	FunctionalityButton.onClick = function(){
		if (this.label == "AC"){
			this.screen.innerHTML = 0;
			this.bottomScreen.innerHTML = 0;
			Button.a = 0;
			Button.b = 0;
			Button.sign = null;
			Button.clicked = false;
			Button.swapped = false;
		} else if (this.label == "CE"){
			if (!(this.screen.innerHTML == 0)){
				this.screen.innerHTML = this.screen.innerHTML.slice(0, -1);
				if (this.screen.innerHTML == ""){
					this.screen.innerHTML = 0;
					Button.swapped = false;
				}
			}
			if (!(this.bottomScreen.innerHTML == 0)){
				this.bottomScreen.innerHTML = this.bottomScreen.innerHTML.slice(0, -1);
				if (this.bottomScreen.innerHTML == ""){
					this.bottomcreen.innerHTML = 0;
					Button.swapped = false;
				}
			}
		}
		Button.disableDot = false;

	}
	var EqualButton = Object.create(Button);

	EqualButton.setup = function(wrapper, classerino, label){
		this.insert(wrapper, classerino);
		this.elem = document.getElementsByClassName(classerino)[0];
		this.elem.innerHTML = label;
		this.label = label;
		this.elem.addEventListener('click', this.onClick.bind(this));
		this.screen = document.getElementsByClassName('display')[0];
		this.bottomMsg = "";
		this.bottomScreen = document.getElementsByClassName('bottomDisplay')[0];
		this.result = 0;
	}
	EqualButton.onClick = function(){
		Button.b = Number(this.screen.innerHTML);

		if (Button.swapped) Button.a = (-Button.a);

		if (Button.sign == "+") {
			this.result = Button.a + Button.b;
			this.screen.innerHTML = Math.round(this.result * 1000) / 1000;
		}
		else if (Button.sign == "-") {
			this.result = Button.a - Button.b;
			this.screen.innerHTML = Math.round(this.result * 1000) / 1000;
		}
		else if (Button.sign == "/") {
			this.result = Button.a / Button.b;
			this.screen.innerHTML = Math.round(this.result * 1000) / 1000;
		}
		else if (Button.sign == "*") {
			this.result = Button.a * Button.b;
			this.screen.innerHTML = Math.round(this.result * 1000) / 1000;
		}

		this.bottomMsg = this.bottomScreen.innerHTML + " = " + this.result;
		this.bottomScreen.innerHTML = this.bottomMsg;

		if ( this.bottomScreen.innerHTML.length > 25 ) this.bottomScreen.innerHTML = this.screen.innerHTML;

		Button.sign = null;
		Button.clicked = false;
		Button.a = 0;
		Button.b = 0;
		Button.repeated = true;
		Button.disableDot = true;
	}
	//maths operators, - , + , x , /
	var OperatorButtons = Object.create(Button);

	OperatorButtons.setup = function(wrapper, classerino, label, index){
		this.insert(wrapper, classerino, label);
		this.elem = document.getElementsByClassName(classerino)[index];
		this.label = label;
		this.msg = "";
		this.screen = document.getElementsByClassName('display')[0];
		this.bottomScreen = document.getElementsByClassName('bottomDisplay')[0];
		this.bottomMsg = "";
		this.result = 0;
		this.elem.addEventListener('click', this.onClick.bind(this));
	}
	OperatorButtons.onClick = function(){

		var screen = this.screen.innerHTML;

		if (Button.sign && !isNaN(screen)){
			Button.b = Number(this.screen.innerHTML);

			if (Button.swapped) Button.a = (-Button.a);

			if (Button.sign == "+") {
				this.result = Button.a + Button.b;
			}
			else if (Button.sign == "-") {
				this.result = Button.a - Button.b;
			}
			else if (Button.sign == "/") {
				this.result = Button.a / Button.b;
			}
			else if (Button.sign == "*") {
				this.result = Button.a * Button.b;
			}

			this.screen.innerHTML = this.label;

			this.bottomMsg = this.bottomScreen.innerHTML;
			this.bottomScreen.innerHTML = this.bottomMsg + " " + Button.sign;

			Button.sign = this.label

			this.bottomScreen.innerHTML = this.bottomMsg + " " + Button.sign + " ";

			Button.clicked = false;
			Button.a = this.result;
			Button.b = 0;
			Button.repeated = true;
			Button.swapped = false;

		} else {

			if ((screen != 0 || this.label == "-") && screen != "+" && screen != "-" && screen != "*" && screen != "/"){

				//Button.swapped tells if Button.a is a negative value
				if (this.screen.innerHTML == 0) Button.swapped = true;

				if (this.bottomScreen.innerHTML == 0) this.bottomMsg = this.label;
				else this.bottomMsg = this.bottomScreen.innerHTML + " " + this.label + " ";
				this.bottomScreen.innerHTML = this.bottomMsg;

				Button.sign = this.label;
				Button.a = Number(this.screen.innerHTML);
				Button.clicked = false;

				this.msg = this.label;
				this.screen.innerHTML = this.msg;
			}
		}
	}

	var DotButton = Object.create(Button);

	DotButton.setup = function(wrapper, classerino, index, value){
		this.insert(wrapper, classerino);
		this.elem = document.getElementsByClassName(classerino)[index];
		this.elem.innerHTML = value;
		this.value = value;
		this.msg = "";
		this.bottomMsg = "";
		this.screen = document.getElementsByClassName('display')[0];
		this.bottomScreen = document.getElementsByClassName('bottomDisplay')[0];
		this.elem.addEventListener('click', this.onClick.bind(this));
	}

	DotButton.onClick = function(){
		if (!Button.clicked && !Button.disableDot){
			Button.clicked = true;
			this.msg = this.screen.innerHTML + this.value;
			this.screen.innerHTML = this.msg;
			this.bottomMsg = this.bottomScreen.innerHTML + this.value;
			this.bottomScreen.innerHTML = this.bottomMsg;
		}
	}

	window.onload = function(){
		var btns = [];
		var j = 0;

		var wrapper = document.createElement('div');
		wrapper.id = "wrapper";
		wrapper.className += "wrapper";
		document.body.appendChild(wrapper);

		var display = Object.create(Button);
		display.init(230, 40);
		display.insert(wrapper, "display", 0);

		var bottomDisplay = Object.create(Button);
		bottomDisplay.init(230, 30);
		bottomDisplay.insert(wrapper, "bottomDisplay", 0);

		var container = document.createElement('div');
		container.id = "container";
		container.className += "container";
		wrapper.appendChild(container);

		var ac = Object.create(FunctionalityButton);
		ac.init(120, 50);
		ac.setup(container, "allclear", "AC");

		var ce = Object.create(FunctionalityButton);
		ce.init(50, 50);
		ce.setup(container, "clear", "CE");

		var operators = document.createElement('div');
		operators.id = "operators";
		operators.className += "operators";
		wrapper.appendChild(operators);

		var minus = Object.create(OperatorButtons);
		minus.init(50, 50);
		minus.setup(operators, "math", "-", 0);

		var plus = Object.create(OperatorButtons);
		plus.init(50, 50);
		plus.setup(operators, "math", "+", 1);

		var divide = Object.create(OperatorButtons);
		divide.init(50, 50);
		divide.setup(operators, "math", "/", 2);

		var multiply = Object.create(OperatorButtons);
		multiply.init(50, 50);
		multiply.setup(operators, "math", "*", 3);

		var numpad = document.createElement('div');
		numpad.id = "numpad";
		numpad.className += "numpad";
		container.appendChild(numpad);

		for (var i = 9; i>=1; i--){
			btns[i] = Object.create(NumberButton);
			btns[i].init(50, 50);
			btns[i].setup(numpad, "numberClass", j, i);
			j++;
		}

		var cleaner = document.createElement('div');
		cleaner.style.clear = "both";
		cleaner.style.margin = "0px";
		wrapper.appendChild(cleaner);

		var zero = Object.create(NumberButton);
		zero.init(50, 50);
		zero.setup(wrapper, "zero", 0, 0);

		var dot = Object.create(DotButton);
		dot.init(50, 50);
		dot.setup(wrapper, "dot", 0, ".");

		var equal = Object.create(EqualButton);
		equal.init(120, 50);
		equal.setup(wrapper, "equal", "=");
	}
}());
