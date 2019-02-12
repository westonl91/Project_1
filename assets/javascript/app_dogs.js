var url = '//api.petfinder.com/';

var full_breeds = [];
var zip = 0;
var size_choice = "";
var energy_choice = "";
var my_breeds = [];
var random_breed_index = 0;
var random_breed = '';

var small_dogs = [0, 17, 18, 23, 29, 40, 42, 48, 51, 59, 61, 62, 74, 78, 91, 119, 130, 132, 144, 147, 148, 149, 150, 155, 156, 157, 158, 166, 169, 170, 174, 175, 177, 186, 188, 191, 195, 205, 208, 209, 214, 215, 218, 222, 236, 237, 239, 240, 245, 246, 250, 256];
var medium_dogs = [1, 2, 7, 11, 14, 19, 20, 21, 39, 45, 47, 52, 54, 67, 70, 76, 77, 83, 84, 90, 95, 97, 98, 102, 104, 110, 118, 123, 124, 127, 136, 137, 154, 167, 168, 171, 178, 180, 181, 183, 185, 189, 192, 194, 206, 211, 217, 219, 225, 228, 231, 232, 244, 247, 248, 252, 254];
var large_dogs = [5, 8, 10, 16, 22, 25, 26, 27, 30, 34, 36, 43, 44, 46, 49, 60, 64, 66, 68, 71, 75, 79, 85, 86, 87, 88, 92, 99, 105, 106, 108, 109, 111, 112, 116, 126, 128, 140, 143, 172, 187, 196, 198, 202, 203, 226, 241, 242, 243];
var xl_dogs = [4, 12, 28, 37, 41, 50, 53, 81, 113, 114, 115, 129, 141, 146, 152, 163, 165, 173, 199, 201, 207, 235];

var low_energy = [50, 66, 83, 91, 114, 129, 152, 177];
var moderate_energy = [1, 4, 5, 7, 10, 12, 17, 19, 20, 23, 28, 30, 33, 34, 36, 37, 40, 41, 42, 43, 46, 52, 53, 54, 59, 60, 62, 64, 68, 70, 71, 75, 78, 81, 84, 85, 90, 95, 98, 99, 102, 105, 109, 110, 111, 113, 115, 116, 123, 127, 132, 136, 137, 140, 141, 146, 147, 158, 163, 165, 172, 173, 178, 181, 183, 187, 191, 196, 198, 199, 201, 202, 203, 207, 208, 209, 211, 214, 215, 216, 217, 219, 226, 228, 231, 235, 236, 237, 242, 244, 245, 247, 248, 254];
var high_energy = [0, 2, 8, 11, 14, 18, 21, 22, 25, 26, 27, 29, 39, 44, 45, 47, 48, 49, 51, 61, 67, 74, 76, 77, 79, 86, 87, 88, 92, 97, 104, 106, 108, 112, 118, 119, 124, 126, 128, 130, 143, 144, 148, 149, 150, 154, 155, 156, 157, 166, 167, 168, 169, 170, 171, 174, 175, 180, 185, 186, 188, 189, 192, 194, 195, 205, 206, 218, 222, 225, 232, 239, 240, 241, 243, 246, 250, 252, 256];



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

function get_choices() {
    size_choice = $.urlParam('size');
    energy_choice = $.urlParam('energy');

    if (size_choice === "S") {
        if (energy_choice === "low") {
            find_my_breeds(small_dogs, low_energy);
        } else if (energy_choice === "moderate") {
            find_my_breeds(small_dogs, moderate_energy);
        } else {
            find_my_breeds(small_dogs, high_energy);
        }
    } else if (size_choice === "M") {
        if (energy_choice === "low") {
            find_my_breeds(medium_dogs, low_energy);
        } else if (energy_choice === "moderate") {
            find_my_breeds(medium_dogs, moderate_energy);
        } else {
            find_my_breeds(medium_dogs, high_energy);
        }
    } else if (size_choice === "L") {
        if (energy_choice === "low") {
            find_my_breeds(large_dogs, low_energy);
        } else if (energy_choice === "moderate") {
            find_my_breeds(large_dogs, moderate_energy);
        } else {
            find_my_breeds(large_dogs, high_energy);
        }
    } else {
        if (energy_choice === "low") {
            find_my_breeds(xl_dogs, low_energy);
        } else if (energy_choice === "moderate") {
            find_my_breeds(xl_dogs, moderate_energy);
        } else {
            find_my_breeds(xl_dogs, high_energy);
        };
    }
}

