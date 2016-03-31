/**
 * StudentAnswerController
 *
 * @description :: Server-side logic for managing Studentanswers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	getStudentCountByAnswerId: function(req,res) {
    	console.log("--------------getStudentCountByAnswerId");
    	// var data = req.params.all();
        var id = req.param('id');
        var section = req.param('section');
    	console.log("id: ", id);
        console.log("section: ", section);
        if (section == -1) {
            StudentAnswer.count({answer: id}).exec(function(err, found){
            console.log("found: ", found);
            return res.json(found);
            
        });
        } else {
        // console.log("data.section", data.section);
    	StudentAnswer.count({answer: id, section: section}).exec(function(err, found){
    		console.log("found: ", found);
    		return res.json(found);
    		
    	});
    }
	}

	
};

