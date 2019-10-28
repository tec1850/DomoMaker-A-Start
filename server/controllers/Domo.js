const models = require('../models');

const Domo = models.Domo;

const makerPage = (req, res) => res.render('app');

module.exports.makerPage = makerPage;

const makeDomo = (request, response) => {
  const req = request;
  const res = response;

  req.body.name = `${req.body.name}`;
  req.body.age = `${req.body.age}`;

  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ redirect: '/maker' });
  });
};


module.exports.make = makeDomo;
