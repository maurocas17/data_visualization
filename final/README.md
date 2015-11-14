<h2>Summary</h2>
This data visualization shows the factors the affect Flight Performance for the top 4 US Airline and the top
12 busiest airport in the United States.   These factors include delays, which are further categorized into
five (Late-Arriving Aircraft, National Aviation System, Air Carrier, Extreme Weather
and Security), cancellations and diversions.   The percentage count for each factor shows that Late-Arriving
Aircraft is the major cause of delay.  The percentage of the total performance against the Total Flights 
for each Airline and Airport measures the overall flight performance, thus, show the Airline and Airport with the
lowest performance. 

<h2>Design</h2>
The design of the visualization is based on bipartite graph, which models the relationship of two different
classes of objects.  There are two bipartite graphs included in the visualization: One is a relationship between
Flight Performance and Airlines and the other is Flight Performance and Airports.  When I was looking
for a design, I kept coming back to the bipartite visualization sample from <a href="http://bl.ocks.org/NPashaP/9796212">
NPashaP</a> and I thought that this is great in showing relationship at the same time conveying the 
proportion of the relationship with the use of color scheme and count value.   So, in choosing bipartite, 
I was able to show the proportion of each performance factor between Airlines and Airports at the same time
show a comparison among the performance factors, among the Airlines and among the Airports.   I've also included
the percentage of that performance against the Total Flights, which shows the overall performance of an Airline
or an Airport and also gives the true proportion of the performance factor compared to the other factors and
on-time data.  <p>

The downside of this design is not being able to show all the airlines and airports as the relationship bar scrolls 
further down below.  Thus, not being able to see the whole relationship in one screen.   In the <a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/firstTry/index.html">
firstTry</a>, I showed bipartite graph between the performance factor and the 4 largest Airline and bipartite
graph between the performance factor and states.  I wanted to show the Airports but it's too many, thus I contented
myself with States.  However, it still does not fit one screen.  I got feedback about the length
of the graph and how his laptop is too short to see all the airlines.   I already have hesitation on the 
length of the graph, this feedback just strengthen my belief to make it short so that it can fit one screen by
including only the top 12 busiest airports.
I also got feedback about the descriptions of the delays and to make them pop-out.  So, I added a delay descriptions
at the top of the page as well as made the performance factor bolder.  Another feedback I got is the name of the
Airlines, so I added tooltip that gives the full names of the all the performance factor, airlines and airports 
included.  I also added the value of total flights in the tooltip for a nice-to-know information, as this gives 
credence to the % of Total Flight value.  <p/>

All the feedback received in the <a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/firstTry/index.html">firstTry</a>
have been incorporated to the my <a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/secondTry/index.html">secondTry</a>.
Here, the main feedback I got is that the explanation about the graph is more suited for an exploratory rather 
than explanatory as required in the project rubic.  As a programmer, I can sometimes loose myself in the process of 
building something useful, something that you can get a lot of information out of.   So, this feedback made
me think on what I really want to convey.  So, I thought of changing the color scheme to just using one tone (blue)
and adding red text to what relationship I want to emphasize.  So, I easily thought of the performance factor.  I
want to show which factor is the highest cause of low performance.   At the same time, I also want the reader
to know which Airline or Airport has the lowest performance.  So, I highlighted the text in red to convey this
message.   I showed my visualization to a friend and he gave me feedback on the order of the Airlines and Airports.  He said that it would be 
nice to see which one is the top Airline and which one is the busiest Airport.  This definitely make sense, so I
changed the order from top to bottom; for Airlines, from largest to smallest and top Airport being the busiest.</p>

I showed my <a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/thirdTry/index.html">thirdTry</a>
to another friend.  He gave me feedback on the paragraph and Delay Reasons.  He mentioned that the paragraph does not effectively
convey the lowest performance, specifically in the statement "Late-Arriving Aircraft is not the number one cause of delay for that Airline or Airport"
is confusing as well as the "volume of on-time flights", which is not easily seen at all.   

So, I changed the "Delay Reasons" to "Performance Factors" and updated the message to emphasize lowest
performance.  The final changes are incorporated in my <a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/final/index.html">final graph.</a>


