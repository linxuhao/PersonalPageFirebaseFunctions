import * as functions from 'firebase-functions';
import { firestore, initializeApp } from "firebase-admin";

initializeApp(functions.config().firebase);
const db = firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const addComment = functions.https.onRequest((request, response) => {
    db.collection('comments').add({ comment: request.body.comment })
    .then(() => response.send(request.body.comment)
    ).catch(() => response.status(500).send('Error'));
});

export const getComments = functions.https.onRequest((request, response) => {
    db.collection('comments').orderBy('timestamp').get()
    .then((document) => {
        response.send(document.docs);
    }).catch(() => response.status(500).send('Error'));
});

