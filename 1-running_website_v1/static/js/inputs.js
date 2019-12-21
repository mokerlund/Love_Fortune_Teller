console.log("ready");
//remove local storage to start with clean slate
localStorage.removeItem("metValue");
localStorage.removeItem("ageValue");
localStorage.removeItem("edValue");
localStorage.removeItem("kidsValue");
localStorage.removeItem("raceValue");
localStorage.removeItem("sexValue");

console.log("clean slate");
//getting the selected elements from the website
// Submit Button handler
var button = d3.select("#btn2")
button.on("click", function() {
        
        // Select the input values from the form and store as a variable
        //ids should be howMet, ageGap, kids
        console.log("clicked!");
        
        var howMet= $("#met").val();
        localStorage.setItem("metValue", howMet);
        console.log(howMet);
    
        var ageGap = $("#age").val();
        localStorage.setItem("ageValue", ageGap);
        console.log(ageGap);

        var kids = $("#kids").val();
        localStorage.setItem("kidsValue", kids);
        console.log(kids);

        var education = $("#education").val();
        localStorage.setItem("edValue", education);
        console.log(education);

        var race = $("#race").val();
        localStorage.setItem("raceValue", race);
        console.log(race);

        var sexuality = $("#sexuality").val();
        localStorage.setItem("sexValue", sexuality);
        console.log(sexuality);

        var test = localStorage.getItem("ageValue");
        console.log(test);
        });
    
    /* localStorage.userInputs.push({
        metValue: metValue,
        ageValue: ageValue,
        kidsValue: kidsValue,
        edValue: edValue,
        raceValue: raceValue,
        sexValue: sexValue */
