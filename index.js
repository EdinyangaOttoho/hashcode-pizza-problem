const file = require("fs");

var input_file = file.readFileSync("input.txt", "utf-8");
var lines = input_file.split("\n");
var params = lines[0].split(" ");

var pizzas = parseInt(params[0]);

var two_people = parseInt(params[1]);

var three_people = parseInt(params[2]);

var four_people = parseInt(params[3]);

function pickunique() {
    var i = 1;
    var result = new Set();
    while (i < pizzas) {
        let a = lines[i].split(" ").slice(1);
        for (let j of a) {
            result.add(j);
        }
        i++;
    }
    var data = [...result];
    var k = 1;
    var best_matches = [];
    for (k = 1; k <= pizzas; k++) {
        let ind = k - 1;
        let a = lines[k].split(" ").slice(1);
        let removal = 0;
        for (let j of a) {
            if (data.length != 0) {
                let p = data.indexOf(j);
                if (p != -1) {
                    data.splice(p, 1);
                    removal++;
                }
            }
            else {
                break;
            }
        }
        best_matches.push([removal, k - 1]);
    }
    var final = best_matches.sort(function(a, b) {
        return b[0] - a[0];
    });
    var final_answer = final.map(function(x) {
        return x[1];
    });
    return final_answer;
}

var pizzas_list = pickunique();

let vals = [two_people, three_people, four_people];
let sorted = vals.sort(function(a, b) {
	return b - a;
});

var two = [];
var three = [];
var four = [];

var lastindex = 0;

let i = 1;

for (let m in pizzas_list) {
    i++;
    if (i == 2) {
        if (lastindex + 2 <= pizzas_list.length) {
            two.push(pizzas_list.slice(lastindex, lastindex + 2));
            lastindex +=2;
        }    
    }
    else if (i == 3) {
        if (lastindex + 3 <= pizzas_list.length) {
            three.push(pizzas_list.slice(lastindex, lastindex + 3));
            lastindex +=3;
        }    
    }
    else if (i == 4) {
        if (lastindex + 4 <= pizzas_list.length) {
            four.push(pizzas_list.slice(lastindex, lastindex + 4));
            lastindex +=4;
        }
    }
    if (i == 4) {
        i = 1;
    }
}

max_value = sorted[0];

output = [];

total_teams = 0;

for (let i = 0; i < max_value; i++){
    //Two people
    if (i < two_people && two[i] != undefined) {
        if ((pizzas - 2) >= 0 && two.length >= 1) {
            output.push("2 " + two[i].join(" "));
            two.splice(i, 1);
            total_teams = total_teams + 1;
            pizzas = pizzas - 2;
        }
    }    
    //Three people
    if (i < three_people && three[i] != undefined) {
        if ((pizzas - 3) >= 0 && three.length >= 1) {
            output.push("3 " + three[i].join(" "));
            three.splice(i, 1);
            total_teams = total_teams + 1;
            pizzas = pizzas - 3;
        }
    }
    //Four people
    if (i < four_people && four[i] != undefined) {
        if ((pizzas - 4) >= 0 && four.length >= 1) {
            output.push("4 " + four[i].join(" "));
            four.splice(i, 1);
            total_teams = total_teams + 1;
            pizzas = pizzas - 4;
        }
    }
}
file.writeFileSync("output.txt", total_teams+"\n"+output.join("\n"));
