var toDoArray;
var catArray;
var colorArray;
var currentNumber;
var selected;
function setup()
{
	toDoArray = [];
	catArray = ["homework","exercise","fun","chores"];
	colorArray = ["red","blue","green","purple"]
	updateCategories();
	currentNumber = 0;
	
	var calendar = document.getElementById("calendar");
    calendar.addEventListener("click", selectDate, false);
	populateDays(31);
	
	console.log("javascript ready");
	
}
function addToDo()
{

	var descript = document.getElementById("descript").value;
	if(descript === null){console.log("addToDo: descript is null");return;}
	
	
	var deadDay = selected;
	if(deadDay === undefined)
	{
		console.log("addToDo: deadDate is undefined");
		window.alert("please select a date");
		return;
	}
	var deadMonth = document.getElementById("month").innerHTML;
	
	var deadTime = document.getElementById("deadTime").value;
	if(deadTime === null){console.log("addToDo: deadTime is null");return;}
	
	var category = document.getElementById("categoryInput").value;
	if(category === null){console.log("addToDo: category is null");return;}
	
	
	
	//is it a new category?
	var exists = false;
	for(i=0;i<catArray.length; i++)
	{
		if(catArray[i] === category)
		{exists = true; break;}
	}
	if(!exists) //display new categories
	{
		catArray.push(category);
		var newColor = window.prompt("What color do you want for your new category?")
		colorArray.push(newColor);
		updateCategories();
	}
	
	
	//add todo to array
	currentNumber = currentNumber + 1;

	toDoArray.push( new toDoEntry(descript, deadDay, deadMonth, deadTime, category, currentNumber) );
	
	//display
	var theList = document.getElementById("theList");
	var newEntry = "<div id=\"elem" + currentNumber + "\" class=\"listElem " + category + "\"> " + descript +" " + deadMonth + " " + deadDay + " " + deadTime + " " + category + " uncompleted "+
						"<button type=\"button\" onclick=\"deleteEntry(" + currentNumber + ")\">delete</button><button type=\"button\" onclick=\"complete("
								+ currentNumber + ")\">complete?</button></div>"
	theList.innerHTML = theList.innerHTML + newEntry;
	document.getElementById("elem"+currentNumber).style.backgroundColor = colorArray[ catArray.indexOf(category) ];
	//log
	console.log("addToDo: new entry added");
}
function deleteEntry(number)
{
	if(window.confirm("Are you sure you want to delete this entry?"))
	{
		var removed = false;
		var temp;
		var name;
		for(i = 0; i< toDoArray.length; i++)//find it
		{
			if(number === toDoArray[i].index)
			{
				//remove it
				name = "elem" + toDoArray[i].index;
				toDoArray.splice(i, 1);
				removed = true;
				break;
			}
		}	
		//remove it from html
		if(removed)
		{
			temp = document.getElementById(name);
			temp.parentNode.removeChild(temp);
		}
		console.log("deleteEntry : entry " + number + " removed");
	}
	else
	{
		console.log("deleteEntry : delete canceled");
	}
}
function complete(number)
{
	var temp;
	for(i = 0; i< toDoArray.length; i++)//find it
	{
		if(number === toDoArray[i].index)
		{
			temp = toDoArray[i];
			toDoArray[i].complete = true;
			name = "elem" + toDoArray[i].index;
			break;
		}
	}
	document.getElementById(name).innerHTML = temp.description + " " + temp.deadMonth + " " + temp.deadDay + " " + temp.deadTime + " " + temp.category + " completed "+
						"<button type=\"button\" onclick=\"deleteEntry(" + temp.index + ")\">delete</button></div>";
	document.getElementById(name).style.backgroundColor = colorArray[ catArray.indexOf(temp.category) ];
						
	console.log("complete : entry " + number + " completed");
}
function updateCategories()
{
	//used to update categories display 
	var temp ="";
	for(i = 0; i < catArray.length; i++)
		{temp = temp + catArray[i] + ", ";}
	document.getElementById("categoryDisplay").innerHTML = temp;
}
function sortByAdded()
{
	var temp;
	for (i = 0; i < toDoArray.length - 1; i++)      
	{
		for (j = 0; j < toDoArray.length - 1; j++)
		{
			if(toDoArray[j].index > toDoArray[j+1].index)
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
		}
	}
	updateEntries();
	
    console.log("sortByAdded: complete");
}
function updateEntries()
{
	var temp;
	for (i = 0; i < toDoArray.length; i++)      
	{
		if(toDoArray[i].complete)
		{
		temp = "<div id=\"elem" + toDoArray[i].index + "\" class=\"listElem " + toDoArray[i].category + "\"> " + toDoArray[i].description +" " + toDoArray[i].deadMonth +  " " + toDoArray[i].deadDay + " " + toDoArray[i].deadTime + " " + toDoArray[i].category + " completed "+
				"<button type=\"button\" onclick=\"deleteEntry(" + toDoArray[i].index + ")\">delete</button></div>"
		}
		else
		{
		temp = "<div id=\"elem" + toDoArray[i].index + "\" class=\"listElem " + toDoArray[i].category + "\"> " + toDoArray[i].description +" " + toDoArray[i].deadMonth +  " " + toDoArray[i].deadDay + " " + toDoArray[i].deadTime + " " + toDoArray[i].category + " uncompleted "+
				"<button type=\"button\" onclick=\"deleteEntry(" + toDoArray[i].index + ")\">delete</button><button type=\"button\" onclick=\"complete("
					+ toDoArray[i].index + ")\">complete?</button></div>"
		}
		
		if(i == 0)
		{
			document.getElementById("theList").innerHTML = temp;
		}
		else
		{
			document.getElementById("theList").innerHTML = document.getElementById("theList").innerHTML + temp;
		}
		document.getElementById("elem" + toDoArray[i].index).style.backgroundColor = colorArray[ catArray.indexOf(toDoArray[i].category) ];
	}
}
function sortByComplete()
{
	var temp;
	for (i = 0; i < toDoArray.length - 1; i++)      
	{
		for (j = 0; j < toDoArray.length - 1; j++)
		{
			if( toDoArray[j].complete && ( ! toDoArray[j+1].complete)) //incomplete -> complete
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
		}
	}
	updateEntries();
	
    console.log("sortByComplete: complete");
}
function sortByCategory()
{
	var temp;
	for (i = 0; i < toDoArray.length - 1; i++)      
	{
		for (j = 0; j < toDoArray.length - 1; j++)
		{
			
			if( catArray.indexOf( toDoArray[j].category) > catArray.indexOf( toDoArray[j+1].category)) //if category is earlier in catArray
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
		}
	}
	updateEntries();
	
    console.log("sortByCategory: complete");
}
function sortByDeadline()
{
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	
		var temp;
	for (i = 0; i < toDoArray.length - 1; i++)      
	{
		for (j = 0; j < toDoArray.length - 1; j++)
		{
			
			if( months.indexOf( toDoArray[j].deadMonth) > months.indexOf( toDoArray[j+1].deadMonth)) //if deadMonth is earlier in months
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
			if(( months.indexOf( toDoArray[j].deadMonth) === months.indexOf( toDoArray[j+1].deadMonth) )&&( toDoArray[j].deadDay > toDoArray[j+1].deadDay ))
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
			if(( months.indexOf( toDoArray[j].deadMonth) === months.indexOf( toDoArray[j+1].deadMonth) )&&( toDoArray[j].deadDay === toDoArray[j+1].deadDay )&&( toDoArray[j].deadTime > toDoArray[j+1].deadTime ))
			{
				temp = toDoArray[j];
				toDoArray[j] = toDoArray[j+1];
				toDoArray[j+1] = temp;
			}
		}
	}
	updateEntries();
	
    console.log("sortByDeadline: complete");	
}

