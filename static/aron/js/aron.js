/////////////////////////////////// Bootstrap menu/////////////////////////////////////////////////
function darken_screen(yesno) {
  if (yesno == true) {
    document.querySelector(".screen-darken").classList.add("active");
  } else if (yesno == false) {
    document.querySelector(".screen-darken").classList.remove("active");
  }
}

function close_offcanvas() {
  darken_screen(false);
  document.querySelector(".mobile-offcanvas.show").classList.remove("show");
  document.body.classList.remove("offcanvas-active");
}

function show_offcanvas(offcanvas_id) {
  darken_screen(true);
  document.getElementById(offcanvas_id).classList.add("show");
  document.body.classList.add("offcanvas-active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-trigger]").forEach(function (everyelement) {
    let offcanvas_id = everyelement.getAttribute("data-trigger");

    everyelement.addEventListener("click", function (e) {
      e.preventDefault();
      show_offcanvas(offcanvas_id);
    });
  });

  document.querySelectorAll(".btn-close").forEach(function (everybutton) {
    everybutton.addEventListener("click", function (e) {
      e.preventDefault();
      close_offcanvas();
    });
  });

  document
    .querySelector(".screen-darken")
    .addEventListener("click", function (event) {
      close_offcanvas();
    });
});
/////////////////////////////////////////////////// Traders /////////////////////////////////////////////////
$(function () {
  var s1 = $("#slider").sliderRotate({ displayItems: 5 });
  var s2 = $("#slider-2").sliderRotate({ autoSlide: true });
  var s2 = $("#slider-3").sliderRotate({ autoSlide: true });
});

