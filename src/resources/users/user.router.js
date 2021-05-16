const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get((req, res) => {
  const users = usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get((req, res) => {
  const user = usersService.getUserById(req.params.id)
  if(user) res.json(User.toResponse(user));
  else res.status(404).send("User not found");
});

router.route('/').post((req, res) => {
  res.type('application/json')
  const user = usersService.createUser(req.body);
  if(!user) res.status(400).send('Bad request')
  res.status(201).json(User.toResponse(user))
})

router.route('/:id').put((req,res) => {
  res.type('application/json')
  const user = usersService.updateUser(req.params.id, req.body)
  if(!user) res.status(400).send('Bad request');
  res.status(200).json(User.toResponse(user));
})

router.route('/:id').delete((req,res) => {
  const deletedUser = usersService.deleteUser(req.params.id);
  if(deletedUser) res.status(204).send("User has been deleted");
  else res.status(404).send("User not found");
})

module.exports = router;
