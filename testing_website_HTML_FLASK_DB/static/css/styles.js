// var tooltipTimeout;

// $(".infotab").hover(function()
//                     {tooltipTimeout = setTimeout(showTooltip, 200);}, 
//                     hideTooltip);

// function showTooltip()
//     {
//     var tooltip = $("<div id='tooltip' class='tooltip'>I'm the tooltip!</div>");
//     tooltip.appendTo($(".infotab"));
//     }

// function hideTooltip()
//     {
//     clearTimeout(tooltipTimeout);
//     $("#tooltip").fadeOut().remove();
//     }

$(function () {
    $('.example-popover').popover({
      container: 'body'
    })
  })