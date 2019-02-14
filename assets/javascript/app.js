// project 1!



var url = 'http://api.petfinder.com/';

var full_breeds = [];
var zip = 0;
var size_choice = "";
var energy_choice = "";
var my_breeds = [];
var checks = 0;

var characteristicChecks = ["#size_check", "#energy_check", "#training_check", "#grooming_check", "#vocality_check"];

var small_dogs = [0, 17, 18, 23, 29, 40, 42, 48, 51, 59, 61, 62, 74, 78, 91, 119, 130, 132, 144, 147, 148, 149, 150, 155, 156, 157, 158, 166, 169, 170, 174, 175, 177, 186, 188, 191, 195, 205, 208, 209, 214, 215, 218, 222, 236, 237, 239, 240, 245, 246, 250, 256];
var medium_dogs = [1, 2, 7, 11, 14, 19, 20, 21, 39, 45, 47, 52, 54, 67, 70, 76, 77, 83, 84, 90, 95, 97, 98, 102, 104, 110, 118, 123, 124, 127, 136, 137, 154, 167, 168, 171, 178, 180, 181, 183, 185, 189, 192, 194, 206, 211, 217, 219, 225, 228, 231, 232, 244, 247, 248, 252, 254];
var large_dogs = [5, 8, 10, 16, 22, 25, 26, 27, 30, 34, 36, 43, 44, 46, 49, 60, 64, 66, 68, 71, 75, 79, 85, 86, 87, 88, 92, 99, 105, 106, 108, 109, 111, 112, 116, 126, 128, 140, 143, 172, 187, 196, 198, 202, 203, 226, 241, 242, 243];
var xl_dogs = [4, 12, 28, 37, 41, 50, 53, 81, 113, 114, 115, 129, 141, 146, 152, 163, 165, 173, 199, 201, 207, 235];

var low_energy = [50, 66, 83, 91, 114, 129, 152, 177];
var moderate_energy = [1, 4, 5, 7, 10, 12, 17, 19, 20, 23, 28, 30, 33, 34, 36, 37, 40, 41, 42, 43, 46, 52, 53, 54, 59, 60, 62, 64, 68, 70, 71, 75, 78, 81, 84, 85, 90, 95, 98, 99, 102, 105, 109, 110, 111, 113, 115, 116, 123, 127, 132, 136, 137, 140, 141, 146, 147, 158, 163, 165, 172, 173, 178, 181, 183, 187, 191, 196, 198, 199, 201, 202, 203, 207, 208, 209, 211, 214, 215, 216, 217, 219, 226, 228, 231, 235, 236, 237, 242, 244, 245, 247, 248, 254];
var high_energy = [0, 2, 8, 11, 14, 18, 21, 22, 25, 26, 27, 29, 39, 44, 45, 47, 48, 49, 51, 61, 67, 74, 76, 77, 79, 86, 87, 88, 92, 97, 104, 106, 108, 112, 118, 119, 124, 126, 128, 130, 143, 144, 148, 149, 150, 154, 155, 156, 157, 166, 167, 168, 169, 170, 171, 174, 175, 180, 185, 186, 188, 189, 192, 194, 195, 205, 206, 218, 222, 225, 232, 239, 240, 241, 243, 246, 250, 252, 256];
// Within $.ajax{...} is where we fill out our query 

$.ajax({
    url: url + 'breed.list',
    jsonp: "callback",
    dataType: "jsonp",
    data: {
        key: '136945eb0dffcf53d2e578286bb0ed92',
        animal: 'dog',
        //size: 'S',
        //'location': zip,
        //output: 'basic',
        format: 'json'
    }, success: function (response) {
        //console.log(response.petfinder.breeds.breed);
        var breeds_list = response.petfinder.breeds.breed;
        for (var i = 0; i < breeds_list.length; i++) {
            full_breeds.push(breeds_list[i].$t);
        }

        new_array(low_energy, "low_en_breeds");


        console.log(full_breeds);

        //$("#temp").text(full_breeds);
    }
});


