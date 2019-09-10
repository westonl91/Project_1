var url = 'http://api.petfinder.com/';


// Initialize Firebase
var config = {
    apiKey: "cn3JYpCuFU3vpey2i1n2A8seh3sG0BqEvVDSy2EIFdLqhWMJeQ",
    authDomain: "project1-a742d.firebaseapp.com",
    databaseURL: "https://project1-a742d.firebaseio.com",
    projectId: "project1-a742d",
    storageBucket: "project1-a742d.appspot.com",
    messagingSenderId: "653571598155"
};
firebase.initializeApp(config);

var database = firebase.database();

var full_breeds = [];
var zip = 0;
var pet_name = "";
var c_item = 1;
var param1 = "";
var param2 = "";
var param1_choice = "";
var param2_choice = "";
var my_breeds = [];
var random_breed_index = 0;
var random_breed = '';
var city = "";
var state = "";

var cities = [];
var states = [];
var petNames = [];

var petIDs = [];
var likesIds = [];

var map_counter = 0;
var petID;
var likesID;


var small_dogs = [0, 17, 18, 23, 29, 40, 42, 48, 51, 59, 61, 62, 74, 78, 91, 119, 130, 132, 144, 147, 148, 149, 150, 155, 156, 157, 158, 166, 169, 170, 174, 175, 177, 186, 188, 191, 195, 205, 208, 209, 214, 215, 218, 222, 236, 237, 239, 240, 245, 246, 250, 256];
var medium_dogs = [1, 2, 7, 11, 14, 19, 20, 21, 39, 45, 47, 52, 54, 67, 70, 76, 77, 83, 84, 90, 95, 97, 98, 102, 104, 110, 118, 123, 124, 127, 136, 137, 154, 167, 168, 171, 178, 180, 181, 183, 185, 189, 192, 194, 206, 211, 217, 219, 225, 228, 231, 232, 244, 247, 248, 252, 254];
var large_dogs = [5, 8, 10, 16, 22, 25, 26, 27, 30, 34, 36, 43, 44, 46, 49, 60, 64, 66, 68, 71, 75, 79, 85, 86, 87, 88, 92, 99, 105, 106, 108, 109, 111, 112, 116, 126, 128, 140, 143, 172, 187, 196, 198, 202, 203, 226, 241, 242, 243];
var xl_dogs = [4, 12, 28, 37, 41, 50, 53, 81, 113, 114, 115, 129, 141, 146, 152, 163, 165, 173, 199, 201, 207, 235];

var low_energy = [50, 66, 83, 91, 114, 129, 152, 177];
var moderate_energy = [1, 4, 5, 7, 10, 12, 17, 19, 20, 23, 28, 30, 33, 34, 36, 37, 40, 41, 42, 43, 46, 52, 53, 54, 59, 60, 62, 64, 68, 70, 71, 75, 78, 81, 84, 85, 90, 95, 98, 99, 102, 105, 109, 110, 111, 113, 115, 116, 123, 127, 132, 136, 137, 140, 141, 146, 147, 158, 163, 165, 172, 173, 178, 181, 183, 187, 191, 196, 198, 199, 201, 202, 203, 207, 208, 209, 211, 214, 215, 216, 217, 219, 226, 228, 231, 235, 236, 237, 242, 244, 245, 247, 248, 254];
var high_energy = [0, 2, 8, 11, 14, 18, 21, 22, 25, 26, 27, 29, 39, 44, 45, 47, 48, 49, 51, 61, 67, 74, 76, 77, 79, 86, 87, 88, 92, 97, 104, 106, 108, 112, 118, 119, 124, 126, 128, 130, 143, 144, 148, 149, 150, 154, 155, 156, 157, 166, 167, 168, 169, 170, 171, 174, 175, 180, 185, 186, 188, 189, 192, 194, 195, 205, 206, 218, 222, 225, 232, 239, 240, 241, 243, 246, 250, 252, 256];

var low_training = [5, 20, 30, 34, 36, 46, 49, 50, 51, 66, 85, 114, 127, 141, 144, 147, 154, 156, 177, 180, 186, 208, 209, 211, 217, 240, 245];
var moderate_training = [0, 1, 2, 4, 8, 11, 12, 17, 18, 19, 21, 23, 33, 37, 41, 42, 43, 44, 48, 53, 60, 61, 62, 64, 67, 68, 71, 75, 76, 77, 78, 81, 83, 86, 87, 88, 91, 92, 98, 102, 104, 106, 108, 109, 110, 112, 113, 116, 118, 123, 126, 129, 130, 132, 136, 137, 140, 148, 149, 150, 152, 155, 158, 163, 165, 166, 168, 169, 170, 172, 173, 175, 181, 183, 188, 189, 191, 192, 196, 198, 199, 201, 202, 203, 205, 206, 207, 215, 216, 218, 219, 226, 228, 231, 235, 236, 237, 241, 242, 244, 247, 248, 252, 254, 256];
var high_training = [7, 10, 14, 16, 22, 25, 26, 27, 28, 29, 39, 40, 45, 47, 52, 54, 59, 70, 74, 79, 84, 90, 95, 97, 99, 105, 111, 115, 119, 124, 128, 143, 146, 157, 167, 171, 174, 178, 185, 187, 194, 195, 214, 222, 225, 232, 239, 243, 246, 250];

