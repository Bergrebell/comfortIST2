$(document).ready(function() {


    var options = {
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    }
    
    var pieOptions = {
        //animation : false,
    }




    // ***********************************************************
        // connect to the existin localDB database
        var db = window.openDatabase("localDB", "1.0", "Local DB", 10000000);
        db.transaction(runSelect, error);
        
        // create empty data arrays
            var noiseUarray = [];
            var noiseSarray = [];
            var lightUarray = [];
            var lightSarray = [];


        function runSelect(t){
            t.executeSql('SELECT * FROM comfort LIMIT 20 OFFSET (SELECT COUNT(*) FROM comfort)-20;', [], success, error);
        }
        function success(t, results){
            
            var rowLength = results.rows.length;
            console.log('Number of rows: '+ rowLength);
            
            if (rowLength < 20) {
            
                for(var i = 0; i < rowLength; i++){
                    console.log('Row: '+i);
                    console.log('Noise: '+results.rows.item(i).noiseU);
                    console.log('NoiseS: '+results.rows.item(i).noiseS);
                    noiseUarray.push(results.rows.item(i).noiseU);
                    noiseSarray.push(results.rows.item(i).noiseS*100);
                    
                    console.log('Light: '+results.rows.item(i).lightU);
                    console.log('LightS: '+results.rows.item(i).lightS);
                    lightUarray.push(results.rows.item(i).lightU);
                    lightSarray.push(results.rows.item(i).lightS*5);
                }
                console.log("Senserarray: "+ noiseSarray);
                console.log("Userarray: " + noiseUarray);
                var noiseLineChart = new Chart(ctx).Line(noiseData, options);
                var lightLineChart = new Chart(ctx2).Line(lightData, options);
                var activityPiechart = new Chart(ctx3).Pie(activityData, pieOptions);
                
                
            } else {
                for(var i = 0; i < 20; i++){
                    console.log('Row: '+i);
                    console.log('Noise: '+results.rows.item(i).noiseU);
                    console.log('NoiseS: '+results.rows.item(i).noiseS);
                    noiseUarray.push(results.rows.item(i).noiseU);
                    noiseSarray.push(results.rows.item(i).noiseS*70);
                    
                    console.log('Light: '+results.rows.item(i).lightU);
                    console.log('LightS: '+results.rows.item(i).lightS);
                    lightUarray.push(results.rows.item(i).lightU);
                    lightSarray.push(results.rows.item(i).lightS*5);
                }
                console.log("Senserarray: "+ noiseSarray);
                console.log("Userarray: " + noiseUarray);
                var noiseLineChart = new Chart(ctx).Line(noiseData, options);
                var lightLineChart = new Chart(ctx2).Line(lightData, options);
                var activityPiechart = new Chart(ctx3).Pie(activityData, pieOptions);
                
            }
        }
            
        function error(err){
            console.log('There was an error processing the SQL: '+err);
        }



    // ***********************************************************




        var ctx = $("#noiseCanvas").get(0).getContext("2d");

        var noiseData = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: noiseUarray
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: noiseSarray
                }
            ]
        };



        


        var ctx2 = $("#lightCanvas").get(0).getContext("2d");

        var lightData = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: lightUarray
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: lightSarray
                }
            ]
        };
        
        
        
        
        var ctx3 = $("#activityCanvas").get(0).getContext("2d");
        
        var readingVal = 5;
        var computerVal = 3;
        var meetingVal = 10;
        var movingVal = 1;
        var otherVal = 20;

        var activityData = [
        {
            value: window.localStorage.getItem('Reading'),
            label: "Reading",
            color: "#E8D0A9"
        },
        {
            value: window.localStorage.getItem('Computer'),
            label: "On Computer",
            color: "#B7AFA3"
        },
        {
            value: window.localStorage.getItem('Meeting'),
            label: "In Meeting",
            color: "#C1DAD6"
        },
        {
            value: window.localStorage.getItem('Moving'),
            label: "Moving",
            color: "#ACD1E9"
        },
        {
            value: window.localStorage.getItem('Other'),
            label: "Other",
            color: "#6D929B"
        },
        
        ];

});



