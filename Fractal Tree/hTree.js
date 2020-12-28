const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

const generateButton = document.querySelector('.generate-tree');
const sliderAngle = document.querySelector('.slider-angle');
const sliderBranch = document.querySelector('.slider-length');
const sliderWidth = document.querySelector('.slider-width');
const sliderAlphaWidth = document.querySelector('.slider-alpha-width');
const colorBranch = document.querySelector('.color-picker1');
const colorLeaf = document.querySelector('.color-picker2');
const blurBranch = document.querySelector('.color-picker3');
const blurLeaf = document.querySelector('.color-picker4');
const sliderBlurRadius = document.querySelector('.slider-blur-radius')
const sliderLeafAngle = document.querySelector('.slider-leaf-angle');
const sliderLeafLength = document.querySelector('.slider-leaf-length');
const toggleLeavesYes = document.querySelector('.leavesYes');
const toggleLeavesNo = document.querySelector('.leavesNo');
const toggleBlurYes = document.querySelector('.blurYes');
const toggleBlurNo = document.querySelector('.blurNo');


const Colors = ['#FF5733', '#FFFF00', '#00FFFF', '#7CFC00', '#C70039', '#FF00FF', '#F4F4F4'];
let toggleLeaves = false,
	toggleBlur = false;

let leafLength = 16,
	leafAngle = Math.floor(Math.random() * 90 + 20),
	blurRadius = 10,
	blurBranchColor = '#FFC300',
	blurLeafColor = '#FFC300';


window.onload = function() {
	canvas.width = innerWidth - 350;
	canvas.height = innerHeight;

	if(toggleLeaves) {
		toggleLeavesYes.classList.add('active');
		toggleLeavesNo.classList.remove('active');
	}

	if(toggleBlur) {
		toggleBlurYes.classList.add('active');
		toggleBlurNo.classList.remove('active');
	}

	drawTree();
}


function drawBranch(startX, startY, len, angle, branchWidth, color1, color2, alphaAngle, alphaWidth) {
	c.beginPath();
	c.save();

	c.strokeStyle = color1;
	c.fillStyle = color2;
	c.lineWidth = branchWidth;
	
	if(toggleBlur) {
		c.shadowBlur = blurRadius;
		c.shadowColor = blurBranchColor;
	}

	c.translate(startX, startY);
	c.rotate(angle * Math.PI / 180);
	c.moveTo(0, 0);
	c.lineTo(0, -len);
	c.stroke();

	if(len < 10) {
		
		if(toggleLeaves) {
			c.beginPath();
			
			if(toggleBlur) {
				c.shadowBlur = 8;
				c.shadowColor = blurLeafColor;
			}
			
			c.arc(0, -len, leafLength, 0, leafAngle * Math.PI / 180);
			c.fill();
		}

		c.restore();
		return;
	}

	drawBranch(0, -len, len * .8, angle + alphaAngle, branchWidth * alphaWidth, color1, color2, alphaAngle, alphaWidth);
	drawBranch(0, -len, len * .8, angle - alphaAngle, branchWidth * alphaWidth, color1, color2, alphaAngle, alphaWidth);

	c.restore();
}


function generateTree() {
	let   len = Math.floor(Math.random() * 60 + 120),
		  angle = 0,
		  width = Math.random() * 16 + 4,
		  c1 = Colors[Math.floor(Math.random() * Colors.length)],
		  c2 = Colors[Math.floor(Math.random() * Colors.length)],
		  alphaAngle = Math.floor(Math.random() * 32 + 2);

	return [len, angle, width, c1, c2, alphaAngle];
}


