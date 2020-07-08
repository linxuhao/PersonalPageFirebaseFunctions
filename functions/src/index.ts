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
    const data = {
        author: request.body.author,
        comment: request.body.comment,
        timestamp: Date.now()
    };
    db.collection('comments').add(data)
        .then(() => response.send(data)
        ).catch(() => response.status(500).send('Error'));
});

export const getComments = functions.https.onRequest((request, response) => {
    db.collection('comments').orderBy('timestamp').get()
        .then((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            response.send(data);
        }).catch(() => response.status(500).send('Error'));
});

export const getProjects = functions.https.onRequest((request, response) => {
    db.collection('projects').orderBy('year', "desc").get()
        .then((snapshot) => {
            const data = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            response.send(data);
        }).catch(() => response.status(500).send('Error'));
});

