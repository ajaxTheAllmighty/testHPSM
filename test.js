//SD99944


function SCFQuery(){
	var query = new SCFile('incidents');
	query.doSelect('incident.id = "SD99944"');
	print('Using SCFile');
	return query['callback.contact'] + ' '+ query['incident.id'];
}

function $Query(){
	var $ = lib.c.$;
	var query = $('incidents').select('incident.id = "SD99944"').uniqueResult();
	print('Using lib.c.$');
	return query['callback.contact'] + ' '+ query['incident.id'];
}

function SCFMultipleQueries(){
	print('SCF multiple');
	var results = new Array;
	var query = new SCFile('incidents');
	var result = query.doSelect('incident.id#"SD9994"');
		if(result == RC_SUCCESS){
			do{
				results.push(query['incident.id'])
			}while(query.getNext() == RC_SUCCESS)
		}
		print(results);
		/*print('results:');
		for (var currentResult = 0; currentResult < results.length; currentResult++){										//Print template 
			print(results[currentResult]['callback.contact']+'with id ='+results[currentResult]['incident.id'])				//results FALCON, JENNIFER with id = SD99944
		}*/
}

function $MultipleQueries(){
	print('LibC$ multiple');
	var $ = lib.c.$;
	var results = new Array;
	var query = $('incidents').select('incident.id#"SD9994"').iterate(function(item){
		//print(item);
		results.push(item['incident.id']);
	});
	print(results);
	/*for(var currentResult = 0; currentResult < results.length; currentResult++){
		print(results[currentResult]['incident.id'])
	}*/
}

function setCreateDate(newRecord){
	newRecord['dateCreated'] = system.functions.tod();
	if (newRecord['name']=='555'){
		newRecord.isActive = true;
	}
	return newRecord;
}

function setUpdateDate(newRecord){
	newRecord['dateUpdated'] = system.functions.tod();
	if(newRecord['name']=='555'){
		newRecord['isActive']=true;
	}
	return newRecord;
}


function testOp(){
	print(system.functions.operator());
}

function whoUpdated(newRecord){
	newRecord['updOperator'] = system.functions.operator();
	system.functions.operator();
	return newRecord;
}

function printOPs(newRecord){
	var ops = newRecord['operators'].toArray();
	for(var currentOp = 0; currentOp < ops.length; currentOp++){
		if(ops[currentOp].match(/falcon.*/)){
			print('falcon here')
		}
	}
}


/*$fill.search.format="contacts.search";
if (not  (null(contact.name in $File))) then ($query="contact.name#contact.name in $File") else ($query="true")
if ($G.multi and not  (null(company in $File))) then ($query=$query+" and company=\""+evaluate(company in $File)+"\"")
if $query#"true and " then ($L.void=strclpl($query, 9))

/*print (SCFQuery());
print($Query());
SCFMultipleQueries();
$MultipleQueries();*/

function preProcess(){
	print('process starting');
	print(system.functions.operator());
	print(vars['$L.file']);
}

function postProcess(){
	print('process ended');
}


vars['$L.file']

var filials = lib.c.$('INFfilials').select().uniqueResult();
var name,dateCreated,dateUpdated,contact,whoUpdated;
if(filials != null){
	name = filials.name;
	dateCreated = filials.dateCreated;
	dateUpdated = filials.dateUpdated;
	contact = filials.contact;
	whoUpdated = filials.whoUpdated;
}


print('send');
var fContact = new SCFile("contacts", SCFILE_READONLY);
fContact.doSelect('contact.name#"falcon"');
users = fContact.operator.id;
print(users);


for(var _usr in users){
	print _usr.contact.name
}

function buildNotification(){
	var data = new Array;
	var falc,pr3;
	falc= lib.c.$('contacts').select('contact.name#"falcon"').uniqueResult();
	data.push(falc.email);
	print(falc);
	pr3 = lib.c.$('contacts').select('contact.name#"prog3"').uniqueResult();
	data.push(pr3.email);
	print(pr3);
	print(data);x
	return data;
}



var name,dateCreated,dateUpdated,contact,isActive,whoUpdated;
	name = $RECORD.name;	
	dateCreated = $RECORD.dateCreated;
	dateUpdated = $RECORD.dateUpdated;
	contact = $RECORD.contact;
	isActive = $RECORD.isActive;
	whoUpdated = $RECORD.whoUpdated;
var active;
	if(isActive){
		active = "ДА"
	}
	else{
		active = "нет"
	}

	lib.DDCCallRAD.us_notify("INF Filials test notification", record);


function getEmail(who){
	print('start script');
	var contact = lib.c.$('contacts').select('operator.id#'+'"'+who+'"').uniqueResult();
	print(contact);
	print(contact.email);
	//return [contact.email];
	return [contact.email,"test"];
}

function getOUTConts(){
	var found = new Array;
	var query = lib.c.$('contacts').select('company = "OUT"').iterate(function(item){
		found.push(item['incident.id']);
	});
	return found;
}


function myLink(fRecord,fieldName,linkName,boolean1){
	if (fRecord==null || fieldName==null || fieldName==""){
		return;
	}
	var rteReturnValue = new SCDatum();
	var rteNames = new SCDatum();
	var rteValues = new SCDatum();

	rteNames.setType(8);
	rteNames.push("record"); 		
	rteNames.push("name");
	rteNames.push("string1");
	rteNames.push("prompt");
	rteNames.push("boolean1");

	rteValues.setType(8);
	rteValues.push(fRecord);
	rteValues.push(fieldName);
	rteValues.push(linkName);
	rteValues.push("fill");
	rteValues.push(boolean1);
	print("rteNames="+rteNames);
	print("rteValues="+rteValues);
	
	system.functions.rtecall("callrad", 
								rteReturnValue, 
								"us.link",
								rteNames, 
								rteValues,
								true); //false to run in same thread, true to run in new thread	*/
}


function buildHTML(){
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	var data = new Array;
	var query = lib.c.$('infFilials').select('*').iterate(function(item){
	data.push(item);
	});
	var i;
	var active;
		sHtmlReturn += "<table class=\"main\">" + sCR;
		// Table header          
		sHtmlReturn += "<tr><th><div tabindex=\"0\"> Название </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Дата создания </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Дата обновления </div></th>"
		sHtmlReturn += "<th><div tabindex=\"0\"> Активно? </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> Контакт </div></th>";
		sHtmlReturn += "<th><div tabindex=\"0\"> Кем обновлено </div></th>";
		//sHtmlReturn += "<th><div tabindex=\"0\"> Операторы</div></th></tr>";

	for (var recrod in data) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
		if(record['isActive']){
			active = "ДА"
		}
		else{
			active = "НЕН"
		}
			sHtmlReturn += "<tr>";
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+record['name']+"</td>";            
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+record['dateCreated']+"</td>";
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+record['dateUpdated']+"</td>";
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+active+"</td>";
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+record['contact']+"</td>";
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+record['whoUpdated']+"</td>";
			//sHtmlReturn += "<td class=\""+sRowClass+"\" >"+fnull(attrib[j+5])+"</td>";
			sHtmlReturn += "<tr>";
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