function drawTree() {

	let   len = Math.floor(Math.random() * 60 + 120),
		  angle = 0,
		  width = Math.random() * 16 + 4,
		  c1 = Colors[Math.floor(Math.random() * Colors.length)],
		  c2 = Colors[Math.floor(Math.random() * Colors.length)],
		  alphaAngle = Math.floor(Math.random() * 32 + 2),
		  alphaWidth = 0.67,
		  root_X = canvas.width / 2,
		  root_Y =  canvas.height - 50;

	sliderAngle.value = alphaAngle;
	sliderBranch.value = len;
	sliderWidth.value = width;
	sliderAlphaWidth.value = alphaWidth * 100;
	colorBranch.value = c1;
	colorLeaf.value = c2;
	sliderBlurRadius.value = blurRadius;
	blurLeaf.value = blurLeafColor;
	blurBranch.value = blurBranchColor;
	sliderLeafAngle.value = leafAngle;
	sliderLeafLength.value = leafLength;


	generateButton.addEventListener('click', () => {
		[len, angle, width, c1, c2, alphaAngle] = generateTree();
		leafAngle = Math.floor(Math.random() * 90 + 20);
		blurBranchColor = '#FFC300';
		blurLeafColor = '#FFC300';

		sliderAngle.value = alphaAngle;
		sliderBranch.value = len;
		sliderWidth.value = width;
		colorBranch.value = c1;
		colorLeaf.value = c2;
		sliderLeafAngle.value = leafAngle;
		blurLeaf.value = blurLeafColor;
		blurBranch.value = blurBranchColor;

		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);	
	})

	window.onresize = function() {
		canvas.width = innerWidth - 350;
		canvas.height = innerHeight;

		root_X = canvas.width / 2;
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);	
	}

	sliderAngle.addEventListener('input', () => {
		alphaAngle = parseInt(sliderAngle.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	sliderBranch.addEventListener('input', () => {
		len = parseInt(sliderBranch.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);

	})

	sliderWidth.addEventListener('input', () => {
		width = parseInt(sliderWidth.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);

	})

	sliderAlphaWidth.addEventListener('input', () => {
		alphaWidth = parseInt(sliderAlphaWidth.value) / 100;
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);

	})

	sliderBlurRadius.addEventListener('input', () => {
		blurRadius = parseInt(sliderBlurRadius.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);

	})

	colorLeaf.addEventListener('change', () => {
		c2 = colorLeaf.value;
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	colorBranch.addEventListener('change', () => {
		c1 = colorBranch.value;
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	blurLeaf.addEventListener('change', () => {
		blurLeafColor = blurLeaf.value;
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	blurBranch.addEventListener('change', () => {
		blurBranchColor = blurBranch.value;
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	toggleLeavesYes.addEventListener('click', () => {
		if(!toggleLeaves) {
			toggleLeaves = !toggleLeaves;
			toggleLeavesYes.classList.add('active');
			toggleLeavesNo.classList.remove('active');
			c.clearRect(0, 0, innerWidth, innerHeight);
			drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
		}
	})

	toggleLeavesNo.addEventListener('click', () => {
		if(toggleLeaves) {
			toggleLeaves = !toggleLeaves;
			toggleLeavesYes.classList.remove('active');
			toggleLeavesNo.classList.add('active');
			c.clearRect(0, 0, innerWidth, innerHeight);
			drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
		}
	})

	toggleBlurYes.addEventListener('click', () => {
		if(!toggleBlur) {
			toggleBlur = !toggleBlur;
			toggleBlurYes.classList.add('active');
			toggleBlurNo.classList.remove('active');
			c.clearRect(0, 0, innerWidth, innerHeight);
			drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
		}
	})

	toggleBlurNo.addEventListener('click', () => {
		if(toggleBlur) {
			toggleBlur = !toggleBlur;
			toggleBlurYes.classList.remove('active');
			toggleBlurNo.classList.add('active');
			c.clearRect(0, 0, innerWidth, innerHeight);
			drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
		} 
	})

	sliderLeafLength.addEventListener('input', () => {
		leafLength = parseInt(sliderLeafLength.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	sliderLeafAngle.addEventListener('input', () => {
		leafAngle = parseInt(sliderLeafAngle.value);
		c.clearRect(0, 0, innerWidth, innerHeight);
		drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
	})

	drawBranch(root_X,  root_Y, len, angle, width, c1, c2, alphaAngle, alphaWidth);
}
