Vue.component('reports', {
	props: ['active_tab'],
	template: `
		<div class="container">
			<div class="row">
			<div class="col-sm-8 col-lg-5 c-div" id="bar-totals">
				<h3 style="text-align:center;">Tab Completion</h3>
				{{buildBar()}}
			</div>
			<br>
			<div class="col-sm-8 col-lg-4 c-div" id="pie-totals">
				<h3 style="text-align:center;">Total Complete</h3>
                                {{buildPie()}}
                        </div>
			</div>
		</div>

	`,
	methods: {
		buildBar(){
			Vue.nextTick(function(){
				// set the dimensions of the canvas
				var margin = {top: 20, right: 20, bottom: 70, left: 40},
				width = 300 - margin.left - margin.right,
				height = 300 - margin.top - margin.bottom;


				// set the ranges
				var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

				var y = d3.scale.linear().range([height, 0]);

				// define the axis
				var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")


				var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10);


				// add the SVG element
				var svg = d3.select("#bar-totals").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", 
				  "translate(" + margin.left + "," + margin.top + ")");


				// load the data
				var student_total_url = app.baseUrl + "/php/student_total.php";
				var percentage_conf_url = app.baseUrl + "/php/percentage_conf.php?t_code=" + app.appstg('appstg_termcode').VALUE;

				var student_total = fetch(student_total_url)
					.then(res=>res.json());
				
				var percentage_conf = fetch(percentage_conf_url)
					.then(res=>res.json());

				var promises = [student_total, percentage_conf];

				Promise.all(promises).then((resp) => {
					var total = resp[0];
					var data = resp[1];
					var orderObj = [
						{TYP_TEXT: 'dtpt_welcome_conf', NAME:'Welcome', ORDER:'1'},
						{TYP_TEXT: 'dtpt_diploma_info_conf', NAME:'Diploma Info', ORDER:'2'},
						{TYP_TEXT: 'dtpt_diploma_ceremony_conf', NAME:'Diploma Cmny', ORDER:'3'},
						{TYP_TEXT: 'dtpt_umass_conf', NAME:'Umass', ORDER:'4'},
						{TYP_TEXT: 'dtpt_uceremony_conf', NAME:'Uceremony', ORDER:'5'},
						{TYP_TEXT: 'dtpt_confirm_email', NAME:'Confirmation', ORDER:'6'}
					];


					data.forEach(function(d) {
						var obj = orderObj.find(el => el.TYP_TEXT == d.TYP_TEXT);
			
						merge(d, obj);

						d.TYP_TEXT = d.TYP_TEXT;
						d.TYP_COUNT = +d.TYP_COUNT;
					});
					
					data.sort((a,b)=> a.ORDER - b.ORDER);
					
					// scale the range of the data
					x.domain(data.map(function(d) { return d.NAME; }));
					y.domain([0, +total[0].TOTAL_STUDENTS]);

					// add axis
					svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis)
					.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", "-.55em")
					.attr("transform", "rotate(-90)" );

					svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 5)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Student Total");


					// Add bar chart
					svg.selectAll("bar")
					.data(data)
					.enter().append("rect")
					.attr("class", "bar")
					.attr("x", function(d) { return x(d.NAME); })
					.attr("width", x.rangeBand())
					.attr("y", function(d) { return y(d.TYP_COUNT); })
					.attr("height", function(d) { return height - y(d.TYP_COUNT); });
				});
			});
		},
		buildPie(totals){
			Vue.nextTick(function(){
				// load the data
				var student_total_url = app.baseUrl + "/php/student_total.php";
				var percentage_conf_url = app.baseUrl + "/php/percentage_conf.php?t_code=" + app.appstg('appstg_termcode').VALUE;

				var student_total = fetch(student_total_url)
					.then(res=>res.json());

				var percentage_conf = fetch(percentage_conf_url)
					.then(res=>res.json());

				var promises = [student_total, percentage_conf];

				Promise.all(promises).then((resp) => {
					// Produce pie chart with data
					var complete = resp[1].find(el => el.TYP_TEXT == 'dtpt_confirm_email').TYP_COUNT
					var incomplete = resp[0][0].TOTAL_STUDENTS - complete;

					var dataSet = [
						{ legendLabel: "incomplete", magnitude: incomplete},
						{ legendLabel: "complete", magnitude: complete}
					];
					var canvasWidth = 300, //width
					canvasHeight = 300,   //height
					outerRadius = 100,   //radius
					color = d3.scale.category20(); //builtin range of colors

					var vis = d3.select("#pie-totals")
					.append("svg:svg") //create the SVG element inside the <body>
					.data([dataSet]) //associate our data with the document
					.attr("width", canvasWidth) //set the width of the canvas
					.attr("height", canvasHeight) //set the height of the canvas
					.append("svg:g") //make a group to hold our pie chart
					.attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'

					// This will create <path> elements for us using arc data...
					var arc = d3.svg.arc()
					.outerRadius(outerRadius);

					var pie = d3.layout.pie() //this will create arc data for us given a list of values
					.value(function(d) { return d.magnitude; }) // Binding each value to the pie
					.sort( function(d) { return null; } );

					// Select all <g> elements with class slice (there aren't any yet)
					var arcs = vis.selectAll("g.slice")
					// Associate the generated pie data (an array of arcs, each having startAngle,
					// endAngle and value properties) 
					.data(pie)
					// This will create <g> elements for every "extra" data element that should be associated
					// with a selection. The result is creating a <g> for every object in the data array
					.enter()
					// Create a group to hold each slice (we will have a <path> and a <text>
					// element associated with each slice)
					.append("svg:g")
					.attr("class", "slice");    //allow us to style things in the slices (like text)

					arcs.append("svg:path")
					//set the color for each slice to be chosen from the color function defined above
					.attr("fill", function(d, i) { return color(i); } )
					//this creates the actual SVG path using the associated data (pie) with the arc drawing function
					.attr("d", arc);

					// Add a legendLabel to each arc slice...
					arcs.append("svg:text")
					.attr("transform", function(d) { //set the label's origin to the center of the arc
					//we have to make sure to set these before calling arc.centroid
					d.outerRadius = outerRadius + 50; // Set Outer Coordinate
					d.innerRadius = outerRadius + 45; // Set Inner Coordinate
					return "translate(" + arc.centroid(d) + ")";
					})
					.attr("text-anchor", "middle") //center the text on it's origin
					.style("fill", "Purple")
					.style("font", "bold 12px Arial")
					.text(function(d, i) { return dataSet[i].legendLabel; }); //get the label from our original data array

					// Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
					arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
					.attr("dy", ".35em")
					.attr("text-anchor", "middle")
					//.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
					.attr("transform", function(d) { //set the label's origin to the center of the arc
					//we have to make sure to set these before calling arc.centroid
					d.outerRadius = outerRadius; // Set Outer Coordinate
					d.innerRadius = outerRadius/2; // Set Inner Coordinate
					return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
					})
					.style("fill", "White")
					.style("font", "bold 12px Arial")
					.text(function(d) { return d.data.magnitude; });

					// Computes the angle of an arc, converting from radians to degrees.
					function angle(d) {
					var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
					return a > 90 ? a - 180 : a;
					}
				});

			}); 
		},
	}
})
