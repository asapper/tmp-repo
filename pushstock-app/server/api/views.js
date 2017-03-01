const Button = require('../app/models/button');


module.exports = {
    // Handle API authentication
    apiAuthProcedure: function(req, res, next) {
        // logging
        console.log('Some authentiation (should be) happening here...');
        next(); // next route
    },

    // Handle index view for API urls
    indexView: function(req, res) {
        console.log("GET: /api/ being accessed");
        res.json({ message: 'Hooray! Welcome to our API!' });
    },

    // Handle the processing of a Single Click received
    singleClickView: function(req, res) {
        // get the button's information
        buttonId = req.body.buttonid;
        clickTimestamp = req.body.click_timestamp;

        console.log("POST: Single Click by button " +
            buttonId + " at " + clickTimestamp);

        // validate button information
        // ...validation here

        // create new Button
        var newBtn = new Button();
        newBtn.buttonId = buttonId;
        newBtn.clickTimestamp = clickTimestamp;

        // save the Button and check for errors
        newBtn.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'New button created!' });
                console.log('New button created!');
            }
        });
    },

    // Handle retrieving all the buttons stored
    getAllButtonsView: function(req, res) {
        console.log("GET: Returning list of buttons...");

        // Find all buttons
        Button.find(function(err, buttons) {
            if (err) {
                res.send(err);
            } else {
                res.json(buttons);
                console.log('Returning a list of all the buttons in the database!');
            }
        });
    }

};