(function ($, window, document, undefined) {
  "use strict";

  var pluginName = "sliderRotate",
    dataKey = "plugin_" + pluginName;

  var SliderRotate = function (element, options) {
    this.plugin_element = $(element);
    this.itemClass;
    this.arrowClass;
    this.$item;
    this.$arrow;
    this.$sliderContainer;
    this.numItens;
    this.indexActive;
    this.displayItens;
    this.autoSlide;
    this.slider_timer;
    this.time;

    this.PREV_CLASS = "slider-rotate__item--prev";
    this.PREV2_CLASS = "slider-rotate__item--prev-2";
    this.NEXT_CLASS = "slider-rotate__item--next";
    this.NEXT2_CLASS = "slider-rotate__item--next-2";
    this.ACTIVE_CLASS = "slider-rotate__item--active";
    this.PREV_CLASS2 = "slider-rotate__item_2--prev";
    this.PREV2_CLASS2 = "slider-rotate__item_2--prev-2";
    this.NEXT_CLASS2 = "slider-rotate__item_2--next";
    this.NEXT2_CLASS2 = "slider-rotate__item_2--next-2";
    this.ACTIVE_CLASS2 = "slider-rotate__item_2--active";

    this.CLASS_DISPLAY_3 = "slider-rotate--3";
    this.CLASS_DISPLAY_5 = "slider-rotate--5";

    this.DISPLAY_3 = 3;
    this.DISPLAY_5 = 5;

    this.SLIDER_CONTAINER = "slider-rotate__container";

    this.options = {
      time: 4,
      autoSlide: false,
      displayItems: 3,
      activate: function () {},
    };

    this.init(options);
  };

  SliderRotate.prototype = {
    init: function (options) {
      _init(options, this);
    },
    destroy: function () {
      this.plugin_element.unbind().removeData();
      $("*", this.plugin_element).unbind().removeData();
      this.$sliderContainer.unbind("mouseenter.slider");
      this.$sliderContainer.unbind("mouseleave.slider");
      _pauseSlide(this); //remove timer
    },
  };

  function _init(__options__, __this__) {
    //---------------------------------
    //---------------------------------
    var opts = __this__.options;
    $.extend(opts, __options__);
    opts.activate.call(__this__);
    //---------------------------------
    //---------------------------------
    __this__.displayItens =
      opts.displayItems == 3 || opts.displayItems == 5
        ? opts.displayItems
        : __this__.DISPLAY_3;
    __this__.itemClass = opts.itemClass || "slider-rotate__item";
    __this__.arrowClass = opts.arrowClass || "js-slider-rotate-arrow";
    __this__.$item = __this__.plugin_element.find("." + __this__.itemClass);
    __this__.$arrow = __this__.plugin_element.find("." + __this__.arrowClass);
    __this__.numItens = __this__.$item.length;
    __this__.indexActive = 0;
    __this__.$sliderContainer = $("." + __this__.SLIDER_CONTAINER);
    __this__.autoSlide = opts.autoSlide;
    __this__.time = opts.time;

    //add class to change layout by 3 or 5 itens
    __this__.plugin_element.addClass(
      __this__.displayItens == __this__.DISPLAY_3
        ? __this__.CLASS_DISPLAY_3
        : __this__.CLASS_DISPLAY_5
    );

    //start items positions
    _moveSlide(__this__.indexActive, __this__);

    //show container to prevent layout issues
    setTimeout(function () {
      __this__.$sliderContainer.css("visibility", "visible");
    }, 400);

    //item mouse event
    __this__.$item.on("click.rotate", function () {
      //prevent click on active item
      if ($(this).hasClass(__this__.ACTIVE_CLASS)) return false;
      if ($(this).hasClass(__this__.ACTIVE_CLASS2)) return false;

      //move slide to the desired index
      _moveSlide($(this).index(), __this__);

      return false;
    });

    //arrow mouse event
    __this__.$arrow.on("click.rotate", function () {
      //action (prev or next)
      var _action = $(this).data("action");

      if (_action == "next") {
        //move slide
        _moveNext(__this__);
      } else if (_action == "prev") {
        //move slide
        _movePrev(__this__);
      }
    });

    if (__this__.autoSlide) {
      _autoSlide(__this__);
    }
  }

  //auto slide
  function _autoSlide(__this__) {
    _pauseSlide(__this__); //	remove timer

    var _miliseconds = Number(__this__.time) * 1000; //	converts to miliseconds
    __this__.slider_timer = setTimeout(function () {
      _moveNext(__this__);
    }, _miliseconds);

    //stop items from auto slide
    __this__.$sliderContainer
      .unbind("mouseenter.slider")
      .on("mouseenter.slider", function () {
        _pauseSlide(__this__); //remove timer
      });

    //back to auto slide
    __this__.$sliderContainer
      .unbind("mouseleave.slider")
      .on("mouseleave.slider", function () {
        _autoSlide(__this__);
      });
  }

  //--------------
  //pause slide
  function _pauseSlide(__this__) {
    clearTimeout(__this__.slider_timer);
  }

  //move slide to the next item
  function _moveNext(__this__) {
    var _index =
      __this__.indexActive == __this__.numItens - 1
        ? 0
        : __this__.indexActive + 1;

    _moveSlide(_index, __this__);
  }

  //move slide to the previous item
  function _movePrev(__this__) {
    var _index =
      __this__.indexActive == 0
        ? __this__.numItens - 1
        : __this__.indexActive - 1;

    _moveSlide(_index, __this__);
  }

  function _moveSlide(__index__, __this__) {
    __this__.indexActive = __index__;

    // removing all classes
    __this__.plugin_element
      .find("." + __this__.ACTIVE_CLASS)
      .removeClass(__this__.ACTIVE_CLASS);
    __this__.plugin_element
      .find("." + __this__.NEXT_CLASS)
      .removeClass(__this__.NEXT_CLASS);
    __this__.plugin_element
      .find("." + __this__.PREV_CLASS)
      .removeClass(__this__.PREV_CLASS);
    __this__.plugin_element
      .find("." + __this__.PREV2_CLASS)
      .removeClass(__this__.PREV2_CLASS);
    __this__.plugin_element
      .find("." + __this__.NEXT2_CLASS)
      .removeClass(__this__.NEXT2_CLASS);
    __this__.plugin_element
      .find("." + __this__.ACTIVE_CLASS2)
      .removeClass(__this__.ACTIVE_CLASS2);
    __this__.plugin_element
      .find("." + __this__.NEXT_CLASS2)
      .removeClass(__this__.NEXT_CLASS2);
    __this__.plugin_element
      .find("." + __this__.PREV_CLASS2)
      .removeClass(__this__.PREV_CLASS2);
    __this__.plugin_element
      .find("." + __this__.PREV2_CLASS2)
      .removeClass(__this__.PREV2_CLASS2);
    __this__.plugin_element
      .find("." + __this__.NEXT2_CLASS2)
      .removeClass(__this__.NEXT2_CLASS2);

    //if active index is the last item
    if (__index__ == __this__.numItens - 1) {
      __this__.$item.eq(0).addClass(__this__.NEXT_CLASS);
      __this__.$item.eq(0).addClass(__this__.NEXT_CLASS2);

      if (__this__.displayItens == __this__.DISPLAY_5) {
        __this__.$item.eq(1).addClass(__this__.NEXT2_CLASS);
        __this__.$item.eq(1).addClass(__this__.NEXT2_CLASS2);
      }
    }

    //if active index is the first item
    if (__index__ == 0) {
      __this__.$item.eq(__this__.numItens - 1).addClass(__this__.PREV_CLASS);
      __this__.$item.eq(__this__.numItens - 1).addClass(__this__.PREV_CLASS2);

      if (__this__.displayItens == __this__.DISPLAY_5) {
        __this__.$item.eq(__this__.numItens - 2).addClass(__this__.PREV2_CLASS);
        __this__.$item
          .eq(__this__.numItens - 2)
          .addClass(__this__.PREV2_CLASS2);
      }
    }

    // loop through all items
    __this__.$item.each(function (index) {
      if (index == __index__) {
        __this__.$item.eq(index).addClass(__this__.ACTIVE_CLASS);
        __this__.$item.eq(index).addClass(__this__.ACTIVE_CLASS2);
      }

      if (index == __index__ + 1) {
        __this__.$item.eq(index).addClass(__this__.NEXT_CLASS);
        __this__.$item.eq(index).addClass(__this__.NEXT_CLASS2);
      }

      if (index == __index__ - 1) {
        __this__.$item.eq(index).addClass(__this__.PREV_CLASS);
        __this__.$item.eq(index).addClass(__this__.PREV_CLASS2);
      }

      //just addClass if display 5 items
      if (__this__.displayItens == __this__.DISPLAY_5) {
        if (index == __index__ + 2) {
          __this__.$item.eq(index).addClass(__this__.NEXT2_CLASS);
          __this__.$item.eq(index).addClass(__this__.NEXT2_CLASS2);
        }

        if (__index__ == __this__.numItens - 2) {
          __this__.$item.eq(0).addClass(__this__.NEXT2_CLASS);
          __this__.$item.eq(0).addClass(__this__.NEXT2_CLASS2);
        }

        if (__index__ - 2 == -1) {
          __this__.$item
            .eq(__this__.numItens - 1)
            .addClass(__this__.PREV2_CLASS)
            .addClass(__this__.PREV2_CLASS2);
        }

        if (index == __index__ - 2) {
          __this__.$item.eq(index).addClass(__this__.PREV2_CLASS);
          __this__.$item.eq(index).addClass(__this__.PREV2_CLASS2);
        }
      }

      if (__this__.autoSlide) {
        _autoSlide(__this__);
      }
    });
  }

  $.fn[pluginName] = function (options) {
    var plugin = this.data(dataKey);

    if (plugin instanceof SliderRotate) {
      if (typeof options !== "undefined") {
        plugin.init(options);
      }
    } else {
      plugin = new SliderRotate(this, options);
      this.data(dataKey, plugin);
    }

    return plugin;
  };
})(jQuery, window, document);

