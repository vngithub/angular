var highChartOptions = {

    title: {
        text: 'Emotion Quotient For Bangalore Team' 
    },

    subtitle: {
        text: ''
    },
    lineWidth: 0,
    yAxis: {
        min:0,
        max:100,
        title: {
            enabled: true,
                text: '% Emotion',
                style: {
                    fontWeight: 'normal'
                }
            },
            tickInterval:10
    },
    width:5,

    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%e of %b'
        },
        title: 'Employee',
        min: 0,
        max: 20,
        tickInterval: 2
    },
   // series:[{"name":"happiness","data":[["1523018161808",0],["1523018502273",0],["1523021070789",0],["1523021215837",0.02],["1523035821172",9.98],["1523035821250",0.02],["1523035822012",8.17],["1523036001906",9.98],["1523036003121",10],["1523036003609",10],["1523036003931",10],["1523036004021",6.15],["1523036004113",0.35000000000000003],["1523036004117",9.92],["1523036004132",8.43],["1523036004321",0.05],["1523036004408",2.62],["1523036004477",7.22],["1523036004546",10],["1523036004855",0.04],["1523036005014",9.7],["1523036005533",9.92],["1523036005855",0.27],["1523037724886",9.98],["1523037725171",0.34],["1523037725587",9.99],["1523037725797",9.99],["1523037725889",10],["1523037725921",10],["1523037953984",10],["1523037953987",9.7],["1523037953990",9.98],["1523037954144",0.34],["1523037954314",0.04],["1523037954322",10],["1523037954326",10],["1523037954341",10],["1523037954358",9.92],["1523037954370",10],["1523037954392",0.02],["1523037954559",8.040000000000001],["1523037955526",10],["1523037955563",9.96],["1523037955602",0.16],["1523037955643",10],["1523037955657",0.01],["1523037955744",9.65],["1523037955760",9.61],["1523037955779",0],["1523037955844",9.99]]}],
    legend: {
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 0
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

};
//    var self = this;
   $("#filter_by").click(function() {
        $.get("http://10.20.33.232:3000/users/fear", function(data, status) {
            highChartOptions.series = data.series;
            Highcharts.chart('container',highChartOptions);
        });
       
    });

     $("#filter_by_ID").click(function() {
        $.get("http://10.20.33.232:3000/users/fear", function(data, status) {
            highChartOptions.series = data.series;
            Highcharts.chart('container',highChartOptions);
        });
       
    });
     var getAllData = function() {
        $.get("http://10.20.33.232:3000/users/getData/all", function(data, status) {
            highChartOptions.series = data.series;
            Highcharts.chart('container',highChartOptions);
        });
       
    }
    
     var allEmpData = function() {
        $.get("http://10.20.33.232:3000/users/faceids/all", function(data, status) {
            var numbers = data;
            var option = '';
            if (numbers.length == 0){
                document.getElementById('sidebar').innerHTML += "No Employee";
                return;
            }
             var leftHtml = '<div class="sidebar_item"><h3>Bangalore team</h3>';
             leftHtml += '<div style="text-align: float:left;">';
            for (var i=0;i<numbers.length;i++){
                if (i < 4)
                    leftHtml +='<image src="style/'+i+'.jpg" style="height:60px; width:60px; padding-right:15px;padding-bottom:25px" onclick="faceId(\''+numbers[i]+'\')"></image>';   
                else 
                    leftHtml +='<image src="style/3.jpg" style="height:60px; width:60px; padding-right:15px;padding-bottom:25px" onclick="faceId(\''+numbers[i]+'\')"></image>';   
            }
            leftHtml +='</div>';
            document.getElementById('sidebar').innerHTML += leftHtml;
           // $('#face_id').append(option);


        });
       
    }
    // $("#get_all_empIDs").click(allEmpData);

    $("#face_id").on('change', function() {
        $.get("http://10.20.33.232:3000/users/faceids/"+this.value, function(data, status) {
            var numbers = data;
			var option = '';

			for (var i=0;i<numbers.length;i++){
			   option += '<option value="'+ numbers[i] + '">' + numbers[i] + '</option>';
			}
			$('#face_id').append(option);
        });
       
    });

var faceId = function(n) {
        $.get("http://10.20.33.232:3000/users/faceids/"+n, function(data, status) {
            var numbers = data;
            var option = '';

            for (var i=0;i<numbers.length;i++){
               option += '<option value="'+ numbers[i] + '">' + numbers[i] + '</option>';
            }
            $('#face_id').append(option);
            highChartOptions.series = data.series;
            Highcharts.chart('container',highChartOptions);
        });
       
    }
    /*var callHappyFeet = function() {
              var i,
                  totalSubGroups = 1,
                  empList = allEmpData();
              for (i = 0; i < totalSubGroups; i++) {
                  var dotPercent = "dotPercent" + i,
                  circleimg = "circleimg" + i;
                  var leftHtml = '<div class="sidebar_item" style="padding-bottom:10px;height: 138px"><h3 style="margin-left:15px">Sub Group</h3><div id=' + dotPercent + ' style="height:30px;     text-align: center;"></div></br><div id='+circleimg+' style="text-align: center;"></div>';
                  document.getElementById("sidebar").innerHTML += leftHtml;
                  var leftHtml1 = '<span class="dot"></span><span class="dotPercent">50%</span>';
                  var p = 0;
                  
                  for (p = 0; p < empList.length; p++) {
                      document.getElementById(dotPercent).innerHTML += leftHtml1;
                  }
                  
                  var leftHtml2 = '<image src="style/human.jpg" style="height:60px; width:60px; padding-right:15px"></image>';
                  var s = 0;
                  t = 4;
                  for (s = 0; s < t; s++) {
                      document.getElementById(circleimg).innerHTML += leftHtml2;
                  }               
                  
              }
          }*/

getAllData();
allEmpData();