var low_grooming = [8, 10, 18, 20, 22, 25, 30, 34, 36, 37, 42, 44, 47, 49, 50, 52, 53, 54, 67, 75, 79, 85, 86, 87, 102, 104, 106, 113, 115, 116, 118, 130, 150, 152, 154, 156, 178, 181, 183, 195, 196, 198, 199, 222, 228, 239, 240, 241, 242, 243, 248];
var moderate_grooming = [4, 5, 7, 11, 12, 14, 16, 17, 19, 26, 27, 28, 33, 39, 40, 41, 45, 51, 59, 60, 61, 64, 66, 68, 71, 76, 77, 78, 81, 83, 84, 88, 91, 92, 95, 98, 99, 105, 108, 109, 110, 111, 112, 114, 119, 123, 126, 128, 129, 132, 136, 140, 141, 143, 149, 155, 158, 163, 165, 166, 167, 168, 169, 170, 171, 173, 174, 175, 180, 186, 188, 191, 201, 202, 203, 205, 207, 208, 211, 215, 217, 218, 219, 225, 226, 231, 232, 235, 236, 244, 252, 254];
var high_grooming = [0, 1, 2, 21, 23, 29, 43, 46, 48, 62, 70, 74, 90, 97, 124, 127, 137, 144, 146, 147, 148, 157, 172, 177, 185, 187, 189, 192, 194, 206, 209, 214, 216, 237, 245, 246, 247, 250, 256];

var low_vocal = [83, 207];
var moderate_vocal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256];
var high_vocal = [0, 2, 4, 7, 8, 10, 11, 12, 14, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 29, 30, 33, 34, 37, 39, 40, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 60, 61, 62, 66, 67, 70, 71, 75, 76, 77, 78, 79, 81, 84, 86, 87, 88, 90, 91, 92, 95, 97, 98, 99, 104, 105, 106, 108, 109, 112, 113, 114, 115, 118, 119, 123, 124, 126, 127, 128, 132, 136, 137, 140, 141, 143, 144, 146, 147, 148, 149, 150, 152, 154, 155, 156, 157, 158, 163, 166, 167, 169, 170, 173, 174, 175, 177, 178, 180, 181, 183, 185, 186, 187, 188, 189, 191, 192, 194, 195, 198, 199, 203, 205, 206, 208, 209, 211, 214, 215, 218, 219, 222, 225, 226, 231, 232, 235, 236, 237, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 250, 252, 254, 256];

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}


function new_array(my_array, str) {
    var str = [];
    for (var i = 0; i < my_array.length; i++) {
        str.push(full_breeds[my_array[i]]);
    }
    console.log(str);
}

function find_my_breeds(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                my_breeds.push(array1[i]);
            }
        }
    }
}

function grab_arrays(p, pc) {

    var chosenArray;

    switch (p) {

        case "size": switch (pc) {
            case "S": chosenArray = small_dogs;
                break;
            case "M": chosenArray = medium_dogs;
                break;
            case "L": chosenArray = large_dogs;
                break;
            case "XL": chosenArray = xl_dogs;
                break;
        }
            break;

        case "energy": switch (pc) {
            case "low": chosenArray = low_energy;
                break;
            case "moderate": chosenArray = moderate_energy;
                break;
            case "high": chosenArray = high_energy;
        }
            break;

        case "training": switch (pc) {
            case "low": chosenArray = low_training;
                break;
            case "moderate": chosenArray = moderate_training;
                break;
            case "high": chosenArray = high_training;
                break;
        }
            break;

        case "grooming": switch (pc) {
            case "low": chosenArray = low_grooming;
                break;
            case "moderate": chosenArray = moderate_grooming;
                break;
            case "high": chosenArray = high_grooming;
                break;
        }
            break;

        case "vocal": switch (pc) {
            case "low": chosenArray = low_vocal;
                break;
            case "moderate": chosenArray = moderate_vocal;
                break;
            case "high": chosenArray = high_vocal;
                break;
        }
            break;
    }

    return chosenArray;
}

