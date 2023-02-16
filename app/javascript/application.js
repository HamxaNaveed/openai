// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import "@hotwired/turbo-rails"
import "controllers"
import jquery from 'jquery'
window.jQuery = jquery
window.$ = jquery

import 'bootstrap'
import "@fortawesome/fontawesome-free";
$(document).ready(function() {
  console.log("ok");
  $('#submit-btn').click(function() {
    console.log("ok");
    var prompt = $('#prompt').val();
    if (prompt == "") {
      $('#completion').text("Please enter your question...");
    }
    else{
      console.log(prompt);
      $.ajax({
        url: '/home/generate_completion',
        method: 'POST',
        data: { prompt: prompt },
        success: function(response) {
          console.log(response[0].text);
          $('#completion').text(response[0].text);
          $('#prompt').val("");
          localStorage.setItem("previousQuestions",response[0].text);
        }
      });
    }
  });
});
