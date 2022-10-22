const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GETS/finds all tags and associated Product data
router.get('/', (req, res) => {
	Tag.findAll({
		include: [{ model: Product }]
	})
	.then(tagData => res.json(tagData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

//GETS/finds a tag by id and its associated Product data
router.get('/:id', (req, res) => {
	Tag.findOne({
		where: {
            id: req.params.id
        },
		include: [{ model: Product }]
	})
	.then(tagData => {
		if(!tagData) {
			res.status(404).json({ message: `No tag found with this id!`});
		}
		
		res.json(tagData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// POSTS/creates a new tag
router.post('/', (req, res) => {
	Tag.create({
		// req.body.id not needed as Category model will auto-increment id but user can specify a specific id if they choose to
		id: req.body.id,
		tag_name: req.body.tag_name
	})
	.then(tagData => res.json(tagData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// PUTS/updates new info in table for that tag by id
router.put('/:id', (req, res) => {
	Tag.update(
		{
			tag_name: req.body.tag_name
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
	.then(tagData => {
		if(!tagData[0]) {
			res.status(404).json({ message: `No tag found with this id!`});
		}
		
		res.json(tagData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// DELETES/destroys product by id
router.delete('/:id', (req, res) => {
	Tag.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(tagData => {
		if(!tagData) {
			res.status(404).json({ message: `No tag found with this id!`});
		}
		
		res.json(tagData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;
