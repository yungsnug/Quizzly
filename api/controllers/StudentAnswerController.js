/**
 * StudentAnswerController
 *
 * @description :: Server-side logic for managing Studentanswers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	getStudentCountByAnswerId: function(req,res) {
    	console.log("--------------getStudentCountByAnswerId");
    	var data = req.params.all();
    	console.log("data: ", data);
    	StudentAnswer.count({answer: data.id}).exec(function(err, found){
    		console.log("found: ", found);
    		return res.json(found);
    		
    	});
	}

	
};

