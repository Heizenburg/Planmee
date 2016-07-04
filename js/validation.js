//validation 

$(function(){
  $("#register").validate({
    rules: {
      email:{
        require: true,
        email: true
      }
    },
    messages:{
      email:{
        require: 'Please enter an email address.',
        email: 'Please enter a <em>valid<em> email address.'
      }
    },
  });
});
