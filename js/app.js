$(function() {

  $('.cta').click(function(){
    $('.overlay').addClass('is-open');
    return false;
  });

  $('.close-btn').click(function(){
    $('.overlay').removeClass('is-open')
  });

});


function isEmpty(s) {
  if (s == null || s.length == 0)
    return true;
  return !/\S/.test(s);
}
function looksLikeEmail(field) {
  var s = field.value;
  if (isEmpty(s)) {
     return reportError(field, "Email may not be empty");
   }

  if (/[^@]+@\w+/.test(s))
       return "";

  return reportError(field, "E-mail not in valid form.");
}
function isInteger(field) {
  var s = field.value;
  if (isEmpty(s)) {
     return reportError(field, "Field cannot be empty");
   }
  if (!(/^-?\d+$/.test(s))) {
     return reportError(field, "Field must contain only digits");
   }
 return "";
}

function reportError(field, defaultMessage) {
    var errorMessage;
    if (field.dataset["errormessage"]) {
        errorMessage = field.dataset["errormessage"];
    }
    else {
        errorMessage = defaultMessage;
    }

    field.focus();
    return errorMessage;
}

function validate() {
  var i;
  var valid = true;

  var elements = document.myform.getElementsByTagName("input");
  for ( i = 0; i < elements.length; i++ ) {
      var error = "";
      var element = elements[i];
      if (element.dataset["required"]) {
          if (isEmpty(element.value)) {
              error = reportError(element, "Field may not be empty");
          }
      }
      else if (element.dataset["format"] == "email") {
          error = looksLikeEmail(element);
      }
      else if (element.dataset["format"] == "number") {
          error = isInteger(element);
      }

      if (error != ""){
        valid = false;
        if (document.getElementById(element.name + "-error")) {
            document.getElementById(element.name + "-error").innerHTML = error;
        }
      }
      else{
        if (document.getElementById(element.name + "-error")) {
            document.getElementById(element.name + "-error").innerHTML = "";
        }
      }
  }

  if (!valid) {
      return false;
  }
  else
      return true;
}


window.onload = function(){
    document.getElementById("myform").onsubmit = validate;
};


//Notification upon success
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
Notification.requestPermission().then(function(result) {
  console.log(result);
});function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
}
