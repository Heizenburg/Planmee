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
  
    let errorMessage = field.dataset["errormessage"] || defaultMessage;

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


$(function() {

  $('.cta').click(function(){
    $('.overlay').addClass('is-open');
    return false;
  });

  $('.close-btn').click(function(){
    $('.overlay').removeClass('is-open')
  });

});

