var highChartOptions = {

    title: {
        text: 'Emotion Quotient'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title:{
            enabled:true,
            text:'%',
            style:{
                fontWeight: normal
            }
        },
        min: 0,
        max: 20,
        tickInterval: 2
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            minute: '%H:%M',
            hour: '%H:%M'
        },
        title: 'Employee',
        min: 0,
        max: 20,
        tickInterval: 2 
    },
   // series:[{"name":"happiness","data":[["1523018161808",0],["1523018502273",0],["1523021070789",0],["1523021215837",0.02],["1523035821172",9.98],["1523035821250",0.02],["1523035822012",8.17],["1523036001906",9.98],["1523036003121",10],["1523036003609",10],["1523036003931",10],["1523036004021",6.15],["1523036004113",0.35000000000000003],["1523036004117",9.92],["1523036004132",8.43],["1523036004321",0.05],["1523036004408",2.62],["1523036004477",7.22],["1523036004546",10],["1523036004855",0.04],["1523036005014",9.7],["1523036005533",9.92],["1523036005855",0.27],["1523037724886",9.98],["1523037725171",0.34],["1523037725587",9.99],["1523037725797",9.99],["1523037725889",10],["1523037725921",10],["1523037953984",10],["1523037953987",9.7],["1523037953990",9.98],["1523037954144",0.34],["1523037954314",0.04],["1523037954322",10],["1523037954326",10],["1523037954341",10],["1523037954358",9.92],["1523037954370",10],["1523037954392",0.02],["1523037954559",8.040000000000001],["1523037955526",10],["1523037955563",9.96],["1523037955602",0.16],["1523037955643",10],["1523037955657",0.01],["1523037955744",9.65],["1523037955760",9.61],["1523037955779",0],["1523037955844",9.99]]}],
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
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

     $("#filter_by_all").click(function() {
        $.get("http://10.20.33.232:3000/users/getData/all", function(data, status) {
            highChartOptions.series = data.series;
            Highcharts.chart('container',highChartOptions);
        });
       
    });

     
     $("#get_all_empIDs").click(function() {
        $.get("http://10.20.33.232:3000/users/faceids/all", function(data, status) {
            var numbers = data;
			var option = '';
			for (var i=0;i<numbers.length;i++){
			   option += '<option value="'+ numbers[i] + '">' + numbers[i] + '</option>';
			}
			$('#face_id').append(option);
        });
       
    });

     var faceId = function() {
        $.get("http://10.20.33.232:3000/users/faceids/"+this.value, function(data, status) {
            var numbers = data;
            var option = '';
            for (var i=0;i<numbers.length;i++){
               option += '<option value="'+ numbers[i] + '">' + numbers[i] + '</option>';
            }
            $('#face_id').append(option);
        });
       
    }

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