function pick_random() {
    random_breed_index = Math.floor(Math.random() * my_breeds.length);
    random_breed = full_breeds[my_breeds[random_breed_index]];
}


$(document).ready(function () {
    $('.carousel').carousel();

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
            pick_random();
            console.log(my_breeds[random_breed_index]);
            $.ajax({
                url: url + 'pet.getRandom',
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    key: '136945eb0dffcf53d2e578286bb0ed92',
                    animal: 'dog',
                    size: size_choice,
                    breed: random_breed,
                    location: zip,
                    output: 'basic',
                    format: 'json'
                }, success: function (response) {
                    if (response.petfinder.pet !== undefined) {
                        console.log(response.petfinder.pet, random_breed, random_breed_index);

                        if (response.petfinder.pet.media.photos !== undefined) {
                            var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                            $("#pic1").attr('src', pet_image);
                        } else {
                            $("#pic1").attr('src', "./assets/images/Missing-Image_Dog.png")
                        }
                        var pet_name = response.petfinder.pet.name.$t;
                        var pet_info = response.petfinder.pet.description.$t;
                        $("#pet_name1").text(pet_name);
                        $("#pet_info1").text(pet_info);
                        pick_random();
                    }
                    $.ajax({
                        url: url + 'pet.getRandom',
                        jsonp: "callback",
                        dataType: "jsonp",
                        data: {
                            key: '136945eb0dffcf53d2e578286bb0ed92',
                            animal: 'dog',
                            size: size_choice,
                            breed: random_breed,
                            location: zip,
                            output: 'basic',
                            format: 'json'
                        }, success: function (response) {
                            if (response.petfinder.pet !== undefined) {
                                var $img = $("<img>");

                                if (response.petfinder.pet.media.photos !== undefined) {
                                    var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                                    $img.attr('src', pet_image);
                                } else {
                                    $img.attr('src', "./assets/images/Missing-Image_Dog.png")
                                }
                                var pet_name = response.petfinder.pet.name.$t;
                                var pet_info = response.petfinder.pet.description.$t;
                                var $carDiv = $("<div class='carousel-item'></div>");
                                $img.attr('class', 'd-block w-100');
                                var $carCap = $("<div class='carousel-caption d-none d-md-block'></div>");
                                var $petName = $("<h3>" + pet_name + "</h3>");
                                var $petInfo = $("<p>" + pet_info + "</p>");
                                $carCap.append($petName);
                                $carCap.append($petInfo);
                                $carDiv.append($img);
                                $carDiv.append($carCap);
                                $(".carousel-inner").append($carDiv);
                            }
                        }
                    });
                }
            });
        }
    });

    $("#next").on("click", function () {
        pick_random();
        $.ajax({
            url: url + 'pet.getRandom',
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                key: '136945eb0dffcf53d2e578286bb0ed92',
                animal: 'dog',
                size: size_choice,
                breed: random_breed,
                location: zip,
                output: 'basic',
                format: 'json'
            }, success: function (response) {
                if (response.petfinder.pet !== undefined) {
                    console.log(response.petfinder.pet, random_breed, random_breed_index);
                    var $img = $("<img>");

                    if (response.petfinder.pet.media.photos !== undefined) {
                        var pet_image = response.petfinder.pet.media.photos.photo[2].$t;
                        $img.attr('src', pet_image);
                    } else {
                        $img.attr('src', "./assets/images/Missing-Image_Dog.png")
                    }
                    var pet_name = response.petfinder.pet.name.$t;
                    var pet_info = response.petfinder.pet.description.$t;
                    var $carDiv = $("<div class='carousel-item'></div>");
                    $img.attr('class', 'd-block w-100');
                    var $carCap = $("<div class='carousel-caption d-none d-md-block'></div>");
                    var $petName = $("<h3>" + pet_name + "</h3>");
                    var $petInfo = $("<p>" + pet_info + "</p>");
                    $carCap.append($petName);
                    $carCap.append($petInfo);
                    $carDiv.append($img);
                    $carDiv.append($carCap);
                    $(".carousel-inner").append($carDiv);
                }
            }
        });
    });

});

{/* <div class="carousel-item">
<img id="pic2" src="" class="d-block w-100" alt="...">
<div class="carousel-caption d-none d-md-block">
    <h3 id="pet_name2">...</h3>
    <p id="pet_info2">...</p>
</div>
</div> */}