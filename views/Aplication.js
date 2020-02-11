function navSlide() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

}

function dropdownButton(element) {
  var dropdown = document.getElementsByClassName("dropdown-button");


  for (var i = 0; i < dropdown.length; i++) {
    element.classList.toggle("active");
    var dropdownContent = element.nextElementSibling.firstChild;
    if (dropdownContent.style.display == "block") {
      setTimeout(function () { dropdownContent.style.display = "none" }, 100);
    } else {
      setTimeout(function () { dropdownContent.style.display = "block" }, 100);
    }
  }


}

function setTimer() {

    var countDownDate = new Date("Jan 18, 2021 00:00:00").getTime();

    var countdownfunction = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(countdownfunction);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function openCaption(){
  var caption = window.open("", "caption", "width=200, height=100");
  caption.document.write("<figcaption> Image downloaded from IconFinder website.</figcaption>");
  setTimeout(function(){caption.close()}, 2000);

  document.getElementById("love").src = "Design/logo5-mini.png";
  setTimeout(function() {   document.getElementById("love").src = "Design/love.png";}, 2000);

  setTimeout(function() {   
    var li = document.createElement("LI")
    localStorage.setItem("message", "Be happy")
    li.innerHTML = localStorage.getItem("message")
    document.getElementById("steps").appendChild(li);

  }, 2000);

  setTimeout(function() {   
    var ol = document.getElementById("steps")
    ol.removeChild(ol.childNodes[4])
  }, 4000);

}

function loadText(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("statistics").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}
window.onload = function () {
  navSlide();
  setTimer();
}


