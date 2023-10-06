const { default: axios } = require("axios");
const DummyData = require("../models/dummyData");

class AddData {
    async addData(req, res) {
        try {
            const { data } = await axios.get('https://api.worldbank.org/v2/country/cn/indicator/SP.POP.TOTL?format=json')
            const dataToBeAdded = data[1].map((item) => {
                return {
                    country: item.country.value,
                    value: item.value,
                    date: item.date,
                    countryiso3code: item.countryiso3code
                }
            })
            const user = await DummyData.insertMany(dataToBeAdded)
            // console.log(dataToBeAdded)
            return res.status(200).json({
                message: "Data added successfully",
                data: dataToBeAdded
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    async getData(req, res) {
        try {
            const { countries, fromYear, toYear } = req.body;
            // console.log(countries,fromYear,toYear);
            const allselectedCountries = countries.map((item) => {
                return item.value
            })
            const startDate = new Date(fromYear);
            const endDate = new Date(toYear);

            if ((countries.length === 0 && fromYear === "" && toYear === "")
                || (countries.length === 0 && fromYear !== "" && toYear !== "")
                || (countries.length !== 0 && fromYear !== "" && toYear === "")
                || (countries.length !== 0 && fromYear === "" && toYear !== "")
            ) {
                return res.status(200).json({
                    message: "Please select all the fields",
                });
            }
            else if (countries.length !== 0 && fromYear !== "" && toYear === "") {
                return res.status(200).json({
                    message: "Please select atleast one country ",
                });
            }
            else if (startDate > endDate) {
                return res.status(200).json({
                    message: "From year should be less than To year",
                });
            }
            else if (countries.length != 0 && fromYear === "" && toYear === "") {

                // console.log(allselected)
                const data = await DummyData.find({ country: { $in: allselectedCountries } })
                let separateData = [];
                for (let i = 0; i < allselectedCountries.length; i++) {
                    let temp = data.filter((item) => {
                        return item.country === allselectedCountries[i]
                    }
                    )
                    separateData.push(temp)
                }

                return res.status(200).json({
                    data: data,
                    separateData: separateData,
                });
            }
            else if (countries.length !== 0 && fromYear !== "" && toYear !== "") {
                const data = await DummyData.find({ country: { $in: allselectedCountries }, date: { $gte: fromYear, $lte: toYear } })
                let separateData = [];
                for (let i = 0; i < allselectedCountries.length; i++) {
                    let temp = data.filter((item) => {
                        return item.country === allselectedCountries[i]
                    }
                    )
                    separateData.push(temp)
                }

                return res.status(200).json({
                    data: data,
                    separateData: separateData
                });
            }

            //    return res.status(200).json({
            //         message: "Data added successfully",
            //         data: []
            //     });

            // const data= await DummyData.find({country:country,date:{$gte:fromYear,$lte:toYear}})

            // const data= await DummyData.find()
            // return res.status(200).json({
            //     data: data
            // });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    async getAllData(req, res) {
        try {
            const data = await DummyData.find();
            return res.status(200).json({
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async download(req, res) {
        try {
            const data = req.body
            // console.log(data);


            return res.json({
                message: "exported successfully"
            })
        }
        catch (e) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = new AddData();