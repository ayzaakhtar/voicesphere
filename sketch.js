let responses = [];
let colors = ['#FF5C5C', '#5CFFB2', '#5C8CFF', '#FFF75C', '#FF5CFF'];
let angle = 0;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(16);
  noStroke();

  button = createButton('🎤 Start Speaking');
  button.position(10, 10);
  button.mousePressed(startRecognition);
}

function draw() {
  background(10);
  rotateY(angle);
  angle += 0.01;

  for (let i = 0; i < responses.length; i++) {
    let theta = TWO_PI * (i / responses.length);
    let x = 200 * cos(theta);
    let y = 200 * sin(theta);
    let z = 100 * sin(frameCount * 0.01 + i);

    push();
    translate(x, y, z);
    fill(colors[i % colors.length]);
    rotateY(-angle); // face viewer
    text(responses[i], 0, 0);
    pop();
  }
}

function startRecognition() {
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('SpeechRecognition not supported in this browser.');
    return;
  }

  let recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript;
    responses.push(transcript);
    if (responses.length > 5) responses.shift();
  };

  recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
  };
}
