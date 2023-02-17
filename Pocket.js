JQuery = document.createElement("script");
JQuery.setAttribute(
  "src",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
);
document.body.appendChild(JQuery);

setInterval(() => {
  $(function () {
    $(".volume-bar").hover(
      function () {
        $(".main-genericButton-button").hide();
        $(".main-connectPicker-button").hide();
        $("#volume-percentage").show();
      },
      function () {
        $(".main-genericButton-button").show();
        $(".main-connectPicker-button").show();
        $("#volume-percentage").hide();
      }
    );
  });
}, 2000);
if (navigator.userAgent.indexOf("Win") != -1) {
  document.documentElement.style.setProperty("--display", "block");
  document.documentElement.style.setProperty("--controls-display", "block");
  document.documentElement.style.setProperty("--pfppadding", "120px");
}
if (navigator.userAgent.indexOf("Mac") != -1) {
  document.documentElement.style.setProperty("--display", "block");
  document.documentElement.style.setProperty("--left-back", "68px");
  document.documentElement.style.setProperty("--top", "14px");
  document.documentElement.style.setProperty("--left", "11px");
}