function nextMonth()
{
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var daysInMonth = [31,28,31 ,30 ,31 ,30 ,31 ,31 ,30 ,31 ,30 ,31 ];
	
	var temp = document.getElementById("month").innerHTML;
	var idx = months.indexOf(temp);
	if(idx !== 11)
	{
		document.getElementById("month").innerHTML = months[idx + 1];
		populateDays(daysInMonth[idx+1]);
	}
}
function prevMonth()
{
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var daysInMonth = [31,28,31 ,30 ,31 ,30 ,31 ,31 ,30 ,31 ,30 ,31 ];
	
	var temp = document.getElementById("month").innerHTML;
	var idx = months.indexOf(temp);
	if(idx !== 0)
	{
		document.getElementById("month").innerHTML = months[idx - 1];
		populateDays(daysInMonth[idx-1]);
	}
	
}
function populateDays(number)
{
	//cell_5.6
	// 0-5 rows 0-6 width
	var name;
	var r=0;
	var c=0;
	//zero out
	for(i = 0; i < 42; i++)
	{
		name = "cell_" + r + "." + c;
		
		document.getElementById(name).innerHTML = "";
		
		if(c === 6)
		{
			c = 0;
			r++;
		}
		else
		{
			c++;
		}
	}
	r=0;
	c=0;
	for(i = 0; i < number; i++)
	{
		name = "cell_" + r + "." + c;
		
		document.getElementById(name).innerHTML = (i+1);
		
		if(c === 6)
		{
			c = 0;
			r++;
		}
		else
		{
			c++;
		}
	}
	console.log("populateDays : done");
}



function selectDate(event) {
    selected = event.target.innerHTML;
}


class toDoEntry
{
	constructor(description, deadDay, deadMonth, deadTime, category, index)
	{
		this.description = description;
		this.deadDay = deadDay;
		this.deadMonth = deadMonth;
		this.deadTime = deadTime;
		this.category = category;
		this.complete = false;
		this.index = index; //will function as when it was added
	}
}