<h2>Feedback</h2>
<table width="100%">
	<tr><td><b>Version</b></td><td><b> Reviewer</b></td><td><b>Feedback</b></td></tr>
	<tr><td valign="top">
		<a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/firstTry/index.html">FirstTry</a>
	</td><td valign="top">
		Stephen1
	</td><td>
		Thanks for posting! It looks like you put a lot of work into your visualization here. I am going to just post my immediate and unorganized thoughts about the visualization - hopefully there will be something useful.
		<br>
		What do you notice in the visualization?
		<ul><li>
		It would be great to have some brief descriptions of each of the 
		delay reasons somewhere on the page. I know that they are linked from
		the page, but as I explore the visualization, I keep having to refer 
		back to the definitions to remind myself: "what is included in NAS 
		again?"</li>
		<li>That being said, I am totally surprised that NAS contributes to such a large number of
		delays compared to weather :smiley: </li>
		<li>I would like all of the titles on the sides of the plots to be capitalized for each the categories (aircraft, nas, etc.). I feel like this will help them stand out more. Maybe they could be a bolder font as well?</li>
		<li>My laptop screen is too short to see all of the airlines when I hover over the "aircraft" delay reason. I'm not sure that there is anything that can be done about this, and I'm sure it would look fine if I were viewing this on a regular screen.</li>
		</ul>
		<br>
		What questions do you have about the data?
		<li>
		Which airline is WN? They seem late all the time, and I might not want to
		fly with them.
		</li>
		<br>
		What do you think is the main takeaway from this visualization?
		<li>
		Late arriving aircraft cause most of the late departures, followed by
		air carrier problems. NAS causes a nontrivial percentage of delays.
		</li>
		Is there something you don’t understand in the graphic?
		<li>
		If I hover over 'aircraft', I see 'count' is 15.0 ( 30%) and aircraft
		is 6% of total flights. However, at the same time, AK has a count of 0.0 and 17% of
		total flights. I'm not sure that I completely understand the meaning of 'count' and
		'percentage of total flights' in this scenario.
		Overall, a very interesting visualization. Nice work!
		</li>
	</td></tr>
	<tr><td valign="top">
		<a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/secondTry/index.html">SecondTry</a>
	</td><td valign="top">
		Stephen1
	</td><td>
		The improvements look great! I like how I can hover over the airline letters now and get more information about which airline I'm looking at. I also think the bold, capitalized text for the delay reasons helps the different categories "pop" in the visualization, and the descriptions at the top help as well.
		<br/>
		One thing that I think is important for you to consider is the message of the visualization. Remember that for the final project, the visualization is supposed to be explanatory, not exploratory (see the rubric here). What is the clear finding or relationship in the data that you are trying to express here?
	<td></tr>
	<tr><td>
		&nbsp;
	</td><td valign="top">
		friend 1
	</td><td>
		This is cool.  There's a lot of information, not sure which one to look at.  <br>
		Why don't you change the order?  To better represent the top 4 Airlines and top 12 busiest Airport?
	<td></tr>
	<tr><td valign="top">
		<a href="http://htmlpreview.github.io/?https://github.com/maurocas17/data_visualization/blob/master/thirdTry/index.html">ThirdTry</a>
	</td><td valign="top">
		friend 2
	</td><td>
	    Wow, nice.  But the paragraph is confusing...  I don't understand "We can see here that even-though Late-Arriving Aircraft is the number one cause of delay, it is not the number one cause of delay for that Airline or Airport.".  This information is kind of
	    hard to see.    Also, where is on-time flight data here?  <br>
	    Not sure if Delay Reasons is correct, though... 
	<td></tr>
	<tr><td valign="top">
		<a href="http://bl.ocks.org/maurocas17/raw/e98bc3062035c2629bab/">final</a>
	</td><td>
	</td><td>No feedback yet.
	<td></tr>
</table>


<h2>Resources</h2>
<ul><li>SVG: <a href="http://tutorials.jenkov.com/svg/g-element.html">http://tutorials.jenkov.com/svg/g-element.html</a></li>
	<li>SVG: <a href="http://www.w3schools.com/svg/">http://www.w3schools.com/svg/</a></li>
	<li>SVG:  <a href="https://www.dashingd3js.com/svg-group-element-and-d3js">https://www.dashingd3js.com/svg-group-element-and-d3js</a></li>
	<li>SVG coordinate system: <a href="http://sarasoueidan.com/blog/svg-coordinate-systems/">http://sarasoueidan.com/blog/svg-coordinate-systems/</a></li>
	<li>biPartie: <a href="http://bl.ocks.org/NPashaP/9796212">http://bl.ocks.org/NPashaP/9796212</a></li>
	<li>insert line break: <a href="http://stackoverflow.com/questions/19428669/d3-js-dual-lines-of-text-for-each-tick-on-an-axis">http://stackoverflow.com/questions/19428669/d3-js-dual-lines-of-text-for-each-tick-on-an-axis</a></li>
	<li>DataGrouper: <a href="http://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects">http://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects</a></li>
	<li>underscore js:	<a href="http://underscorejs.org/#groupBy">http://underscorejs.org/#groupBy</a></li>
	<li>word wrap: <a href="http://bl.ocks.org/mbostock/7555321">http://bl.ocks.org/mbostock/7555321</a></li>
	<li>range transition: <a href="http://romsson.github.io/dragit/example/nations.html">http://romsson.github.io/dragit/example/nations.html</a></li>
	<li>data: <a href="http://www.transtats.bts.gov/OT_Delay/OT_DelayCause1.asp">http://www.transtats.bts.gov/OT_Delay/OT_DelayCause1.asp</a></li>
	<li>Understanding Flight Performance:<a href="http://www.rita.dot.gov/bts/help/aviation/html/understanding.html">http://www.rita.dot.gov/bts/help/aviation/html/understanding.html</a></li>
	<li>Top Airlines:<a href="https://en.wikipedia.org/wiki/List_of_largest_airlines_in_North_America">https://en.wikipedia.org/wiki/List_of_largest_airlines_in_North_America</a></li>
	<li>Busiest Airports:<a href="https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States">https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States</a></li>
	<li>Transportation in the US: <a href="https://en.wikipedia.org/wiki/Transportation_in_the_United_States#Passenger">https://en.wikipedia.org/wiki/Transportation_in_the_United_States#Passenger</a></li>
</ul>	
	