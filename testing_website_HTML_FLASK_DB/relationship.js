//getting the selected elements from the website
// Submit Button handler

var button = d3.select("#btn btn-primary my-2")
button.on("click", function() {
    // Select the input values from the form and store as a variable
    //ids should be howMet, ageGap, kids
    var howMet = d3.select("#met").text();
    console.log(howMet)
    var ageGap = d3.select("#age").text();
    console.log(ageGap)
    var kids = d3.select("#kids").text();
    console.log(kids)
    var education = d3.select("#education").text();
    console.log(education)
    var race = d3.select("#race").text();
    console.log(race)
    var sexuality = d3.select("sexuality").text();
    console.log(sexuality)

    //redirect to website that shows results
  }
//define function to filter based on how met response
function selectMet(features) {
    return features.how_met === howMet;
  }
//define function to filter based on age gap response
function selectAge(features) {
    return features.age_difference_bin === ageGap;
}
//define function to filter based on education response
function selectEd(features) {
    return features.education === education;
}
//define function to filter based on kids response
function selectKids(features){
    return features.children_in_hh === kids;
}
//define function to filter based on race response
function selectRace(features){
    return features.race === race;
}
//define function to filter based on sexual orientation
function selectSexuality(features){
    return features.same_sex_couple === sexuality;
}

//code to get data from database
function getData(){
    d3.json(endPoint).then(function(data){

    //filter data based on criteria above
    var filterMet = selectMet(data);
    var filterAge = selectAge(filterMet);
    var filterEd = selectEd(filterAge);
    var filterKids = selectKids(filterEd);
    var filterRace = selectRace(filterKids);
    var filterSex = selectSexuality(filterRace);
    //returns filtered dataset
    return filterSex;
    });
    //get unique values to build x axis
    var distinct = []
    for (var i = 0; i<filterSex.length; i++){
        if (!(filterSex[i].how_long_relationship in distinct)){
            distinct.push(filterSex[i].how_long_relationship)
        }
    };
    //get counts for y axis
    // empty counters declared
    var counts = []
    var num = 0
    
    //iterate through distinct values
    for (var a = 0; a < distinct.length; a++){
        //compare distinct value to each value in the filtered array of objects
        for (var b = 0; b<filterSex.length; b++){
            if (distinct[a].how_long_relationship === filterSex[b].how_long_relationship){
                num = num + 1;
            }
            b++  
        }
        //add final count to array
        counts.push(num);
        //reset value counter
        num = 0;
        a++
    }
    //code to plot
    var plotting = [
        {
            //x = relationship length
            x:distinct,
            //y = count of each in relationship length
            y:counts,
            type: "bar"
        }
    ];
    Plotly.newPlot("myDiv", plotting);
    });



//code to customize fortune telling text