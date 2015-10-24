!function(){
	var bP={
		id1:"",
		id1_key1:"",
		id1_key2:"",
		id1_header:"",
		id2:"",
		id1_key1:"",
		id1_key2:"",
		id2_header:"",
		total_flights_key:""
	};	
	var b=30, bb=150, height=1000, buffMargin=1, minHeight=14;
	var c1=[-170, 40, 10], c2=[-90, 110, 10], c3=[-55, 145, 10], c4=[-25,190, 40]; //Column positions of labels.
	var colors =["#3366CC", "#DC3912",  "#FF9900","#109618", "#990099", "#0099C6"];

	/**
	bP.partData = function(data,p){
		var sData={};
		sData.keys=[
			d3.set(data.map(function(d){ return d[0];})).values().sort(function(a,b){ return ( a<b? -1 : a>b ? 1 : 0);}),
			d3.set(data.map(function(d){ return d[1];})).values().sort(function(a,b){ return ( a<b? -1 : a>b ? 1 : 0);})		
		];
		
		sData.data = [	sData.keys[0].map( function(d){ return sData.keys[1].map( function(v){ return 0; }); }),
						sData.keys[1].map( function(d){ return sData.keys[0].map( function(v){ return 0; }); }) 
		];
		
		data.forEach(function(d){ 
			sData.data[0][sData.keys[0].indexOf(d[0])][sData.keys[1].indexOf(d[1])]=d[p];
			sData.data[1][sData.keys[1].indexOf(d[1])][sData.keys[0].indexOf(d[0])]=d[p]; 
		});
		
		return sData;
	}
	**/
	
	/**
	 * groupedData is an array of objects, key-value pair.
	 * 
	 */
	
	function partData(groupedData, keyval2, keys, getColumn, getValue) {
		var sData={};
		sData.keys = keys;
		sData.data = [	sData.keys[0].map( function(d){ return sData.keys[1].map( function(v){ return 0; }); }),
						sData.keys[1].map( function(d){ return sData.keys[0].map( function(v){ return 0; }); }) 
		];
		
		sData.total_flights = [	sData.keys[0].map( function(d){ return sData.keys[1].map( function(v){ return 0; }); }),
						sData.keys[1].map( function(d){ return sData.keys[0].map( function(v){ return 0; }); }) 
		];
		
 		groupedData.forEach(function (drow) {
 			
			keys[0].forEach(function(keys0_val) {
				if ((!getColumn.trim() && !getValue.trim()) ||  (getColumn.trim() != "" && drow[getColumn] == getValue)) {
					sData.data[0][sData.keys[0].indexOf(keys0_val)][sData.keys[1].indexOf(drow[keyval2])]+=drow[keys0_val];
					sData.data[1][sData.keys[1].indexOf(drow[keyval2])][sData.keys[0].indexOf(keys0_val)]+=drow[keys0_val];
					
					sData.total_flights[0][sData.keys[0].indexOf(keys0_val)][sData.keys[1].indexOf(drow[keyval2])]+=drow[bP.total_flights_key];
					sData.total_flights[1][sData.keys[1].indexOf(drow[keyval2])][sData.keys[0].indexOf(keys0_val)]+=drow[bP.total_flights_key];
				}
 			});		
 		});
 		
		return sData;

	}

	bP.partDataForID1 = function(groupedData, keysPerGroup, selectedBar, selectedIndex) {
    	selectedBar = typeof selectedBar !== 'undefined' ? selectedBar:-1;
    	selectedIndex = typeof selectedIndex !== 'undefined' ? selectedIndex:-1;
		getColumn = "";
		getKey = "";
	    if (selectedBar > -1 && selectedIndex > -1) {
			getColumn = bP.id2_key2;
			getKey = keysPerGroup[bP.id2_key2][selectedIndex];	    	
	    }
		return	{data: partData(groupedData, bP.id1_key2, [keysPerGroup[bP.id1_key1],keysPerGroup[bP.id1_key2]], getColumn, 
				getKey), id:bP.id1, header:bP.id1_header}
	}
	
	
	bP.partDataForID2 = function(groupedData, keysPerGroup, selectedBar, selectedIndex) {
    	selectedBar = typeof selectedBar !== 'undefined' ? selectedBar:-1;
    	selectedIndex = typeof selectedIndex !== 'undefined' ? selectedIndex:-1;
		getColumn = "";
		getKey = "";
	    if (selectedBar > -1 && selectedIndex > -1) {
			getColumn = bP.id1_key2;
			getKey = keysPerGroup[bP.id1_key2][selectedIndex];	    	
	    }
		return	{data:partData(groupedData, bP.id2_key2, [keysPerGroup[bP.id2_key1], keysPerGroup[bP.id2_key2]], getColumn, 
				getKey), id:bP.id2, header:bP.id2_header}
	}
	
	

	function visualize(data, totalflights){
		var vis ={};
		function calculatePosition(a, s, e, b, m, t){
			
			var total=d3.sum(a);
			var sum=0, neededHeight=0, leftoverHeight= e-s-2*b*a.length;
			var ret =[];
			
			a.forEach(
				function(d, i){ 
					var v={};
					v.percent = (total == 0 ? 0 : d/total); 
					v.value=d;
					v.height=Math.max(v.percent*(e-s-2*b*a.length), m);
					(v.height==m ? leftoverHeight-=m : neededHeight+=v.height );
					v.tf = t[i];
					ret.push(v);
				}
			);
			
			var scaleFact=leftoverHeight/Math.max(neededHeight,1), sum=0;
			ret.forEach(
				function(d, i){ 
					d.percent = scaleFact*d.percent; 
					d.height=(d.height==m? m : d.height*scaleFact);
					d.middle=sum+b+d.height/2;
					d.y=s + d.middle - d.percent*(e-s-2*b*a.length)/2;
					d.h= d.percent*(e-s-2*b*a.length);
					d.percent = (total == 0 ? 0 : d.value/total);
					d.percent_of_tf = (d.tf==0?0:d.value/d.tf)
					sum+=2*b+d.height;
				}
			);
			return ret;
		}
		
		vis.mainBars = [ 
			calculatePosition( 	data.data[0].map(function(d){  return d3.sum(d);}), 0, height, buffMargin, minHeight, 
								totalflights[0].map(function(d) { return d3.sum(d); }) ),
			calculatePosition( 	data.data[1].map(function(d){ return d3.sum(d);}), 0, height, buffMargin, minHeight, 
								totalflights[1].map(function(d) { return d[0]; }) )
		];
		
		vis.subBars = [[],[]];
		vis.mainBars.forEach(function(pos,p){
			pos.forEach(function(bar, i){	
				calculatePosition(data.data[p][i], bar.y, bar.y+bar.h, 0, 0, totalflights[p][i]).forEach(function(sBar,j){ 
					sBar.key1=(p==0 ? i : j); 
					sBar.key2=(p==0 ? j : i); 
					vis.subBars[p].push(sBar); 
				});
			});
		});
		
		vis.subBars.forEach(function(sBar){
			sBar.sort(function(a,b){ 
				
				return (a.key1 < b.key1 ? -1 : a.key1 > b.key1 ? 
						1 : a.key2 < b.key2 ? -1 : a.key2 > b.key2 ? 1: 0 )});
		});
		
		vis.edges = vis.subBars[0].map(function(p,i){
			return {
				key1: p.key1,
				key2: p.key2,
				y1:p.y,
				y2:vis.subBars[1][i].y,
				h1:p.h,
				h2:vis.subBars[1][i].h
			};
		});
		vis.keys=data.keys;
		return vis;
	}
	
	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return edgePolygon(i(t));
		};
	}
	
	function drawPart(data, id, p){
		
		d3.select("#"+id).append("g").attr("class","part"+p)
			.attr("transform","translate("+( p*(bb+b))+",0)");
		d3.select("#"+id).select(".part"+p).append("g").attr("class","subbars");
		d3.select("#"+id).select(".part"+p).append("g").attr("class","mainbars");
		
		var mainbar = d3.select("#"+id).select(".part"+p).select(".mainbars")
			.selectAll(".mainbar").data(data.mainBars[p])
			.enter().append("g").attr("class","mainbar");

		mainbar.append("rect").attr("class","mainrect")
			.attr("x", 0).attr("y",function(d){ return d.middle-d.height/2; })
			.attr("width",b).attr("height",function(d){ return d.height; })
			.style("shape-rendering","auto")
			.style("fill-opacity",0).style("stroke-width","0.5")
			.style("stroke","black").style("stroke-opacity",0);

		mainbar.append("text").attr("class","barlabel")
			.attr("x", c1[p]).attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return data.keys[p][i];})
			.attr("text-anchor","start" );
			
		mainbar.append("text").attr("class","barvalue")
			.attr("x", c2[p]).attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return d.tf>0?(d.value / 1000).toFixed(1):"" ;})
			.attr("text-anchor","end");
			
		mainbar.append("text").attr("class","barpercent")
			.attr("x", c3[p]).attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return d.tf>0?"( "+Math.round(100*d.percent)+"%)":"" ;})
			.attr("text-anchor","end").style("fill","grey");
		
		mainbar.append("text").attr("class","bartotalflights")
			.attr("x", c4[p]).attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return d.tf>0?Math.round(100*d.percent_of_tf)+"%":"" ;})
			//.text(function(d,i){ return (d.tf / 1000).toFixed(1) + "K" ;})
			.attr("text-anchor","end");
		
		d3.select("#"+id).select(".part"+p).select(".subbars")
			.selectAll(".subbar").data(data.subBars[p]).enter()
			.append("rect").attr("class","subbar")
			.attr("x", 0).attr("y",function(d){ return d.y})
			.attr("width",b).attr("height",function(d){ return d.h})
			.style("fill",function(d){ return colors[d.key1];});
	}
	
	function drawEdges(data, id){
		d3.select("#"+id).append("g").attr("class","edges").attr("transform","translate("+ b+",0)");

		d3.select("#"+id).select(".edges").selectAll(".edge")
			.data(data.edges).enter().append("polygon").attr("class","edge")
			.attr("points", edgePolygon).style("fill",function(d){ return colors[d.key1];})
			.style("opacity",0.5).each(function(d) { this._current = d; });	
	}	
	
	function drawHeader(header, id, add){
		[0,1].forEach(function(d){
			var h = d3.select("#"+id).select(".part"+d).append("g").attr("class","header");
			
			
			h.append("text").text(header[d]).attr("x", (c1[d]-5))
				.attr("y", -5).style("fill","grey").call(wrap,c1[2]);
			
			h.append("text").text("Count").attr("x", (c2[d]-15))
				.attr("y", -5).style("fill","grey").call(wrap,c2[2]);

			h.append("text").text(header[3]).attr("x", (c4[d]-25))
			.attr("y", -5).style("fill","grey").call(wrap,c4[2]);
			
			h.append("line").attr("x1",c1[d]-10).attr("y1", -1)
				.attr("x2",c4[d]+10).attr("y2", -1).style("stroke","black")
				.style("stroke-width","1").style("shape-rendering","crispEdges");
			
		});
	}
	
	function wrap(text, width) {
		  text.each(function() {
			
		    var text = d3.select(this),
		        words = text.text().split(/\s+/).reverse(),
		        word,
		        line = [],
		        lineNumber = 0,
		        lineHeight = 1.1, // ems
		        x = text.attr("x"),
		        y = text.attr("y"),
		        dy = parseFloat(-2),
		        //dy = parseFloat(text.attr("dy")),
		        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
		    while (word = words.pop()) {
		      line.push(word);
		      tspan.text(line.join(" "));
		      if (tspan.node().getComputedTextLength() > width) {
		        line.pop();
		        tspan.text(line.join(" "));
		        line = [word];
		        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		      }
		    }
		  });
	}

	function edgePolygon(d){
		return [0, d.y1, bb, d.y2, bb, d.y2+d.h2, 0, d.y1+d.h1].join(" ");
	}	
	
	function transitionPart(data, id, p){
		var mainbar = d3.select("#"+id).select(".part"+p).select(".mainbars")
			.selectAll(".mainbar").data(data.mainBars[p]);
		
		mainbar.select(".mainrect").transition().duration(500)
			.attr("y",function(d){ return d.middle-d.height/2;})
			.attr("height",function(d){ return d.height;});
			
		mainbar.select(".barlabel").transition().duration(500)
			.attr("y",function(d){ return d.middle+5;});
			
		mainbar.select(".barvalue").transition().duration(500)
			.attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return d.tf>0?(d.value / 1000).toFixed(1) :"" ;});
			
		mainbar.select(".barpercent").transition().duration(500)
			.attr("y",function(d){ return d.middle+5;})
			.text(function(d,i){ return d.tf>0?"( "+Math.round(100*d.percent)+"%)":"" ;});
		
		mainbar.select(".bartotalflights").transition().duration(500)
			.attr("y",function(d){ return d.middle+5;})
			//.text(function(d,i){ return (d.tf / 1000).toFixed(1) + "K" ;});
			.text(function(d,i){ return d.tf>0?Math.round(100*d.percent_of_tf)+"%":"" ;});
		
		d3.select("#"+id).select(".part"+p).select(".subbars")
			.selectAll(".subbar").data(data.subBars[p])
			.transition().duration(500)
			.attr("y",function(d){ return d.y}).attr("height",function(d){ return d.h});
	}
	
	function transitionEdges(data, id){
		d3.select("#"+id).append("g").attr("class","edges")
			.attr("transform","translate("+ b+",0)");

		d3.select("#"+id).select(".edges").selectAll(".edge").data(data.edges)
			.transition().duration(500)
			.attrTween("points", arcTween)
			.style("opacity",function(d){ return (d.h1 ==0 || d.h2 == 0 ? 0 : 0.5);});	
	}
	
	
	function transition(data, id){
		transitionPart(data, id, 0);
		transitionPart(data, id, 1);
		transitionEdges(data, id);
	}
	
	bP.draw = function(data, svg, dataByDate, keysPerGroup){
		
		data.forEach(function(biP,s){
			
			svg.append("g")
				.attr("id", biP.id)
				.attr("transform","translate("+ (600*s)+",0)");
			
			var visData = visualize(biP.data, biP.data.total_flights);
			drawPart(visData, biP.id, 0);
			drawPart(visData, biP.id, 1); 
			drawEdges(visData, biP.id);
			drawHeader(biP.header, biP.id);
			
			[0,1].forEach(function(p){			
				d3.select("#"+biP.id)
					.select(".part"+p)
					.select(".mainbars")
					.selectAll(".mainbar")
					.on("mouseover",function(d, i){ 
						//return bP.selectSegment(data, p, i); 
						return bP.selectSegment(data, dataByDate, keysPerGroup, biP.id, p, i); 
					}).on("mouseout",function(d, i){ return bP.deSelectSegment(data, p, i); });	
			});
		});	
	}

	
	bP.updateData = function(data, dataByDate, keysPerGroup) {
		data.forEach(function(k){
			var newdata =  {keys:[], data:[]};	
				
			newdata.keys = k.data.keys.map( function(d){ return d;});
			var sdata;
		    if (k.id == bP.id2) {
				sdata = bP.partDataForID2(dataByDate, keysPerGroup);
			} else {
		    	sdata = bP.partDataForID1(dataByDate, keysPerGroup);
			}
			newdata.data[0] = sdata.data.data[0];
			newdata.data[1] = sdata.data.data[1];
			transition(visualize(newdata, sdata.data.total_flights), k.id);
				
		});
	}
	
	bP.selectSegment = function(data, dataByDate, keysPerGroup, id, m, s) {
		data.forEach(function(k){
			var newdata =  {keys:[], data:[]};	
				
			newdata.keys = k.data.keys.map( function(d){ return d;});
			
			var totalflights = [];
			if (m==1 && id != k.id) {
				var sdata;
			    if (k.id == bP.id2) {
					sdata = bP.partDataForID2(dataByDate, keysPerGroup, m, s);
				} else {
			    	sdata = bP.partDataForID1(dataByDate, keysPerGroup, m, s);
				}
				newdata.data[m] = sdata.data.data[m];
				newdata.data[1-m] = sdata.data.data[1-m];
				totalflights[m] = sdata.data.total_flights[m];
				totalflights[1-m] = sdata.data.total_flights[1-m];
			} else {
				newdata.data[m] = k.data.data[m].map( function(d){ return d;});
				newdata.data[1-m] = k.data.data[1-m]
					.map( function(v){ return v.map(function(d, i){ return (s==i ? d : 0);}); });
				totalflights[m] = k.data.total_flights[m];
				totalflights[1-m] = k.data.total_flights[1-m]
				.map( function(v){ return v.map(function(d, i){ return (s==i ? d : 0);}); });
			}			
			
			transition(visualize(newdata, totalflights), k.id);
				
			var selectedBar = d3.select("#"+k.id).select(".part"+m).select(".mainbars")
				.selectAll(".mainbar").filter(function(d,i){ return (i==s);});
			
			selectedBar.select(".mainrect").style("stroke-opacity",1);			
			selectedBar.select(".barlabel").style('font-weight','bold');
			selectedBar.select(".barvalue").style('font-weight','bold');
			selectedBar.select(".barpercent").style('font-weight','bold');
			selectedBar.select(".bartotalflights").style('font-weight','bold');
		});
	}	
	
	/**
	bP.selectSegment = function(data, m, s){
		data.forEach(function(k){
			var newdata =  {keys:[], data:[]};	
				
			newdata.keys = k.data.keys.map( function(d){ return d;});
			
			newdata.data[m] = k.data.data[m].map( function(d){ return d;});
			
			newdata.data[1-m] = k.data.data[1-m]
				.map( function(v){ return v.map(function(d, i){ return (s==i ? d : 0);}); });
			
			
			transition(visualize(newdata), k.id);
				
			var selectedBar = d3.select("#"+k.id).select(".part"+m).select(".mainbars")
				.selectAll(".mainbar").filter(function(d,i){ return (i==s);});
			
			selectedBar.select(".mainrect").style("stroke-opacity",1);			
			selectedBar.select(".barlabel").style('font-weight','bold');
			selectedBar.select(".barvalue").style('font-weight','bold');
			selectedBar.select(".barpercent").style('font-weight','bold');
		});
	}	
	**/
	
	
	bP.deSelectSegment = function(data, m, s){
		data.forEach(function(k){
			transition(visualize(k.data, k.data.total_flights), k.id);
			
			var selectedBar = d3.select("#"+k.id).select(".part"+m).select(".mainbars")
				.selectAll(".mainbar").filter(function(d,i){ return (i==s);});
			
			
			selectedBar.select(".mainrect").style("stroke-opacity",0);			
			selectedBar.select(".barlabel").style('font-weight','normal');
			selectedBar.select(".barvalue").style('font-weight','normal');
			selectedBar.select(".barpercent").style('font-weight','normal');
			selectedBar.select(".bartotalflights").style('font-weight','normal');
		});		
	}
	
	this.bP = bP;
}();