const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get( async (req, res) => {
  const users = await usersService.getAll();
  if(users.length === 0 ) res.status(404).send("Not found");
  else res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get( async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  if(user) {
    res.json(User.toResponse(user));
  }
  else res.status(404).send("User not found");
});

router.route('/').post( async (req, res) => {
  const user = await usersService.createUser(req.body);
  if(!user) res.status(400).send('Bad request')
  else {
    res.status(201).json(User.toResponse(user))
  }
})

router.route('/:id').put( async (req,res) => {
  const user = await usersService.updateUser(req.params.id, req.body)
  if(!user) res.status(400).send('Bad request');
  else {
    res.status(200).json(User.toResponse(user));
  }
})

router.route('/:id').delete( async (req,res) => {
  const deletedUser = await usersService.deleteUser(req.params.id);
  if(deletedUser) res.status(204).send("User has been deleted");
  else res.status(404).send("User not found");
})

module.exports = router;
