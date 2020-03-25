import * as functions from 'firebase-functions';
import { database, initializeApp } from "firebase-admin";

initializeApp(functions.config().firebase);
const db = database();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const addComment = functions.https.onRequest((request, response) => {
    db.ref('comments').push({ comment: request.body.comment, timestamp: request.body.timestamp });
    response.send(request.body.comment);
});

export const getComments = functions.https.onRequest((request, response) => {
    db.ref('comments').orderByKey().once('value').then((snapshot) => {
        response.send(snapshot.val);
    }).catch(() => response.status(500).send('Error'));
});

