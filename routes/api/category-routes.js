const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GETS/finds all categories and associated products
router.get('/', (req, res) => {
	Category.findAll({
		include: [{ model: Product }]
	})
	.then(categoryData => res.json(categoryData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err)
	});
});

// GETS/finds one category and its associated products by id
router.get('/:id', (req, res) => {
	Category.findOne({
		include: [{ model: Product }]
	})
	.then(categoryData => {
		if (!categoryData) {
			res.status(404).json({ message: `No category found with this id!`});
			return;
		}

		res.json(categoryData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// POSTS/creates new category
router.post('/', (req, res) => {
	Category.create({
		// req.body.id not needed as Category model will auto-increment id but user can specify a specific id if they choose to
		id: req.body.id,
		category_name: req.body.category_name
	})
	.then(categoryData => res.json(categoryData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
});

// PUTS/updates new info in table for that category by id
router.put('/:id', (req, res) => {
	Category.update(
		{
			category_name: req.body.category_name
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
	.then(categoryData => {
		if (!categoryData[0]) {
			res.status(404).json({ message: `No category found with this id!`});
			return;
		}

		res.json(categoryData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// DELETES/destroys new category by id
router.delete('/:id', (req, res) => {
	Category.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(categoryData => {
		if (!categoryData) {
			res.status(404).json({ messsage: `No post found with this id!` });
			return;
		}

		res.json(categoryData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;