function get_choices() {
    param1 = window.location.href.match(/&(\w*)/g)[0].match(/(\w+)/g)[0];
    param2 = window.location.href.match(/&(\w*)/g)[1].match(/(\w+)/g)[0];

    param1_choice = $.urlParam(param1);
    param2_choice = $.urlParam(param2);

    var chosenArray1 = grab_arrays(param1, param1_choice);
    var chosenArray2 = grab_arrays(param2, param2_choice);


    find_my_breeds(chosenArray1, chosenArray2);
}

// function displayMap(city, state) {
//     var mapString = "https://maps.googleapis.com/maps/api/staticmap?center=";
//     var mapString_end = '&zoom=14&size=400x400&key=NoneOfYourBusiness';
//     var encoded = encodeURIComponent(city + "," + state);
//     mapString = mapString + encoded + mapString_end;
//     $("#Gmap").attr("src", mapString);
// }

function pick_random() {
    random_breed_index = Math.floor(Math.random() * my_breeds.length);
    random_breed = full_breeds[my_breeds[random_breed_index]];
}

$(document).ready(function () {
    $('.carousel').carousel();

    $("#submit_search").on("click", function (event) {
        event.preventDefault();
        var search_term = $("#search_term").val();
        window.open("https://dogtime.com/search?q=" + search_term + "&submit=Search");
    });

    $.ajax({
        url: url + 'breed.list',
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: '136945eb0dffcf53d2e578286bb0ed92',
            animal: 'dog',
            format: 'json'
        }, success: function (response) {
            var breeds_list = response.petfinder.breeds.breed;
            for (var i = 0; i < breeds_list.length; i++) {
                full_breeds.push(breeds_list[i].$t);
            }

            console.log(full_breeds);

            zip = $.urlParam('zip');
            get_choices();
            for (var i = 0; i < my_breeds.length; i++) {
                $("#yourBreeds").append("<p><strong>" + full_breeds[my_breeds[i]] + "</strong></p>");
            }
            pick_random();
            console.log(my_breeds[random_breed_index]);
            $.ajax({
                url: url + 'pet.getRandom',
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    key: '136945eb0dffcf53d2e578286bb0ed92',
                    animal: 'dog',
                    //size: size_choice,
                    breed: random_breed,
                    location: zip,
                    output: 'basic',
                    format: 'json'
                }, success: function (response) {
                    if (response.petfinder.pet !== undefined) {
                        console.log(response.petfinder.pet, random_breed, random_breed_index);



                        petID = response.petfinder.pet.id.$t;
                        likesID = "#" + petID;
                        petIDs.push(petID);
                        likesIds.push(likesID);
                        $(".heart").on("click", function () {

                            firebase.database().ref(petIDs[0]).once('value').then(function (snapshot) {
                                var likes = 1;

                                if (snapshot.exists()) {
                                    likes = likes + snapshot.val().likes;
                                    // likes++;
                                    database.ref(petIDs[0]).update({
                                        likes: likes

                                    });
                                    // $("#likes1").text("Liked by " + likes + " people!");
                                } else {
                                    database.ref(petIDs[0]).update({
                                        likes: 1
                                    });
                                }

                                $("#likes1").text("Liked by " + likes + " people!");

                            });



                        });



                        if (response.petfinder.pet.media.photos !== undefined) {
                            var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                            $("#pic1").attr('src', pet_image);
                        } else {
                            $("#pic1").attr('src', "./assets/images/Missing-Image_Dog.png");
                        }

                        if (response.petfinder.pet.description.$t !== undefined) {
                            var pet_info = response.petfinder.pet.description.$t;
                            $("#pet_info1").text(pet_info);
                        } else {
                            $("#pet_info1").text("No description available");
                        }
                        pet_name = response.petfinder.pet.name.$t;
                        petNames.push(pet_name);
                        $("#pet_name1").text(pet_name);
                        $("#dogName").text(pet_name);

                        city = response.petfinder.pet.contact.city.$t;
                        state = response.petfinder.pet.contact.state.$t;

                        //displayMap(city, state);
                        cities.push(city);
                        states.push(state);

                        pick_random();
                    } else {
                        console.log(response);
                    }
                    $.ajax({
                        url: url + 'pet.getRandom',
                        jsonp: "callback",
                        dataType: "jsonp",
                        data: {
                            key: '136945eb0dffcf53d2e578286bb0ed92',
                            animal: 'dog',
                            //size: size_choice,
                            breed: random_breed,
                            location: zip,
                            output: 'basic',
                            format: 'json'
                        }, success: function (response) {
                            if (response.petfinder.pet !== undefined) {
                                console.log(response.petfinder.pet, random_breed, random_breed_index);


                                petID = response.petfinder.pet.id.$t;
                                likesID = "#" + petID;
                                petIDs.push(petID);
                                likesIds.push(likesID);

                                var $img = $("<img>");
                                var $petInfo = $("<p class='petInfo'></p>");

                                if (response.petfinder.pet.media.photos !== undefined) {
                                    var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                                    $img.attr('src', pet_image);
                                } else {
                                    $img.attr('src', "./assets/images/Missing-Image_Dog.png")
                                }

                                if (response.petfinder.pet.description.$t !== undefined) {
                                    var pet_info = response.petfinder.pet.description.$t;
                                    $petInfo.text(pet_info);
                                } else {
                                    $petInfo.text("No description available");
                                }

                                pet_name = response.petfinder.pet.name.$t;
                                petNames.push(pet_name);
                                var $carDiv = $("<div class='carousel-item'></div>");
                                $img.attr('class', 'd-block w-100');
                                var $carCap = $("<div class='carousel-caption d-none d-md-block'></div>");
                                var $petName = $("<h3>" + pet_name + "</h3>");
                                var $likesDiv = $("<h5 id=" + petID + "></h5>");
                                var $likeButton = $('<div class="likeButton"><button class="heart"><img src="./assets/images/heart.png"></button></div>');
                                $carCap.append($petName);
                                $carCap.append($likesDiv);
                                $carCap.append($likeButton);
                                $carCap.append($petInfo);
                                $carDiv.append($img);
                                $carDiv.append($carCap);
                                $(".carousel-inner").append($carDiv);






                                city = response.petfinder.pet.contact.city.$t;
                                state = response.petfinder.pet.contact.state.$t;
                                cities.push(city);
                                states.push(state);
                            } else {
                                console.log(response);
                            }
                        }
                    });
                }
            });
        }
    });

    $("#next").on("click", function () {
        map_counter++;

        $(".heart").on("click", function () {
            console.log(petIDs[map_counter], likesIds[map_counter]);
            petID = petIDs[map_counter];
            firebase.database().ref(petID).once('value').then(function (snapshot) {
                var likes = 1;

                if (snapshot.exists()) {
                    likes = likes + snapshot.val().likes;
                    // likes++;
                    database.ref(petID).update({
                        likes: likes

                    });
                    // $("#likes1").text("Liked by " + likes + " people!");
                } else {
                    database.ref(petID).update({
                        likes: 1
                    });
                }

                $(likesIds[map_counter]).text("Liked by " + likes + " people!");

            });
        });


        $("#dogName").text(petNames[map_counter]);
        //displayMap(cities[map_counter], states[map_counter]);
        pick_random();
        $.ajax({
            url: url + 'pet.getRandom',
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                key: '136945eb0dffcf53d2e578286bb0ed92',
                animal: 'dog',
                //size: size_choice,
                breed: random_breed,
                location: zip,
                output: 'basic',
                format: 'json'
            }, success: function (response) {
                if (response.petfinder.pet !== undefined) {
                    console.log(response.petfinder.pet, random_breed, random_breed_index);

                    var $img = $("<img>");
                    var $petInfo = $("<p class='petInfo'></p>");

                    petID = response.petfinder.pet.id.$t;
                    likesID = "#" + petID;

                    if (response.petfinder.pet.media.photos !== undefined) {
                        var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                        $img.attr('src', pet_image);
                    } else {
                        $img.attr('src', "./assets/images/Missing-Image_Dog.png")
                    }

                    if (response.petfinder.pet.description.$t !== undefined) {
                        var pet_info = response.petfinder.pet.description.$t;
                        $petInfo.text(pet_info);
                    } else {
                        $petInfo.text("No description available");
                    }

                    pet_name = response.petfinder.pet.name.$t;
                    petNames.push(pet_name);
                    var $carDiv = $("<div class='carousel-item'></div>");
                    $img.attr('class', 'd-block w-100');
                    var $carCap = $("<div class='carousel-caption d-none d-md-block'></div>");
                    var $petName = $("<h3>" + pet_name + "</h3>");
                    var $likesDiv = $("<h5 id=" + petID + "></h5>");
                    var $likeButton = $('<div class="likeButton"><button class="heart"><img src="./assets/images/heart.png"></button></div>');
                    $carCap.append($petName);
                    $carCap.append($likesDiv);
                    $carCap.append($likeButton);
                    $carCap.append($petInfo);
                    $carDiv.append($img);
                    $carDiv.append($carCap);
                    $(".carousel-inner").append($carDiv);

                    city = response.petfinder.pet.contact.city.$t;
                    state = response.petfinder.pet.contact.state.$t;
                    cities.push(city);
                    states.push(state);

                    petIDs.push(petID);
                    likesIds.push(likesID);
                } else {
                    console.log(response);
                }
            }
        });
    });



    $("#prev").on("click", function () {
        map_counter--;
        $("#dogName").text(petNames[map_counter]);
        //displayMap(cities[map_counter], states[map_counter]);
    });

});