function new_array(my_array, str) {
    var str = [];
    for (var i = 0; i < my_array.length; i++) {
        str.push(full_breeds[my_array[i]]);
    }
    console.log(str);
}

// function find_my_breeds(array1, array2) {
//     for (var i = 0; i < array1.length; i++) {
//         for (var j = 0; j < array2.length; j++) {
//             if (array1[i] === array2[j]) {
//                 my_breeds.push(array1[i]);
//             }
//         }
//     }
// }


function size_checked() {
    if ($("#size_check").prop("checked")) {
        console.log("size was checked");
        checks++;
    } else {
        console.log("size was unchecked");
        checks--;
    }
    checkFor2();
}

function energy_checked() {
    if ($("#energy_check").prop("checked")) {
        console.log("energy was checked");
        checks++;
    } else {
        console.log("energy was unchecked");
        checks--;
    }
    checkFor2();
}

function training_checked() {
    if ($("#training_check").prop("checked")) {
        console.log("training was checked");
        checks++;
    } else {
        console.log("training unchecked");
        checks--;
    }
    checkFor2();
}


function grooming_checked() {
    if ($("#grooming_check").prop("checked")) {
        console.log("grooming was checked");
        checks++;
    } else {
        console.log("grooming unchecked");
        checks--;
    }
    checkFor2();
}

function vocality_checked() {
    if ($("#vocality_check").prop("checked")) {
        console.log("vocality was checked");
        checks++;
    } else {
        console.log("vocality unchecked");
        checks--;
    }
    checkFor2();
}


function checkFor2() {
    if (checks === 2) {
        console.log("2 checked!");
        for (var i = 0; i < characteristicChecks.length; i++) {
            if ($(characteristicChecks[i]).prop("checked") == false) {
                $(characteristicChecks[i]).prop("disabled", true);
            }
        }
    } else {
        for (var i = 0; i < characteristicChecks.length; i++) {
            $(characteristicChecks[i]).prop("disabled", false);
        }
    }
}


$(document).ready(function () {
    $("#submit_search").on("click", function (event) {
        event.preventDefault();
        var search_term = $("#search_term").val();
        window.open("https://dogtime.com/search?q=" + search_term + "&submit=Search");
    });

    $("#SubmitChecked").on("click", function (event) {
        event.preventDefault();
        if (checks !== 2) {
            $("#characteristics").append("<small class='form-text text-muted'>Please select two options.</small>");
        } else {
            $("#characteristics").hide();
            $("#questions").css("visibility", "visible");
            if ($("#size_check").prop("checked") == false) {
                $("#sizeQs").hide();
            }
            if ($("#energy_check").prop("checked") == false) {
                $("#energyQs").hide();
            }
            if ($("#training_check").prop("checked") == false) {
                $("#trainingQs").hide();
            }
            if ($("#grooming_check").prop("checked") == false) {
                $("#groomingQs").hide();
            }
            if ($("#vocality_check").prop("checked") == false) {
                $("#vocalQs").hide();
            }
        }
    });



    $("#Submit").on("click", function (event) {
        zip = $("#zip_code_in").val();
        if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
            return true;
        } else {
            event.preventDefault();
            $("#zipDiv").append("<small class='form-text text-muted'>Please enter a 5 digit zip code.</small>");
        }
        // get_choices();
        // var random_breed_index = Math.floor(Math.random() * my_breeds.length);
        // var random_breed = full_breeds[my_breeds[random_breed_index]];
        // if (energy_choice === "low") {
        //     var random_breed_index = Math.floor(Math.random() * low_energy.length);
        //     var random_breed = full_breeds[low_energy[random_breed_index]];
        // }

        // $.ajax({
        //     url: url + 'pet.getRandom',
        //     jsonp: "callback",
        //     dataType: "jsonp",
        //     data: {
        //         key: '136945eb0dffcf53d2e578286bb0ed92',
        //         animal: 'dog',
        //         size: size_choice,
        //         breed: random_breed,
        //         location: zip,
        //         output: 'basic',
        //         format: 'json'
        //     }, success: function (response) {
        //         console.log(response.petfinder.pet);
        //         //console.log(my_breeds);
        //     }
        // });

    });
});

