<!--https://jsonplaceholder.typicode.com/users/-->
var jsonS;
	$(document).ready(function(){

		google.charts.load('current', {'packages':['gauge']});
		google.charts.setOnLoadCallback(drawChart);
		empresa();
	function drawChart() {
		var settings = {
		"async": false,
		"url": "http://localhost:3182/api/View/getLeitura",
		"method": "post",
		"dataType": "json",
		"headers": {
			"Cache-Control": "no-cache",
			"Postman-Token": "df98e587-f312-4bab-b892-cab75b40d4be"
			}
		}
		
		$.ajax(settings).done(function (response) {
			jsonS =response[0];
		});
			
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Memory', jsonS['Cpu']],
          ['CPU', jsonS['Mram']],
          ['Disk', jsonS['Hd']]
        ]);

        var options = {
          width: 0, height: 300,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
		  greenFrom:0,greenTo:75,
          minorTicks: 20
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          chart.draw(data, options);
        }, 1000);
    }
	function empresa() {
		var maq = {
		"url": "http://localhost:3182/api/View/CarregaEmpresa",
		"method": "post",
		"dataType": "json",
		"headers": {
			"Cache-Control": "no-cache",
			"Postman-Token": "df98e587-f312-4bab-b892-cab75b40d4be"
			}
		}
		
		$.ajax(maq).done(function (response) {
			var view = "\n";
			for (var i in response) {
			view += '	<a class="dropdown-item" id='+response[i].idGrupo+'+href="#">'+response[i].Nome_grupo +'</a> ';
			}
			view += "\n";
			document.getElementById('empresa').innerHTML = view;
			console.log(json);
		}, 
		function (errorCode, errorText) {
			console.log('Código: ' + errorCode);
			console.log('Mensagem de erro: ' + errorText);
		});
	}
});
