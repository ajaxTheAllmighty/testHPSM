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