function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("range");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " w3-border-red";
  }
var $owl = $("#s-list").owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  stagePadding: 50,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});
var $owl = $("#options").owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  stagePadding: 50,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
});
// $(".scroll").mCustomScrollbar({
//   axis: "x",
//   theme: "dark",
//   mouseWheel: {
//     enable: true,
//   },
// });
// $(".mCSB_dragger").on("click", function () {
//   $("#s-list").mCustomScrollbar("scrollTo", "+=350");
// });
// $(".scroll").width($(".owl-stage").width());
// $(window).resize(function () {
//   $(".scroll").width($(".owl-stage").width());
// });
