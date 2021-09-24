$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on('input', function() {
    this.form[2].value = this.form[2].defaultValue - this.value.length;
    if (this.form[2].value < 0) return this.form[2].style.color = "red";
    else return this.form[2].style.color = "#545149";
    //The this keyword is a reference to the button
  });
});