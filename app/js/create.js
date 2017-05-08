/**
 * Created by ekbos on 5/7/2017.
 */


/**
 * Function used to load dance categories from the backend. This populates the sidebar with both the levels and the
 * different categories available.
 */
function loadDanceCategories() {
    $.getJSON("/api/dances", function (data) {
        /* Load Level Buttons First */
        levels = data.levels; //
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
        $(".level-button").removeClass("active")
        $(this).toggleClass("active");
        selectedDance.level = this.id;
        console.log(selectedDance);
        fetchDanceData(selectedDance);
    });

    /* Add click listener for dance categories */
    $(".dance-button").on('click', function () {
        //alert("level button pushed");
        $(".dance-button").removeClass("active")
        $(this).toggleClass("active");
        selectedDance.category = $(this).closest("li.category-dropdown").attr('id');
        selectedDance.dance = this.id;
        console.log(selectedDance);
        fetchDanceData(selectedDance);
    });
}


/**
 * Function used to fetch a
 * @param selectedDance
 */
function fetchDanceData(selectedDance) {
    let url = "/api/dance/" + selectedDance.level + "/" + selectedDance.category + "/" + selectedDance.dance;
    $.get(url, function (data) {
        $(".result").html(JSON.stringify(data));
    });
}