//hard code values for filters to test
var ageValue = localStorage.getItem("ageValue");
console.log(ageValue);
var metValue = localStorage.getItem("metValue");
console.log(metValue);
var kidsValue = localStorage.getItem("kidsValue");
console.log(kidsValue);
var edValue = localStorage.getItem("edValue");
console.log(edValue);
var raceValue = localStorage.getItem("raceValue");
console.log(raceValue);
var sexValue = localStorage.getItem("sexValue");
console.log("sexValue");

  //define function to filter based on how met response
function selectMet(features) {
    return features.how_met === metValue;
  }

//define function to filter based on race response
function selectRace(features){
    return features.race_gap === raceValue;
}
//define function to filter based on sexual orientation
function selectSexuality(features){
    return features.same_sex_couple === sexValue;
}

//code to get data from database
d3.json("http://127.0.0.1:5000/data").then(function(data){
    //filter data based on criteria above
        //var filterMet = selectMet(data);
   //filter data on age
    var ageResult = data.filter(function(a){
     return a.age_difference_bin == ageValue;
    });
    console.log(ageResult);
    //filter data on education gap
    var edResult = ageResult.filter(function(b){
        return b.edu_gap_bin == edValue;
    });
    console.log(edResult);
    //filter data on number of kids
    var kidsResult = edResult.filter(function(c){
        return c.children_in_hh == kidsValue;
    });
    console.log(kidsResult);
    //filter data on same sex couple
    var sexResult = kidsResult.filter(function(d){
        return d.same_sex_couple == sexValue;
    });
    console.log(sexResult);
    //filter data on how met
    var metResult = sexResult.filter(function(e){
        return e.how_met_unique == metValue;
    });
    console.log(metResult);

    //get unique values to build x axis
    var distinct = []

    function getUniqueValues(array, key){
        return array.reduce(function(carry, item){
            if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
            return carry;
        }, []);
    }

    distinct = getUniqueValues(metResult, "relationship_len");
    
    /* for (var i = 0; i<metResult.length; i++){
        if (!(metResult[i].relationship_len in distinct)){
            distinct.push(metResult[i].relationship_len)
        }
    }; */
    console.log(distinct);
    console.log(distinct.length);
    //get counts for y axis
    // empty counters declared
    var counts = []
    var num = 0
    
    //**this is where things are screwing up */
    //iterate through distinct values
    for (var y = 0; y < distinct.length; y++){
        //compare distinct value to each value in the filtered array of objects
        for (var z = 0; z<metResult.length; z++){
            if (distinct[y] === metResult[z].relationship_len){
                num = num + 1;
            }
        }
        //add final count to array
        counts.push(num);
        //reset value counter
        num = 0;
    }
    console.log(counts);
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
    var banana = document.getElementById("resultDiv");
    //**getting error that Plotly is undefined */
    Plotly.newPlot(banana, plotting);

});

    //get unique values to build x axis
/*     var distinct = []
    for (var i = 0; i<filterSex.length; i++){
        if (!(filterSex[i].how_long_relationship in distinct)){
            distinct.push(filterSex[i].how_long_relationship)
        }
    };
    console.log(distinct);
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
    Plotly.newPlot("resultDiv", plotting);
    }; */

