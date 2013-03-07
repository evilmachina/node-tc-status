var _things = [];

var createThing = function(){
    return { 
		"name": 'Coffee',
		"id": 3432,
		"iconType": "coffe",
		//"position": config.getPosition(),
		"quickAction":{"type":"button", "name":"Coffee break?", "id":"1"},
		"actionControles": [
                {"type":"button", "name":"Coffee break?", "id":"1"}
            ]
	};	
};

module.exports.thing = createThing();