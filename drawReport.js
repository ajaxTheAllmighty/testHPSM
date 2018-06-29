
//Библиотека лежит тут
var d3 = lib.D3js;

function buildHTML(){
	var sCR = "\n";
	var sHtmlReturn;
		sHtmlReturn += "<svg width=\"960\" height=\"960\" font-family=\"sans-serif\" font-size=\"10\" text-anchor=\"middle\"></svg>" + sCR;		//Панелька для отображения репорта

		var svg = d3.select("svg"),							//
		    width = +svg.attr("width"),						//
    		height = +svg.attr("height");					//	настройка панели
		var format = d3.format(",d");						//
		var color = d3.scaleOrdinal(d3.schemeCategory20c);	//

		var pack = d3.pack();
	    .size([width, height]);
	    .padding(1.5);
	    d3.csv(readFile("C:\\testData.csv","t"), function(d) {	//Выбор данных
		  d.value = +d.value;
		  if (d.value) return d;
		}, function(error, classes) {
		  if (error) throw error;

		  //Дальше все из примера по d3
	  	 var root = d3.hierarchy({children: classes})
      .sum(function(d) { return d.value; })
      .each(function(d) {
        if (id = d.data.id) {
          var id, i = id.lastIndexOf(".");
          d.id = id;
          d.pkg = id.slice(0, i);
          d.CLASS = id.slice(i + 1);
        }
      });
       var node = svg.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("CLASS", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	  node.append("circle")
	      .attr("id", function(d) { return d.id; })
	      .attr("r", function(d) { return d.r; })
	      .style("fill", function(d) { return color(d.pkg); });

	  node.append("clipPath")
	      .attr("id", function(d) { return "clip-" + d.id; })
	    .append("use")
	      .attr("xlink:href", function(d) { return "#" + d.id; });

	  node.append("text")
	      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
	    .selectAll("tspan")
	    .data(function(d) { return d.CLASS.split(/(?=[A-Z][^A-Z])/g); })
	    .enter().append("tspan")
	      .attr("x", 0)
	      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
	      .text(function(d) { return d; });

	  node.append("title")
	      .text(function(d) { return d.id + "\n" + format(d.value); });
	});
		
return sHtmlReturn;
}


function getData(){
	var data;
	var file = new SCFile('infFilials');
	var query = file.doSelect('true');
	data +="name,dateCreated,dateUpdated,isActive,contact,whoUpdated";	//хедеры
		if(query == RC_SUCCESS){
			do{
				data+="\n"+file['name']+","+file['dateCreated']+","+file['dateUpdated']+","+file['isActive']+","+file['contact']+","+file['whoUpdated'];
			}while(file.getNext() == RC_SUCCESS)
		}
	writeFile("C:\\testData.csv",null,data);
}