// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDW8T-dxc4u7FQdXJI5TcbFz_9QSx_kl0Y',
	authDomain: 'pdftron-sign-app-19b93.firebaseapp.com',
	projectId: 'pdftron-sign-app-19b93',
	storageBucket: 'pdftron-sign-app-19b93.appspot.com',
	messagingSenderId: '606022975917',
	appId: '1:606022975917:web:e3ca425cced0e538d3a124',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const addDocumentToSign = async (uid, email, docRef, emails) => {
	if (!uid) return;
	const signed = false;
	const xfdf = [];
	const signedBy = [];
	const requestedTime = new Date();
	const signedTime = '';
	firestore
		.collection('documentsToSign')
		.add({
			uid,
			email,
			docRef,
			emails,
			xfdf,
			signedBy,
			signed,
			requestedTime,
			signedTime,
		})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
};
