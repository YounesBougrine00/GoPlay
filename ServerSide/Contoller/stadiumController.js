const { Stadium } = require("../models/stadiumsModel");


const stadiumController = {
    getStadiums: async(req, res) => {
        try {
            const { city, sportType } = req.body
            if (!city || !sportType) return res.status(400).json({ message: "Please fill all the fields" });

            const stadiums = await Stadium.find({ city: city.label, sports: sportType.label })

            if (stadiums.length == 0) return res.status(400).json({ message: "No Result for your selected options" });

            console.log(stadiums);

            return res.status(200).json(stadiums);


        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getStadiumsByName: async(req, res) => {
        try {
            const { query } = req.body
            if (query === "") return res.status(400).json({ message: "Please fill the search name" });

            const stadium = await Stadium.find({ name: { $regex: ".*" + query + ".*" } })
            if (stadium.length == 0) return res.status(400).json({ message: `No Result for the name : ${query}` });

            return res.status(200).json(stadium);

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getStadiumInfos: async(req, res) => {
        try {
            const stadium = await Stadium.findById(req.params.sid)
            console.log(stadium)
            console.log("stadium infos")
            res.json(stadium)
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = stadiumController;