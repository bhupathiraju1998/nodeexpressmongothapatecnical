const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select, page, limit } = req.query;
  const queryObject = {};
  let pageNumberGiven = page || 1;
  let limitNumberGiven = limit || 10;

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; //this is used if we pass iphn,iphones,iph etc even then also we will get results and also for casesensitive also
  }
  //before sending all the params and query to model only use sotr if apidata has a matter in it ,validate using beolow result apiData
  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " "); // i f in api user types https:localhost:5000/api/rpoducts?sort=name,-price
    apiData = apiData.sort(sortFix);
  } //by doing this we donot need to write .find().sort() we can write "await apiData"
  if (select) {
    let selectFix = select.replace(",", " "); //for select we get the sepecified key for select example select=name,-price we get list of objects with id and name icliding and exculding price
    //we also use split & join instead of replace
    let selectFixsplit = select.split(",").join(" "); //for select we get the sepecified key for select example select=name,-price we get list of objects with id and name icliding and exculding price

    apiData = apiData.select(selectFix);
  }
  let pagefieldskip = (Number(pageNumberGiven) - 1) * Number(limitNumberGiven);
  apiData = apiData.skip(pagefieldskip).limit(limit);
  const mydaa = await apiData;
  const myDataQuery = await Product.find(queryObject).sort(sort); //to get all docs
  const myDataQuerySelect = await Product.find(queryObject).select(name - price); //to get all docs

  const myData = await Product.find({}); //to get all docs
  const myDataName = await Product.find({ name: "Iphone" });
  res.status(200).json({ msg: "Get all Products" });
};

const getAllProductsTesting = async (req, res) => {
  const myDataa = await Product.find(req.query).sort("name"); //sorting asc
  const myDatab = await Product.find(req.query).sort("-name"); //sorting desc
  const myData = await Product.find(req.query).sort("name"); //sorting asc

  res.status(200).json({ msg: "Get all Products testing" });
};

module.exports = { getAllProducts, getAllProductsTesting };
