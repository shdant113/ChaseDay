const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models').User;
const Log = require('../models').Log;
const multer = require('multer');
const upload = multer({
	dest: 'uploads/',
	limits: {
	    fileSize: 10000000
	} 
});
const fs = require('fs');


  ////////////////
 //* GET USER *//
////////////////

router.get('/', async (req, res, next) => {
	try {
		const getUser = await User.findOne({
			attributes: ['id', 'firstName', 'lastName', 'profilePhoto',
				'coverPhoto', 'profileVideo'],
			where: { username: req.session.username }
		})
		res.json({
			status: 200,
			data: getUser
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})


  ///////////////////
 /* GO TO PROFILE */
///////////////////

router.get('/user_profile/:id', async (req, res, next) => {
	try {
		const userProfile = await User.findOne({
			attributes: ['id', 'username', 'firstName', 'lastName', 'location', 
				'facebook', 'twitter', 'youtube', 'signature', 'bio', 'createdAt', 
				'profilePhoto', 'coverPhoto', 'profileVideo'],
			where: { id: req.params.id }
		})
		const userLogs = await Log.findAll({
			where: { user_id: req.params.id}
		})
		res.json({
			status: 200,
			data: {
				user: userProfile,
				logs: userLogs
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})	


  //////////////////////
 /* ACCOUNT SETTINGS */
//////////////////////

router.get('/account_settings', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username', 'password', 'email', 'firstName', 'lastName', 
				'location', 'facebook', 'twitter', 'youtube', 'signature', 'bio', 
				'profilePhoto', 'coverPhoto'],
			where: { username: req.session.username }
		})
		console.log(currentUser)
		if (currentUser != null) {
			res.json({
				status: 200,
				data: currentUser
			})
		} else {
			res.json({
				status: 200,
				message: 'Load no access page.'
			})
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})	

router.put('/update_settings/:id', upload.single('imageFile'), async (req, res, next) => {
	try {
		const userToUpdate = await User.findOne({
			attributes: ['id', 'username', 'password', 'email'],
			where: { username: req.session.username }
		})
		// if (req.file) {
		// 	const imageFilePath = '../public/images/users' + req.file.filename;
		// 	const profilePhoto = fs.readFileSync(imageFilePath);
		// 	profilePhoto.contentType = req.file.mimetype;
		// 	const updateUser = await userToUpdate.updateAttributes({
		// 		profilePhoto: profilePhoto
		// 	})
		// 	fs.unlinkSync(imageFilePath);
		// }
		// const hashPassword = bcrypt.hashSync(req.body.password, 12);
		const updateUser = await userToUpdate.updateAttributes({
			username: req.body.username,
			email: req.body.email,
			// password: hashPassword
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			location: req.body.location,
			facebook: req.body.facebook,
			twitter: req.body.twitter,
			youtube: req.body.youtube,
			signature: req.body.signature,
			bio: req.body.bio,
			profilePhoto: req.body.profilePhoto,
			coverPhoto: req.body.coverPhoto,
			profileVideo: req.body.profileVideo
		})
		req.session.username = updateUser.username;
		// req.session.password = updateUser.password;
		res.json({
			status: 200,
			data: updateUser,
			message: `Updated ${updateUser.username}.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

// router.get('/:id/image', async (req, res) => {
// 	const user = await User.findOne({
// 		where: { id: req.params.id }
// 	});
// 	const image = user.profilePhoto;
// 	res.set('Content-Type', image.contentType);
// 	res.send(image.data);
// });

//   //////////////////////
//  /* PROFILE SETTINGS */
// //////////////////////

// router.get('/profile_settings/:id', async (req, res, next) => {
// 	try {
// 		const currentUser = await User.findOne({
// 			attributes: ['id', 'firstName', 'lastName', 'location', 'facebook', 'twitter', 'youtube', 'signature', 'bio', 'profilePhoto', 'coverPhoto'],
// 			where: { username: req.session.username }
// 		})
// 		res.json({
// 			status: 200,
// 			data: currentUser
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		next(err)
// 	}
// })

// router.put('/update_profile_settings/:id', async (req, res, next) => {
// 	try {
// 		const currentUser = await User.findOne({
// 			attributes: ['id', 'firstName', 'lastName', 'location', 'facebook', 'twitter', 'youtube', 'signature', 'bio', 'profilePhoto', 'coverPhoto'],
// 			where: { username: req.session.username }
// 		})
// 		const updateUser = await currentUser.updateAttributes({
// 			firstName: req.body.firstName,
// 			lastName: req.body.lastName,
// 			location: req.body.location,
// 			facebook: req.body.facebook,
// 			twitter: req.body.twitter,
// 			youtube: req.body.youtube,
// 			signature: req.body.signature,
// 			bio: req.body.bio,
// 			profilePhoto: req.body.profilePhoto,
// 			coverPhoto: req.body.coverPhoto
// 		})
// 		res.json({
// 			status: 200,
// 			data: updateUser,
// 			message: `Updated ${updateUser.username}.`
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		next(err)
// 	}
// })

//   //////////////////
//  ///* EDIT BIO *///
// //////////////////

// router.get('/profile_settings/bio/:id', async (req, res, next) => {
// 	try {
// 		const currentUser = await User.findOne({
// 			attributes: ['id', 'bio'],
// 			where: { username: req.session.username }
// 		})
// 		res.json({
// 			status: 200,
// 			data: currentUser
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		next(err)
// 	}
// })

// router.put('/update_profile_settings/bio/:id', async (req, res, next) => {
// 	try {
// 		const currentUser = await User.findOne({
// 			attributes: ['id', 'bio'],
// 			where: { username: req.session.username }
// 		})
// 		const updateUser = await currentUser.updateAttributes({
// 			bio: req.body.bio
// 		})
// 		res.json({
// 			status: 200,
// 			data: updateUser,
// 			message: `Updated ${updateUser.username}.`
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		next(err)
// 	}
// })

  /////////////////////
 ///* DELETE USER *///
/////////////////////

router.delete('/delete_user/:id', async (req, res, next) => {
	try {
		// need more security here
		const userToDelete = await User.findOne({
			where: { id: req.params.id }
		})
		await userToDelete.destroy();
		res.json({
			status: 200,
			message: 'deleted user'
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

// edit profile photo, cover photo
	// probably gonna need multer, do this when there is more time
// update


module.exports = router;