// Calculate palindromic tips and totals

var cost, tip, total;

function isPalindrome(num) {
    var str = num.toFixed(2).toString(10);        // string value base 10, dollar and cents
    str = str.slice(0, -3) + str.slice(-2);       // pull out decimal point character
    var right = str.length - 1; var left = 0
    while (right >= left) {
        if (str.charAt(left) != str.charAt(right))
            return false;
        right--; left++;
    }
    return true;
}

function done() {
    if (tip < (cost / 2)) return false;
    return true;
}

function addSolutionColumn() {
    // add a new solution to the display
    var newtip = "<td align='right'>" + tip.toFixed(2) + "</td>";
    $("#tip").before($(newtip));
    var newtotal = "<td>" + total.toFixed(2) + "</td>";
    $("#total").before($(newtotal));
    var newtopline = "<td>" + cost + "</td>";
    $("#topline").before($(newtopline));
}

function _calculate() {
    var local = 0;
    while (!done()) {
        tip += 0.01;
        $("#tip").text(tip.toFixed(2));
        total = cost + tip
        if (isPalindrome(tip) && isPalindrome(total)) {
            console.log("Solution: Tip = ", tip.toFixed(2), " , total = ", total.toFixed(2));
            addSolutionColumn();
        }
        if (local++ > 7) {
            // run a few times before ceeding back to display
            setTimeout(_calculate, 4);
            return; 
        }
    }

    // Get here when done, just clean up
    $("#tip").remove();
    $("#total").remove();
    $("#topline").remove();
}

function calculate() {
    cost = parseFloat($("#cost").val());

    // For repeated use its easiest just to create the table on demand
    $("#tbl").html("<table><tr> <td> Cost: </td><td id='topline'>" + cost + "</td></tr>" +
                   "<tr> <td> Tip: </td><td id ='tip'/> </tr>" +
                   "<tr> <td> Total: </td><td id='total'>Calculating...</td></tr></table>");
    tip = 0;
    _calculate();
}

$(function() {
    // Initial setup after page load. Callback when cost is entered. NB need to force loss of focus with the enter key
    $("#cost").blur(calculate);
    $("#cost").keyup(function(e) {
        if (e.which == 13) // Enter key
            $(this).blur();
    });
});

