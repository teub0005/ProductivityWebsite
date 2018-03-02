var currentPhoto;

function setup()
{
	hideLightBox();
	var picTable = document.getElementById("pictureTable");
    picTable.addEventListener("click", lightBox, false);
	currentPhoto = 1;
	
	console.log("javascript ready");
}
function move()
{
	var x = event.which || event.keyCode;
	if(x == 27)
	{
		hideLightBox();
	}
	if(x ==  37)
	{
		prevImg();
	}
	if(x ==  39)
	{
		nextImg();
	}
}
function lightBox(event)
{
	showLightBox();
	currentPhoto = event.target.id;
	document.getElementById("forLight").innerHTML = "<img src=\"photos/" + currentPhoto + ".jpg\"><div></src> <button type=\"button\" onclick=\"prevImg()\"><-</button><button type=\"button\" onclick=\"hideLightBox()\">x</button><button type=\"button\" onclick=\"nextImg()\">-></button></div>"
	
    console.log("clicked on " + event.target.id);
}
function nextImg()
{
	currentPhoto++;
	document.getElementById("forLight").innerHTML = "<img src=\"photos/" + currentPhoto+ ".jpg\"><div></src> <button type=\"button\" onclick=\"prevImg()\"><-</button><button type=\"button\" onclick=\"hideLightBox()\">x</button><button type=\"button\" onclick=\"nextImg()\">-></button></div>"
}
function prevImg()
{
	currentPhoto--;
	document.getElementById("forLight").innerHTML = "<img src=\"photos/" + currentPhoto+ ".jpg\"><div></src> <button type=\"button\" onclick=\"prevImg()\"><-</button><button type=\"button\" onclick=\"hideLightBox()\">x</button><button type=\"button\" onclick=\"nextImg()\">-></button></div>"
}
function showLightBox()
{
	document.getElementById("forLight").style.display = "block";
}
function hideLightBox()
{
	document.getElementById("forLight").style.display = "none";
}