/////////////////////////////////////////////// market /////////////////////////////////////////////////
for (var d in data) {
  var date_labels = [];
  var price_data = [];

  for (var i in data[d].data) {
    date_labels.push(data[d].data[i].time_period_start);
    price_data.push(data[d].data[i].rate_close);
  }

  let borderColor = "rgb(50,205,50)";
  var canvas = document.getElementById(data[d].currency.base);
  var ctx = canvas.getContext("2d");
  var gradient = ctx.createLinearGradient(0, 0, 0, 80);
  gradient.addColorStop(0, "rgb(220, 255, 220)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");

  if (data[d].currency.last_24h < 0) {
    borderColor = "rgb(255, 50, 50)";
    gradient = ctx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, "rgb(255, 220, 220)");
    gradient.addColorStop(1, "rgba(255,255,255,1)");
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: date_labels /* date */,
      responsive: true,
      datasets: [
        {
          borderColor: borderColor,
          backgroundColor: gradient,
          fill: true,
          data: price_data /* price */,
          borderWidth: 1,
        },
      ],
    },
    options: {
      events: [],
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });
}
/////////////////////////////////////// Services /////////////////////////////////////////////////
var $owl = $("#s-list").owlCarousel({
  loop: false,
  dots: true,
  margin: 10,
  nav: false,
  stagePadding: 80,
  responsive: {
    0: {
      items: 1,
    },
    650: {
      items: 3,
    },
    1000: {
      items: 3.4,
    },
    1700: {
      items: 4.5,
    },
  },
});

//////////////////////////////////////////// Options //////////////////////////////////////
var $owl2 = $("#options").owlCarousel({
  loop: false,
  margin: 5,
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
//////////////////////////////////////////// Market overview //////////////////////////////////////
for (var md in data) {
  var date_labels = [];
  var price_data = [];

  for (var i in data[md].data) {
    date_labels.push(data[md].data[i].time_period_start);
    price_data.push(data[md].data[i].rate_close);
  }

  let borderColor = "rgb(50,205,50)";
  var canvas2 = document.getElementById(`${data[md].currency.base}2`);
  var ctx2 = canvas2.getContext("2d");
  var gradient = ctx2.createLinearGradient(0, 0, 0, 80);
  gradient.addColorStop(0, "rgb(220, 255, 220)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");

  if (data[md].currency.last_24h < 0) {
    borderColor = "rgb(255, 50, 50)";
    gradient = ctx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, "rgb(255, 220, 220)");
    gradient.addColorStop(1, "rgba(255,255,255,1)");
  }

  new Chart(ctx2, {
    type: "line",
    data: {
      labels: date_labels /* date */,
      responsive: true,
      datasets: [
        {
          borderColor: borderColor,
          backgroundColor: gradient,
          fill: true,
          data: price_data /* price */,
          borderWidth: 1,
        },
      ],
    },
    options: {
      events: [],
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });
}
var $owl3 = $("#market-overview").owlCarousel({
  loop: false,
  margin: 5,
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
      items: 3,
    },
  },
});
var $owl3 = $("#market-overview-sm").owlCarousel({
  loop: false,
  margin: 0,
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
      items: 3,
    },
  },
});
