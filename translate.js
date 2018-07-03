

// var name = vars['$tName']);
// var dateCreated = vars['$tCDate']);
// var dateUpdated = vars['$tUDate']);
// var contact = vars['$tContact']);
// var isActive = vars['$tActive']);
// var id = vars['$tId']);
// var whoUpdated = vars['$tWho']);
// var selected = vars['$tSel']);
// var data;
//
//
//
//
// 	if(selected){
// 		data = lib.c.$('infFilials').select("id=/"id/"").uniqueResult();
// 		print(data);
// 		//lib.c.$('infFilialsNew').radd(data);
// 	}


function buildHTML(){
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	var data = []);
	var file = new SCFile('infFilialsNew');
	var query = file.doSelect('true');
	var cnt = 0;
	var rowId = 0;
		if(query == RC_SUCCESS){
			do{
				data[cnt] = {'name':file['name'],'dateCreated':file['dateCreated'],'dateUpdated':file['dateUpdated'],'isActive':file['isActive'],'contact':file['contact'],'whoUpdated':file['whoUpdated'],id:file['id'],phase:file['current.phase']};
				cnt++;
			}while(file.getNext() == RC_SUCCESS)
		}
	//print(data);
	var active;
		sHtmlReturn += "<table class=\"main\">" + sCR;
		// Table header
		sHtmlReturn += "<tr><th><div tabindex=\"0\"> Название </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Дата создания </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Дата обновления </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Активно? </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> Контакт </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> Кем обновлено </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> ID </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> Фаза </div></th>";
		//sHtmlReturn += "<th><div tabindex=\"0\"> Выбор </div></th>";	//		Не нужно

	for (var i =0; i<data.length; i++) {
	//print(data[i]);
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
		if(data[i]['isActive']){
			active = "ДА"
		}
		else{
			active = "НЕT"
		}
			sHtmlReturn += "<tr id ="+rowId+">";
			if(data[i]['name']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['name']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['dateCreated']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['dateCreated']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['dateUpdated']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['dateUpdated']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+active+"</td>";
			if(data[i]['contact']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['contact']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['whoUpdated']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['whoUpdated']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['id']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['id']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['current.phase']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['current.phase']+"</td>";
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			sHtmlReturn += "<tr>";
			rowId++;
	}
			sHtmlReturn += "</table>" + sCR;
		return sHtmlReturn;
}


function getCSS(){
	var style;
	style =		"<style> ";
	style +=	"body{border:0 0 0 0;margin:0;padding:0;font-family: Verdana, Arial, Helvetica, sans-serif;}";
	style +=	".error{color: #454323;background: white;}";
	style +=	".error td{padding:1 2 1 1;color: red;line-height: 12;}";
	style +=	".main{width:100%;font-size: 10;text-align: left}";
	style +=	".main th{font-weight: bold;padding:4;background: #E0E0E0;}";
	style +=	"th.rowtitle{font-weight: bold;padding:4;background: #99BBE8;}";
	style +=	".oddRow{background: #edf3fe;color: black}";
	style +=	".evenRow{background: white;color: black}";
	style +=	".message{background: white;color: blue}";
	style +=	"</style>"

	return style;

}

// Эти две функции лежат в sl
// Вызываются на форме

function TEST__getSelectedOption(){

	var elem = document.getElementById('0');
	print(elem.lastChild);

}


function mergeData(){
	var $ = lib.c.$;
	var data = $('infFilials').select("true").iterate(function(item){
		//print(item);
		if(!item['name']==""){
		vars['$tName']=system.functions.insert(vars['$tName'],0,1,item['name']);
		}
		else{
			vars['$tName']=system.functions.insert(vars['$tName'],0,1," ");
		}
		if(!item['dateCreated']==""){
			vars['$tCDate']=system.functions.insert(vars['$tCDate'],0,1,item['dateCreated']);
		}
		else{
			vars['$tCDate']=system.functions.insert(vars['$tCDate'],0,1," ");
		}
		if(!item['dateUpdated']==""){
			vars['$tUDate']=system.functions.insert(vars['$tUDate'],0,1,item['dateUpdated']);
		}
		else{
			vars['$tUDate']=system.functions.insert(vars['$tUDate'],0,1," ");
		}
		if(item['isActive']){
			vars['$tActive']=system.functions.insert(vars['$tActive'],0,1,"ДА");
		}
		else{
			vars['$tActive']=system.functions.insert(vars['$tActive'],0,1,"НЕТ");
		}
		if(!item['contact']==""){
			vars['$tContact']=system.functions.insert(vars['$tContact'],0,1,item['contact']);
		}
		else{
			vars['$tContact']=system.functions.insert(vars['$tContact'],0,1," ");
		}
		if(!item['merge.selection']==""){
			vars['$tSelection']=system.functions.insert(vars['$tSelection'],0,1,item['merge.selection']);
		}
		else{
			vars['$tSelection']=system.functions.insert(vars['$tSelection'],0,1," ");
		}
		if(!item['whoUpdated']==""){
			vars['$tWho']=system.functions.insert(vars['$tWho'],0,1,item['whoUpdated']);
		}
		else{
			vars['$tWho']=system.functions.insert(vars['$tWho'],0,1," ");
		}
		if(!item['id']==""){
			vars['$tId']=system.functions.insert(vars['$tId'],0,1,item['id']);
		}
		else{
			vars['$tId']=system.functions.insert(vars['$tId'],0,1," ");
		}
		if(!item['current.phase']==""){
			vars['$tPhase']=system.functions.insert(vars['$tPhase'],0,1,item['current.phase']);
		}
		else{
			vars['$tPhase']=system.functions.insert(vars['$tPhase'],0,1," ");
		}
	});
	// print(vars['$tName']);
	// print(vars['$tCDate']);
	// print(vars['$tUDate']);
	// print(vars['$tActive']);
	// print(vars['$tContact']);
	// print(vars['$tSelection']);
	// print(vars['$tWho']);
	// print(vars['$tId']);
	// print(vars['$tPhase']);
	});
}
// Находится в визарде



function drawMergedData(){
	var $ = lib.c.$;
	var data = new Array;
	var updQuery;
	var query = $('infFilials').select('merge.selection="Обновить"').iterate(function(item){
		data.push(item);
	});
	for(var rec in data){
		updQuery = $('infFilialsNew').radd(rec);
	}
}
