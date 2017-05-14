/**
 * Function used to load dance categories from the backend. This populates the sidebar with both the levels and the
 * different categories available.
 */
function loadDanceCategories() {
    $.getJSON("/api/dances", function (data) {
        /* Load Level Buttons First */
        $.each(data.levels, function (key, val) {
            $("#level-dropdown").append("<li id=" + val + " class='level-button'> <a>" + val + "</a></li>");
        });

        /* Load Categories with nested Sub-Categories */
        let htmlString = null;
        $.each(data.subcategories, function (category, dances) {
            htmlString = "<li id=" + category + " class='bold category-dropdown'> " +
                "<a class='collapsible-header waves-effect waves-red'> " +
                category + "<i class='material-icons'>arrow_drop_down</i></a>" +
                "<div class='collapsible-body'><row><ul id='dances-dropdown'> ";

            $.each(dances, function (idx, dance) {
                htmlString += "<li id=" + dance + " class='dance-button'> <a>" + dance + "</a></li>"
            });
            htmlString += ("</li></ul> </row> </div>");
            $("#categories-dropdown").append(htmlString);
        });

        loadSidebarClickListeners();
    });
}

function loadSidebarClickListeners() {

    /* Add click listener for the level button */
    $(".level-button").on('click', function () {
        //alert("level button pushed");
        $(".level-button").removeClass("active");
        $(this).toggleClass("active");
        selectedDance.level = this.id;
        console.log(selectedDance);
        loadDanceData(selectedDance);
    });

    /* Add click listener for dance categories */
    $(".dance-button").on('click', function () {
        //alert("level button pushed");
        $(".dance-button").removeClass("active");
        $(this).toggleClass("active");
        selectedDance.category = $(this).closest("li.category-dropdown").attr('id');
        selectedDance.dance = this.id;
        $("#main-title").text("Create a " + selectedDance.dance + " Routine");
        console.log(selectedDance);
        loadDanceData(selectedDance);
    });
}


/**
 * Function used to fetch a set of dance steps and other data from the database
 * @param selectedDance
 */
function loadDanceData(selectedDance) {
    let url = "/api/dance/" + selectedDance.level + "/" + selectedDance.category + "/" + selectedDance.dance;
    $.get(url, function (data) {
        if (data) {
            $(".collection-item").remove();
            $.each(data.steps, function (idx, step) {
                $("#step-list").append('<li class="collection-item ' + step.level + '">' + step.name +
                    '</li>');
            });
        }
        else {
            $(".collection-item").remove();
        }
    });
}