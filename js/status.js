Shmita.app.factory('status', function($http, utils, CSV) {
	var language="en";
	
	// Functions
	
	var now = new Date();
	
	listFuncs = {
		kedusha : function(food) {
			return (food.beginKedusha < now && food.endKedusha > now);
		},
		noKedusha : function(food) {
			return !listFuncs.kedusha(food);
		},
	
		sefihin : function(food) {
			return (food.beginSefihin < now && food.endSefihin > now);
		},
	
		noSefihin : function(food) {
			return !listFuncs.sefihin(food);
		},
	
		needsBiur : function(food) {
			return (food.biur < now);
		}
	};
	var foodsImport = [];
	$http.get('./shmita.csv').then(function(result) {
		foodsImport = CSV.CSVToObjects(result.data);
		loadFoods();
	});
	
	function loadFoods() {
		for (var i = 0; i < foodsImport.length; i++) {
			foodsImport[i].beginKedusha = utils.parseDate(foodsImport[i].Kedusha);
			foodsImport[i].endKedusha   = utils.parseDate(foodsImport[i].NoKedusha);
			foodsImport[i].beginSefihin = utils.parseDate(foodsImport[i].Sefihin);
			foodsImport[i].endSefihin   = utils.parseDate(foodsImport[i].NoSefihin);
			foodsImport[i].biur         = utils.parseDate(foodsImport[i].Biur);
		}
	}

			
	function getList(listFunc) {
		var list = [];
		listFunc = listFuncs[listFunc];
		for (var i = 0; i < foodsImport.length; i++) {
			if (listFunc(foodsImport[i])) {
				list.push(foodsImport[i]);
			}
		}
		if (language=="en") {
			list.sort(function(a,b) { return a.English.localeCompare(b.English); } );
		} else {
			list.sort(function(a,b) { return a.Hebrew.localeCompare(b.Hebrew); } );
		}
		return list;
	}

	return {
		getList : getList 
	}
});