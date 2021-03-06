angular.module('myApp').directive('myCalendar', function ($timeout) {
    return {
        restrict: "AE",
        templateUrl: "./directive/calendar.html",
        scope: {
            onSelect: "&",
            date: "=",
            config: "="
        },

        link: function (scope, elem, attr) {
            var year, month;
            var years = [];
            scope.monthObj = [
                {name: "Jan", no: 1},
                {name: "Feb", no: 2},
                {name: "Mar", no: 3},
                {name: "Apr", no: 4},
                {name: "May", no: 5},
                {name: "Jun", no: 6},
                {name: "Jul", no: 7},
                {name: "Aug", no: 8},
                {name: "Sep", no: 9},
                {name: "Oct", no: 10},
                {name: "Nov", no: 11},
                {name: "Dec", no: 12}
            ];
            var currentSelection = scope.date;

            var getLastSelection = function () {
                if (currentSelection) {
                    var dt = currentSelection.split('/');
                    var m = parseInt(dt[0]);//月
                    var d = parseInt(dt[1]);//天
                    var y = parseInt(dt[2]);//年
                    if (month == m && year == y) {
                        $('#' + d).removeClass('today');
                        $('#' + d).addClass('selected');
                    }
                }
            };

            var getMonthAndYear = function () {
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                scope.monthName = monthNames[parseInt(month) - 1];
                scope.year = year;
            };

            var configure = function () {
                var config = scope.config;
                if (config) {
                    scope.showMonthSelection = config.monthSelection === false ? false : true;
                    scope.showYearSelection = config.yearSelection === false ? false : true;
                    scope.navigation = config.navigation === false ? true : false;
                }
                else {
                    scope.showMonthSelection = true;
                    scope.showYearSelection = true;
                    scope.navigation = false;
                }
            };

            scope.selectDate = function (day) {
                if (day) {
                    var selectedDt = month + "/" + day + "/" + year;
                    elem.find('span').removeClass('selected');
                    elem.find('td').removeClass('today');
                    $('#' + day).find("span").addClass('selected');
                    currentSelection = selectedDt;
                    console.log(selectedDt)
                    scope.onSelect({
                        dt: selectedDt
                    });
                }
            };

            var init = function () {
                var weeks = [];
                scope.month = month;
                scope.year = year;
                var first_day = new Date(year + "-" + month + "-01").getDay();
                var totDays = new Date(year, month, 0).getDate();
                var intermediate = [];

                for (var i = 0; i < first_day; i++) {
                    intermediate.push('');
                }

                for (var j = 1; j <= totDays; j++) {
                    intermediate.push(j);
                }
                if (intermediate.length > 35) {
                    for (var k = intermediate.length; k < 42; k++) {
                        intermediate.push("");
                    }
                }
                else if (intermediate.length > 28) {
                    for (var l = intermediate.length; l < 35; l++) {
                        intermediate.push("");
                    }
                }

                for (var m = 0; m < 5; m++) {
                    weeks.push(intermediate.slice(m * 7, m * 7 + 7));
                }
                if (intermediate.length > 35)
                    weeks.push(intermediate.slice(35, intermediate.length));


                scope.weeks = weeks;
                selectToday();
                getMonthAndYear();
            };

            var checkForDtAttr = function () {
                if (scope.date) {
                    var dt = scope.date.split('/');
                    month = parseInt(dt[0]);
                    year = dt[2];
                    init();
                }
                else {
                    month = scope.month;
                    year = scope.year;
                    init();
                }
                configure();
            };

            var selectToday = function () {
                var dt = new Date();
                var ctMonth = dt.getMonth() + 1;
                var ctYear = dt.getFullYear();
                var ctDt = dt.getDate();

                if (ctMonth < 10) {
                    ctMonth = "0" + ctMonth.toString();
                }

                if (month == ctMonth && year == ctYear) {
                    $('#' + ctDt).addClass('today');
                }
            };

            var showSelection = function () {
                if (scope.date) {
                    var date = scope.date.split('/');
                    console.log(date[1])
                    // scope.$apply(function(){
                    //     $('#' + parseInt(date[1])).removeClass('today');
                    //     $('#' + parseInt(date[1])).find("span").addClass('selected');
                    // })
                    $timeout(function(){
                         angular.element('#' + parseInt(date[1])).find("span").addClass('selected');
                    },0)
                    
                   

                }
            };

            var loadYears = function () {
                scope.years = [];
                for (var i = 0; i < 5; i++) {
                    scope.years.push(years.slice(i * 7, i * 7 + 7));
                }
            };

            scope.prev = function () {
                if (month > 1) {
                    month--;
                } else {
                    month = 12;
                    year--;
                }

                init();
                getLastSelection();
            };

            scope.next = function () {
                if (month < 12) {
                    month++;
                } else {
                    month = 01;
                    year++;
                }
                init();
                getLastSelection();
            };

            scope.showYears = function (year) {
                scope.yearMode = true;
                for (var i = year; i < year + 35; i++) {
                    years.push(i);
                }
                loadYears();
            };

            scope.changeYear = function (yr) {
                scope.year = yr;
                year = yr;
                scope.yearMode = false;
                init();
            };

            scope.prevYear = function () {
                var min = years[0];
                var max = min - 35;
                if (min > 1500) {
                    years = [];
                    for (var i = min; i > max; i--) {
                        years.push(i);
                    }
                    years.reverse();
                    loadYears();
                }
            };

            scope.nextYear = function () {
                var min = years[34];
                var max = min + 35;
                if (min < 3000) {
                    years = [];
                    for (var i = min; i < max; i++) {
                        years.push(i);
                    }
                    loadYears();
                }
            };

            scope.changeMonth = function (moth) {
                month=moth;
                init();
            };

            checkForDtAttr();

            showSelection();
        }
    };
});