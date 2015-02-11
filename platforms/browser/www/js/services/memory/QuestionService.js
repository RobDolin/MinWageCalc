var QuestionService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var question = null;
        var l = questions.length;
        for (var i=0; i < l; i++) {
            if (questions[i].id == id) {
                question = questions[i];
                console.log("Returning question: " + question);
                break;
            }
        }
        deferred.resolve(question);
        return deferred.promise();
    }

    var questions = [
        {"id": "work-seattle", "summary":"Employed in Seattle", "prompt":"Is your place of employment located in Seattle?", choices:[
          {"next": "#question/number-employees", "value": "yes", "text": "Yes"},
          {"next": "#results", "value": "no", "text": "No"}
        ]},
        {"id": "number-employees", "summary":"Number of Employees", "prompt":"How many people work at your employer across the USA?", choices:[
          {"next": "#question/min-compensation", "value": "1-500", "text": "1 - 500"},
          {"next": "#question/medical-benefits", "value": ">500", "text": "Over 500"}
        ]},
        {"id": "medical-benefits", "summary":"Medical Benefits", "prompt":"Does your employer provide medical benefits to you?", choices:[
          {"next": "#results", "value": "yes", "text": "Yes"},
          {"next": "#results", "value": "no", "text": "No"}
        ]},
        {"id": "min-compensation", "summary":"Minimum Compensation", "prompt":"Does your employer provide minimum compensation?", choices:[
          {"next": "#results", "value": "yes", "text": "Yes"},
          {"next": "#results", "value": "no", "text": "No"}
        ]},
    ];

}
