import admin from "firebase-admin";

const serviceAccount = require("./secrets.json");

export const verifyIdToken = (token) => {
  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credentialcert(serviceAccount)
    })
  }
  return admin.auth().verifyIdToken(token).catch(err => {throw err})
}